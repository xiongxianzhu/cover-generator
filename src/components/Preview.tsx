import React, { forwardRef, useEffect, WheelEvent } from 'react';
import type { CoverConfig } from '../types';
import { gradientPresets, geometricPatterns } from '../types';
import { Terminal, Cpu } from 'lucide-react';

interface PreviewProps {
    config: CoverConfig;
    zoomLevel?: number;
    onWheel?: (event: React.WheelEvent<HTMLElement>) => void;
}

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(({ config, zoomLevel = 60, onWheel }, ref) => {
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

    // 滚轮事件监听
    useEffect(() => {
        const previewElement = ref as React.RefObject<HTMLDivElement>;
        const containerElement = previewElement.current;

        if (containerElement && onWheel) {
            const handleWheel = (event: Event) => {
                const wheelEvent = event as unknown as WheelEvent;
                const reactWheelEvent = {
                    ...wheelEvent,
                    nativeEvent: wheelEvent as unknown as WheelEvent,
                    isDefaultPrevented: () => wheelEvent.defaultPrevented,
                    isPropagationStopped: () => false,
                    persist: () => {},
                } as unknown as React.WheelEvent<HTMLElement>;
                onWheel(reactWheelEvent);
            };
            containerElement.addEventListener('wheel', handleWheel, { passive: false });

            return () => {
                containerElement.removeEventListener('wheel', handleWheel);
            };
        }
    }, [onWheel, ref]);

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

    // Theme Styles
    const getThemeStyles = (titleClass: string) => {
        switch (config.theme) {
            case 'modern':
                return {
                    container: 'p-16',
                    header: 'p-4 bg-white/10 backdrop-blur-md rounded border border-white/20 shadow-xl',
                    title: `${titleClass} font-bold leading-tight tracking-tight drop-shadow-lg`,
                    subtitle: 'text-2xl md:text-3xl font-light opacity-90 leading-relaxed max-w-2xl',
                    authorContainer: 'flex items-center gap-3',
                    authorAvatar: 'w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg',
                    authorLabel: 'text-sm opacity-60 uppercase tracking-wider',
                    authorName: 'font-medium text-lg',
                    footer: 'w-full flex justify-between items-end border-t border-current/20 pt-8',
                    decoration: 'flex gap-2 opacity-50',
                    decorationIcon: 'opacity-50'
                };
            case 'classic':
                return {
                    container: 'p-20',
                    header: 'p-6 bg-white/5 rounded border-2 border-current/30',
                    title: `${titleClass} font-serif leading-snug tracking-normal`,
                    subtitle: 'text-xl md:text-2xl font-normal opacity-80 leading-relaxed max-w-3xl',
                    authorContainer: 'flex items-center gap-4',
                    authorAvatar: 'w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-serif text-xl',
                    authorLabel: 'text-sm opacity-70 uppercase tracking-wide',
                    authorName: 'font-serif text-xl',
                    footer: 'w-full flex justify-between items-end border-t-2 border-current/40 pt-10',
                    decoration: 'flex gap-3 opacity-60',
                    decorationIcon: 'opacity-60'
                };
            case 'bold':
                return {
                    container: 'p-12',
                    header: 'p-3 bg-black/20 backdrop-blur-sm rounded',
                    title: `${titleClass} font-black leading-none tracking-tighter uppercase`,
                    subtitle: 'text-3xl md:text-4xl font-bold opacity-95 leading-tight max-w-2xl',
                    authorContainer: 'flex items-center gap-2',
                    authorAvatar: 'w-8 h-8 rounded-sm bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white font-black text-sm',
                    authorLabel: 'text-xs opacity-80 uppercase tracking-widest',
                    authorName: 'font-black text-base',
                    footer: 'w-full flex justify-between items-end border-b-4 border-current/80 pb-6',
                    decoration: 'flex gap-1 opacity-40',
                    decorationIcon: 'opacity-40'
                };
            case 'minimal':
                return {
                    container: 'p-24',
                    header: 'p-2',
                    title: `${titleClass} font-thin leading-loose tracking-widest`,
                    subtitle: 'text-lg md:text-xl font-thin opacity-70 leading-loose max-w-4xl',
                    authorContainer: 'flex flex-col gap-1',
                    authorAvatar: 'hidden',
                    authorLabel: 'text-xs opacity-50 uppercase tracking-widest',
                    authorName: 'font-thin text-sm',
                    footer: 'w-full flex justify-between items-end border-t border-current/10 pt-12',
                    decoration: 'hidden',
                    decorationIcon: 'hidden'
                };
            default:
                return {
                    container: 'p-16',
                    header: 'p-4 bg-white/10 backdrop-blur-md rounded border border-white/20 shadow-xl',
                    title: `${titleClass} font-bold leading-tight tracking-tight drop-shadow-lg`,
                    subtitle: 'text-2xl md:text-3xl font-light opacity-90 leading-relaxed max-w-2xl',
                    authorContainer: 'flex items-center gap-3',
                    authorAvatar: 'w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg',
                    authorLabel: 'text-sm opacity-60 uppercase tracking-wider',
                    authorName: 'font-medium text-lg',
                    footer: 'w-full flex justify-between items-end border-t border-current/20 pt-8',
                    decoration: 'flex gap-2 opacity-50',
                    decorationIcon: 'opacity-50'
                };
        }
    };

    // Theme Content
    const renderContent = () => {
        const alignClass = getAlignmentClass();
        const titleClass = getTitleSize();
        const themeStyles = getThemeStyles(titleClass);
        
        return (
            <div className={`h-full flex flex-col justify-between relative z-10 ${alignClass} ${themeStyles.container}`}>

                {/* Header / Icon */}
                <div className="w-full flex justify-between items-start">
                    {showIcon && (
                        <div className={themeStyles.header}>
                            <Terminal size={48} />
                        </div>
                    )}
                    {showDecoration && (
                        <div className={themeStyles.decoration}>
                            <div className="w-3 h-3 rounded-full bg-current" />
                            <div className="w-3 h-3 rounded-full bg-current" />
                            <div className="w-3 h-3 rounded-full bg-current" />
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className={`flex flex-col gap-6 max-w-4xl ${alignClass}`}>

                    <h1 className={themeStyles.title}>
                        {title}
                    </h1>

                    <p className={themeStyles.subtitle}>
                        {subtitle}
                    </p>
                </div>

                {/* Footer / Author */}
                <div className={themeStyles.footer}>
                    {showAuthor && (
                        <div className={themeStyles.authorContainer}>
                            {themeStyles.authorAvatar !== 'hidden' && (
                                <div className={themeStyles.authorAvatar}>
                                    {author.charAt(0)}
                                </div>
                            )}
                            <div className="flex flex-col">
                                <span className={themeStyles.authorLabel}>Author</span>
                                <span className={themeStyles.authorName}>{author}</span>
                            </div>
                        </div>
                    )}

                    {showDecoration && themeStyles.decorationIcon !== 'hidden' && (
                        <div className={themeStyles.decorationIcon}>
                            <Cpu size={32} />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div
            className="overflow-hidden shadow-2xl rounded-sm transition-all duration-300 ease-in-out origin-center"
            style={{
                width: dimensions.width,
                height: dimensions.height,
                transform: `scale(${zoomLevel / 100})`
            }}
        >
            <div
                ref={ref}
                className="w-full h-full relative overflow-hidden"
                style={getBackgroundStyle()}
            >
                {getPatternOverlay()}
                {renderContent()}
            </div>
        </div>
    );
});

Preview.displayName = 'Preview';
