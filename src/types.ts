export interface CoverConfig {
    title: string;
    subtitle: string;
    author: string;
    theme: 'modern' | 'classic' | 'bold' | 'minimal';
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    pattern: 'none' | 'dots' | 'lines' | 'waves' | 'grid' | 'triangles';
    aspectRatio: '16:9' | '1:1' | '9:16';
    backgroundType: 'solid' | 'gradient' | 'pattern' | 'image';
    backgroundImage: string | null;
    titleAlignment: 'left' | 'center' | 'right';
    titleSize: 'small' | 'medium' | 'large';
    showAuthor: boolean;
    showIcon: boolean;
    showDecoration: boolean;
    gradientPreset: 'custom' | 'sunset' | 'ocean' | 'forest' | 'candy' | 'aurora' | 'flame';
    // 添加图标类型选项
    iconType: 'brush' | 'cpu' | 'code' | 'database' | 'cloud' | 'layers' | 'package' | 'settings';
}

export const defaultCoverConfig: CoverConfig = {
    title: '构建未来',
    subtitle: '深入探索 React 19 与现代 Web 开发',
    author: 'xx',
    theme: 'minimal',
    backgroundColor: '#000000',
    textColor: '#ffffff',
    fontFamily: 'Inter',
    pattern: 'none',
    aspectRatio: '16:9',
    backgroundType: 'gradient',
    backgroundImage: null,
    titleAlignment: 'center',
    titleSize: 'medium',
    showAuthor: true,
    showIcon: true,
    showDecoration: true,
    gradientPreset: 'aurora',
    iconType: 'code', // 默认图标类型
};

// 渐变预设定义
export const gradientPresets = {
    sunset: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 25%, #ff9ff3 50%, #ee5a6f 75%, #ff6b6b 100%)',
    ocean: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #4facfe 50%, #00f2fe 75%, #667eea 100%)',
    forest: 'linear-gradient(135deg, #38ef7d 0%, #11998e 25%, #11998e 50%, #38ef7d 75%, #11998e 100%)',
    candy: 'linear-gradient(135deg, #f093fb 0%, #f5576c 25%, #fa709a 50%, #fee140 75%, #f093fb 100%)',
    aurora: 'linear-gradient(135deg, #00c9ff 0%, #92fe9d 25%, #fc466b 50%, #3f5efb 75%, #00c9ff 100%)',
    flame: 'linear-gradient(135deg, #ff0000 0%, #ff7f00 25%, #ffff00 50%, #ff7f00 75%, #ff0000 100%)',
} as const;

// 几何纹理预设定义
export const geometricPatterns = {
    grid: {
        backgroundImage: `
            linear-gradient(currentColor 1px, transparent 1px),
            linear-gradient(90deg, currentColor 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
        opacity: '0.1'
    },
    dots: {
        backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        opacity: '0.2'
    },
    lines: {
        backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)',
        backgroundSize: '12px 12px',
        opacity: '0.1'
    },
    triangles: {
        backgroundImage: `
            linear-gradient(30deg, currentColor 12%, transparent 12.5%, transparent 87%, currentColor 87.5%, currentColor),
            linear-gradient(150deg, currentColor 12%, transparent 12.5%, transparent 87%, currentColor 87.5%, currentColor),
            linear-gradient(30deg, currentColor 12%, transparent 12.5%, transparent 87%, currentColor 87.5%, currentColor),
            linear-gradient(150deg, currentColor 12%, transparent 12.5%, transparent 87%, currentColor 87.5%, currentColor),
            linear-gradient(60deg, currentColor 12%, transparent 12.5%, transparent 87%, currentColor 87.5%, currentColor),
            linear-gradient(60deg, currentColor 12%, transparent 12.5%, transparent 87%, currentColor 87.5%, currentColor)
        `,
        backgroundSize: '24px 42px',
        backgroundPosition: '0 0, 0 0, 12px 21px, 12px 21px, 0 42px, 0 42px',
        opacity: '0.1'
    }
} as const;
