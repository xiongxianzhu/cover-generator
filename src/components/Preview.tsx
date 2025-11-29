import React, { forwardRef } from 'react';
import type { CoverConfig } from '../types';
import { gradientPresets, geometricPatterns } from '../types';
import { Terminal, Code2, Cpu } from 'lucide-react';

interface PreviewProps {
    config: CoverConfig;
}

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(({ config }, ref) => {
    const {
        title,
        subtitle,
        author,

        backgroundColor,
        textColor,
        fontFamily,
        pattern,
        aspectRatio,
        backgroundType,
        backgroundImage,
        titleAlignment,
        titleSize,
        showAuthor,
        showIcon,
        showDecoration,
        gradientPreset,
    } = config;

    // Aspect Ratio Dimensions
    const getDimensions = () => {
        switch (aspectRatio) {
            case '16:9': return { width: '1200px', height: '675px' };
            case '1:1': return { width: '800px', height: '800px' };
            case '9:16': return { width: '600px', height: '1067px' };
            default: return { width: '1200px', height: '675px' };
        }
    };

    const dimensions = getDimensions();

    // Background Styles
    const getBackgroundStyle = (): React.CSSProperties => {
        const baseStyle: React.CSSProperties = {
            color: textColor,
            fontFamily,
        };

        if (backgroundType === 'image' && backgroundImage) {
            return {
                ...baseStyle,
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            };
        }

        if (backgroundType === 'gradient') {
            // Use gradient preset if available, otherwise generate a basic gradient
            const gradientStyle = gradientPreset !== 'custom' && gradientPresets[gradientPreset]
                ? gradientPresets[gradientPreset]
                : `linear-gradient(135deg, ${backgroundColor} 0%, #000000 100%)`;

            return {
                ...baseStyle,
                background: gradientStyle
            }
        }

        return {
            ...baseStyle,
            backgroundColor,
        };
    };

    // Pattern Overlay
    const getPatternOverlay = () => {
        if (backgroundType === 'image') return null;

        switch (pattern) {
            case 'dots':
                return (
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                    }} />
                );
            case 'lines':
                return (
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)',
                        backgroundSize: '12px 12px'
                    }} />
                );
            case 'waves':
                return (
                    <div className="absolute inset-0 opacity-10" style={{
                        background: 'radial-gradient(circle at 100% 50%, transparent 20%, currentColor 21%, currentColor 34%, transparent 35%, transparent), radial-gradient(circle at 0% 50%, transparent 20%, currentColor 21%, currentColor 34%, transparent 35%, transparent) 0 -50px',
                        backgroundSize: '75px 100px'
                    }} />
                );
            case 'grid':
                return (
                    <div className="absolute inset-0" style={{
                        ...geometricPatterns.grid
                    }} />
                );
            case 'triangles':
                return (
                    <div className="absolute inset-0" style={{
                        ...geometricPatterns.triangles
                    }} />
                );
            default:
                return null;
        }
    };

    // Typography Sizes
    const getTitleSize = () => {
        switch (titleSize) {
            case 'small': return 'text-4xl md:text-5xl';
            case 'medium': return 'text-6xl md:text-7xl';
            case 'large': return 'text-7xl md:text-9xl';
            default: return 'text-6xl';
        }
    };

    // Alignment
    const getAlignmentClass = () => {
        switch (titleAlignment) {
            case 'left': return 'items-start text-left';
            case 'center': return 'items-center text-center';
            case 'right': return 'items-end text-right';
            default: return 'items-center text-center';
        }
    };

    // Theme Content
    const renderContent = () => {
        const alignClass = getAlignmentClass();
        const titleClass = getTitleSize();

        return (
            <div className={`h-full flex flex-col justify-between p-16 relative z-10 ${alignClass}`}>

                {/* Header / Icon */}
                <div className="w-full flex justify-between items-start">
                    {showIcon && (
                        <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                            <Terminal size={48} />
                        </div>
                    )}
                    {showDecoration && (
                        <div className="flex gap-2 opacity-50">
                            <div className="w-3 h-3 rounded-full bg-current" />
                            <div className="w-3 h-3 rounded-full bg-current" />
                            <div className="w-3 h-3 rounded-full bg-current" />
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className={`flex flex-col gap-6 max-w-4xl ${alignClass}`}>
                    {showDecoration && (
                        <div className="flex items-center gap-3 opacity-80 mb-2">
                            <Code2 size={20} />
                            <span className="font-mono text-sm tracking-widest uppercase">Tech Cover</span>
                        </div>
                    )}

                    <h1 className={`${titleClass} font-bold leading-tight tracking-tight drop-shadow-lg`}>
                        {title}
                    </h1>

                    <p className="text-2xl md:text-3xl font-light opacity-90 leading-relaxed max-w-2xl">
                        {subtitle}
                    </p>
                </div>

                {/* Footer / Author */}
                <div className="w-full flex justify-between items-end border-t border-current/20 pt-8">
                    {showAuthor && (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                                {author.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm opacity-60 uppercase tracking-wider">Author</span>
                                <span className="font-medium text-lg">{author}</span>
                            </div>
                        </div>
                    )}

                    {showDecoration && (
                        <div className="opacity-50">
                            <Cpu size={32} />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="overflow-hidden shadow-2xl rounded-sm transition-all duration-500 ease-in-out origin-center transform scale-[0.4] md:scale-[0.5] lg:scale-[0.6] xl:scale-[0.7]" style={{ width: dimensions.width, height: dimensions.height }}>
            <div
                ref={ref}
                className="w-full h-full relative overflow-hidden"
                style={getBackgroundStyle()}
            >
                {getPatternOverlay()}
                {/* Glassmorphism Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                {renderContent()}
            </div>
        </div>
    );
});

Preview.displayName = 'Preview';
