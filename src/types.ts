export interface CoverConfig {
    title: string;
    subtitle: string;
    author: string;
    theme: 'modern' | 'classic' | 'bold' | 'minimal';
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    pattern: 'none' | 'dots' | 'lines' | 'waves';
    aspectRatio: '16:9' | '1:1' | '9:16';
    backgroundType: 'solid' | 'gradient' | 'pattern' | 'image';
    backgroundImage: string | null;
    titleAlignment: 'left' | 'center' | 'right';
    titleSize: 'small' | 'medium' | 'large';
    showAuthor: boolean;
    showIcon: boolean;
    showDecoration: boolean;
}

export const defaultCoverConfig: CoverConfig = {
    title: '构建未来',
    subtitle: '深入探索 React 19 与现代 Web 开发',
    author: 'Antigravity',
    theme: 'modern',
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
};
