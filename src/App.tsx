import { useState, useRef, useCallback, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { Layout } from './components/Layout';
import { Preview } from './components/Preview';
import { Controls } from './components/Controls';
import type { CoverConfig } from './types';
import { defaultCoverConfig } from './types';
import type { Language } from './utils/i18n';
import { t } from './utils/i18n';
import type { AppTheme } from './types/theme';

function App() {
  const [config, setConfig] = useState<CoverConfig>(defaultCoverConfig);
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>('zh-CN');
  const [currentTheme, setCurrentTheme] = useState<AppTheme>('cyberpunk');
  const [zoomLevel, setZoomLevel] = useState(60); // 默认60%缩放，适配移动端
  const previewRef = useRef<HTMLDivElement>(null);

  const [rotation, setRotation] = useState({ x: -20, y: -30 }); // 3D旋转状态提升到App组件

  // 动态设置页面标题
  useEffect(() => {
    // 更新 document.title 以确保浏览器标签页标题正确
    document.title = t('app.title', currentLang);

    // 同时更新页面中的标题元素（如果存在）
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) {
      pageTitle.textContent = t('app.title', currentLang);
    }
  }, [currentLang]);

  const toggleLanguage = (lang: Language) => {
    setCurrentLang(lang);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 150)); // 最大150%
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 20)); // 最小20%
  };

  const handleZoomReset = () => {
    setZoomLevel(60); // 重置到默认60%
  };

  // 鼠标滚轮缩放处理
  const handleWheel = (event: React.WheelEvent<HTMLElement>) => {
    // 直接响应滚轮，无需按Ctrl键
    event.preventDefault();

    // 根据滚轮方向调整缩放
    if (event.deltaY < 0) {
      // 向上滚动，放大
      handleZoomIn();
    } else {
      // 向下滚动，缩小
      handleZoomOut();
    }
  };

  // 为整个主区域添加滚轮事件监听
  useEffect(() => {
    const mainElement = document.querySelector('main');

    if (mainElement) {
      const wheelHandler = (event: WheelEvent) => {
        // 只有当鼠标在主区域内时才响应滚轮事件
        if (event.target instanceof Element && mainElement.contains(event.target)) {
          handleWheel(event as unknown as React.WheelEvent<HTMLElement>);
        }
      };

      mainElement.addEventListener('wheel', wheelHandler, { passive: false });

      return () => {
        mainElement.removeEventListener('wheel', wheelHandler);
      };
    }
  }, []); // 空依赖数组，只在组件挂载时设置一次

  // 键盘快捷键支持
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 只在非输入框中响应快捷键
      if (event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement) {
        return;
      }

      if (event.key === '+' || event.key === '=') {
        event.preventDefault();
        handleZoomIn();
      } else if (event.key === '-' || event.key === '_') {
        event.preventDefault();
        handleZoomOut();
      } else if (event.key === '0') {
        event.preventDefault();
        handleZoomReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [exportPerspective, setExportPerspective] = useState(1000);

  const handleDownload = useCallback(async () => {
    if (previewRef.current === null) {
      return;
    }

    setIsDownloading(true);

    // 保存当前缩放比例
    const previousZoomLevel = zoomLevel;

    // 计算导出时的透视值，以保持视觉一致性
    // 原理：保持 距离/物体大小 的比例恒定
    // P_new = P_old * (Size_new / Size_old) = 1000 * (100 / zoomLevel)
    const newPerspective = 1000 * (100 / zoomLevel);
    setExportPerspective(newPerspective);

    try {
      // 1. 将缩放调整为100%，以获取原始尺寸
      setZoomLevel(100);

      // 2. 等待渲染和过渡动画完成
      await new Promise(resolve => setTimeout(resolve, 500));

      const element = previewRef.current;
      const width = element.offsetWidth;
      const height = element.offsetHeight;

      // 3. 导出图片
      // 增加画布大小以防止3D旋转导致的截断，并居中显示
      const scaleFactor = 1.5;
      const newWidth = width * scaleFactor;
      const newHeight = height * scaleFactor;
      const offsetX = (newWidth - width) / 2;
      const offsetY = (newHeight - height) / 2;

      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 3, // 更高分辨率
        quality: 1.0, // 最高质量
        backgroundColor: undefined, // 保持背景透明
        width: newWidth,
        height: newHeight,
        style: {
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          transformOrigin: 'center center',
          // @ts-ignore
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }
      });

      // 4. 创建下载链接
      const link = document.createElement('a');
      link.download = `${config.title.replace(/\s+/g, '-').toLowerCase()}-cover.png`;
      link.href = dataUrl;
      link.click();

    } catch (error) {
      console.error('Failed to download image', error);
    } finally {
      // 5. 恢复之前的状态
      setZoomLevel(previousZoomLevel);
      setExportPerspective(1000);
      setIsDownloading(false);
    }
  }, [config.title, zoomLevel]);

  const handleRandomize = () => {
    const themes: CoverConfig['theme'][] = ['modern', 'classic', 'bold', 'minimal'];
    const patterns: CoverConfig['pattern'][] = ['none', 'dots', 'lines', 'waves', 'grid', 'triangles'];
    const gradientPresets: CoverConfig['gradientPreset'][] = ['custom', 'sunset', 'ocean', 'forest', 'candy', 'aurora', 'flame'];
    const iconTypes: CoverConfig['iconType'][] = ['brush', 'cpu', 'code', 'database', 'cloud', 'layers', 'package', 'settings']; // 添加图标类型数组
    const colors = [
      { bg: '#000000', text: '#ffffff' },
      { bg: '#ffffff', text: '#000000' },
      { bg: '#1a1a1a', text: '#e5e5e5' },
      { bg: '#2d3748', text: '#f7fafc' },
      { bg: '#4a5568', text: '#edf2f7' },
      { bg: '#5b21b6', text: '#ede9fe' },
      { bg: '#9d174d', text: '#fce7f3' },
      { bg: '#047857', text: '#d1fae5' },
    ];

    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomGradientPreset = gradientPresets[Math.floor(Math.random() * gradientPresets.length)];
    const randomIconType = iconTypes[Math.floor(Math.random() * iconTypes.length)]; // 添加随机图标类型选择
    const isGradient = Math.random() > 0.7; // 30% chance of gradient

    // 随机设置显示选项
    const showAuthor = Math.random() > 0.3; // 70% chance to show author
    const showIcon = Math.random() > 0.3; // 70% chance to show icon
    const showDecoration = Math.random() > 0.3; // 70% chance to show decoration
    // 10% chance to enable 3D effect
    const enable3DEffect = Math.random() > 0.9;

    setConfig(prev => ({
      ...prev,
      theme: randomTheme,
      pattern: randomPattern,
      backgroundColor: randomColor.bg,
      textColor: randomColor.text,
      backgroundType: isGradient ? 'gradient' : 'solid',
      gradientPreset: isGradient ? randomGradientPreset : 'custom',
      iconType: randomIconType, // 添加图标类型设置
      showAuthor,
      showIcon,
      showDecoration,
      enable3DEffect,
    }));

    // 重置旋转角度
    setRotation({ x: -20, y: -30 });
  };

  const handleChange = <K extends keyof CoverConfig>(key: K, value: CoverConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Layout
      sidebar={
        <Controls
          config={config}
          handleChange={handleChange}
          onDownload={handleDownload}
          onRandomize={handleRandomize}
          isDownloading={isDownloading}
          currentLang={currentLang}
          currentTheme={currentTheme}
          zoomLevel={zoomLevel}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onZoomReset={handleZoomReset}
        />
      }
      currentLang={currentLang}
      onToggleLanguage={toggleLanguage}
      currentTheme={currentTheme}
      onThemeChange={setCurrentTheme}
    >
      <Preview
        ref={previewRef}
        config={config}
        zoomLevel={zoomLevel}
        onWheel={handleWheel}
        rotation={rotation}
        onRotationChange={setRotation}
        perspective={isDownloading ? exportPerspective : 1000}
      />
    </Layout>
  );
}

export default App;