import { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Layout } from './components/Layout';
import { Preview } from './components/Preview';
import { Controls } from './components/Controls';
import type { CoverConfig } from './types';
import { defaultCoverConfig } from './types';
import type { Language } from './utils/i18n';
import { appThemes, type AppTheme } from './types/theme';

function App() {
  const [config, setConfig] = useState<CoverConfig>(defaultCoverConfig);
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>('zh-CN');
  const [currentTheme, setCurrentTheme] = useState<AppTheme>('dark');
  const previewRef = useRef<HTMLDivElement>(null);

  const toggleLanguage = (lang: Language) => {
    setCurrentLang(lang);
  };

  const handleDownload = useCallback(async () => {
    if (previewRef.current === null) {
      return;
    }

    setIsDownloading(true);
    // Add a small delay to show the loading state (UX)
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const dataUrl = await toPng(previewRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `${config.title.replace(/\s+/g, '-').toLowerCase()}-cover.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download image', err);
    } finally {
      setIsDownloading(false);
    }
  }, [config.title]);

  const handleRandomize = () => {
    const themes: CoverConfig['theme'][] = ['modern', 'classic', 'bold', 'minimal'];
    const patterns: CoverConfig['pattern'][] = ['none', 'dots', 'lines', 'waves', 'grid', 'triangles'];
    const gradientPresets: CoverConfig['gradientPreset'][] = ['custom', 'sunset', 'ocean', 'forest', 'candy', 'aurora', 'flame'];
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
    const isGradient = Math.random() > 0.7; // 30% chance of gradient

    setConfig(prev => ({
      ...prev,
      theme: randomTheme,
      pattern: randomPattern,
      backgroundColor: randomColor.bg,
      textColor: randomColor.text,
      backgroundType: isGradient ? 'gradient' : 'solid',
      gradientPreset: isGradient ? randomGradientPreset : 'custom',
    }));
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
        />
      }
      currentLang={currentLang}
      onToggleLanguage={toggleLanguage}
      currentTheme={currentTheme}
      onThemeChange={setCurrentTheme}
    >
      <Preview ref={previewRef} config={config} />
    </Layout>
  );
}

export default App;
