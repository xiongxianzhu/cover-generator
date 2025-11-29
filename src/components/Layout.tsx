import React, { useState, useEffect, useRef } from 'react';
import { Globe, Palette, Github, ExternalLink, Heart } from 'lucide-react';
import { t, type TranslationKey } from '../utils/i18n';
import type { Language } from '../utils/i18n';
import { appThemes, type AppTheme } from '../types/theme';

interface LayoutProps {
    children: React.ReactNode;
    sidebar: React.ReactNode;
    currentLang: Language;
    onToggleLanguage: (lang: Language) => void;
    currentTheme?: AppTheme;
    onThemeChange?: (theme: AppTheme) => void;
    onWheel?: (event: React.WheelEvent<HTMLElement>) => void;
}

export const Layout: React.FC<LayoutProps> = ({
    children,
    sidebar,
    currentLang,
    onToggleLanguage,
    currentTheme: externalCurrentTheme,
    onThemeChange,
    onWheel
}) => {
    const [internalTheme, setInternalTheme] = useState<AppTheme>('dark');
    const [showLangDropdown, setShowLangDropdown] = useState(false);
    const [showThemeDropdown, setShowThemeDropdown] = useState(false);
    const langDropdownRef = useRef<HTMLDivElement>(null);
    const themeDropdownRef = useRef<HTMLDivElement>(null);

    // 使用外部传入的主题，如果没有则使用内部状态
    const currentTheme = externalCurrentTheme || internalTheme;
    const setCurrentTheme = onThemeChange || setInternalTheme;
    const theme = appThemes[currentTheme];

    // 点击外部关闭下拉菜单和滚轮事件监听
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
                setShowLangDropdown(false);
            }
            if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
                setShowThemeDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onWheel]);

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            {/* Top Navigation Bar */}
            <header className={`h-14 ${theme.bg} border-b ${theme.border} flex items-center justify-between px-6 z-30 backdrop-blur-sm bg-black/30`}>
                {/* Logo and Title */}
                <div className="flex items-center gap-3 group cursor-pointer">
                    <img
                        src="/logo.png"
                        alt={t('app.title', currentLang)}
                        className="w-8 h-8 rounded object-cover transition-transform duration-200 group-hover:scale-105"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                    <h1 className="font-semibold text-lg text-white/90 group-hover:text-white transition-colors duration-200">
                        {t('app.title', currentLang)}
                    </h1>
                </div>

                {/* Right Side - Theme, Language, GitHub */}
                <div className="flex items-center gap-2">
                    {/* Theme Dropdown */}
                    <div className="relative" ref={themeDropdownRef}>
                        <button
                            onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                            className={`px-3 py-1.5 rounded border ${theme.border} bg-white/5 hover:bg-white/10 transition-colors duration-200 flex items-center gap-2 text-white/80 hover:text-white text-sm`}
                        >
                            <Palette size={16} />
                            <span className="hidden sm:inline">{t(`theme.${currentTheme}` as TranslationKey, currentLang)}</span>
                        </button>
                        {showThemeDropdown && (
                            <div className={`absolute right-0 top-full mt-2 w-40 ${theme.sidebar} border ${theme.border} rounded shadow-xl z-50 backdrop-blur-md bg-black/80 overflow-hidden`}>
                                {Object.entries(appThemes).map(([key]) => (
                                    <button
                                        key={key}
                                        onClick={() => {
                                            setCurrentTheme(key as AppTheme);
                                            setShowThemeDropdown(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors duration-150 ${currentTheme === key ? 'bg-white/15 text-white font-medium' : 'text-white/70'}`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${key === 'cyberpunk' ? 'from-purple-500 to-pink-500' : key === 'forest' ? 'from-green-500 to-emerald-500' : key === 'ocean' ? 'from-blue-500 to-cyan-500' : key === 'sunset' ? 'from-orange-500 to-yellow-500' : key === 'aurora' ? 'from-teal-500 to-lime-500' : 'from-gray-500 to-gray-600'}`}></div>
                                            {t(`theme.${key}` as TranslationKey, currentLang)}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Language Dropdown */}
                    <div className="relative" ref={langDropdownRef}>
                        <button
                            onClick={() => setShowLangDropdown(!showLangDropdown)}
                            className={`px-3 py-1.5 rounded border ${theme.border} bg-white/5 hover:bg-white/10 transition-colors duration-200 flex items-center gap-2 text-white/80 hover:text-white text-sm`}
                        >
                            <Globe size={16} />
                            <span>{currentLang === 'en' ? 'EN' : '中文'}</span>
                        </button>
                        {showLangDropdown && (
                            <div className={`absolute right-0 top-full mt-2 w-32 ${theme.sidebar} border ${theme.border} rounded shadow-xl z-50 backdrop-blur-md bg-black/80 overflow-hidden`}>
                                <button
                                    onClick={() => {
                                        onToggleLanguage('zh-CN');
                                        setShowLangDropdown(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors duration-150 ${currentLang === 'zh-CN' ? 'bg-white/15 text-white font-medium' : 'text-white/70'}`}
                                >
                                    <span className="flex items-center gap-2">
                                        🇨🇳
                                        中文
                                    </span>
                                </button>
                                <button
                                    onClick={() => {
                                        onToggleLanguage('en');
                                        setShowLangDropdown(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors duration-150 ${currentLang === 'en' ? 'bg-white/15 text-white font-medium' : 'text-white/70'}`}
                                >
                                    <span className="flex items-center gap-2">
                                        🇺🇸
                                        English
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* GitHub Link */}
                    <a
                        href="https://github.com/xiongxianzhu/cover-generator"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-3 py-1.5 rounded border ${theme.border} bg-white/5 hover:bg-white/10 transition-colors duration-200 flex items-center gap-2 text-white/80 hover:text-white text-sm`}
                    >
                        <Github size={16} />
                        <span className="hidden sm:inline">GitHub</span>
                    </a>
                </div>
            </header>

            {/* Main Content Area */}
            <div className={`flex-1 ${theme.bg} ${theme.text} flex flex-col md:flex-row overflow-hidden`}>
                {/* Sidebar / Controls Panel */}
                <aside className={`w-full md:w-[400px] ${theme.sidebar} border-r ${theme.border} flex flex-col h-full z-20 shadow-2xl ${currentTheme === 'cyberpunk' ? 'glass-effect-cyberpunk' : currentTheme === 'forest' ? 'glass-effect-forest' : currentTheme === 'ocean' ? 'glass-effect-ocean' : currentTheme === 'sunset' ? 'glass-effect-sunset' : currentTheme === 'aurora' ? 'glass-effect-aurora' : 'glass-effect-dark'}`}>
                    {/* Controls Content */}
                    <div className={`flex-1 overflow-hidden flex flex-col ${theme.sidebar} ${theme.text}`}>
                        {sidebar}
                    </div>
                </aside>

                {/* Main Preview Area */}
                <main
                    className={`flex-1 ${theme.bg} relative flex items-center justify-center overflow-hidden p-8`}
                    onWheel={onWheel}
                >
                    {/* Animated Grid Background */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: `linear-gradient(${currentTheme === 'cyberpunk' ? '#a855f7' : currentTheme === 'forest' ? '#22c55e' : currentTheme === 'ocean' ? '#3b82f6' : currentTheme === 'sunset' ? '#f97316' : currentTheme === 'aurora' ? '#14b8a6' : '#333'} 1px, transparent 1px), linear-gradient(90deg, ${currentTheme === 'cyberpunk' ? '#a855f7' : currentTheme === 'forest' ? '#22c55e' : currentTheme === 'ocean' ? '#3b82f6' : currentTheme === 'sunset' ? '#f97316' : currentTheme === 'aurora' ? '#14b8a6' : '#333'} 1px, transparent 1px)`,
                            backgroundSize: '60px 60px',
                            animation: 'grid 20s linear infinite'
                        }}
                    />

                    {/* Enhanced Radial Gradient for focus */}
                    <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,${currentTheme === 'cyberpunk' ? 'rgba(168,85,247,0.08)' : currentTheme === 'forest' ? 'rgba(34,197,94,0.08)' : currentTheme === 'ocean' ? 'rgba(59,130,246,0.08)' : currentTheme === 'sunset' ? 'rgba(249,115,22,0.08)' : currentTheme === 'aurora' ? 'rgba(20,184,166,0.08)' : 'rgba(255,255,255,0.03)'}_0,transparent_70%)] pointer-events-none`} />

                    {/* Ambient light effect */}
                    <div className={`absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none animate-pulse ${currentTheme === 'cyberpunk' ? 'bg-purple-600/20' : currentTheme === 'forest' ? 'bg-green-600/20' : currentTheme === 'ocean' ? 'bg-blue-600/20' : currentTheme === 'sunset' ? 'bg-orange-600/20' : currentTheme === 'aurora' ? 'bg-teal-600/20' : 'bg-gray-600/20'}`} />

                    {/* Content Container */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                        {children}
                    </div>
                </main>
            </div>

            {/* Bottom Footer */}
            <footer className={`h-12 ${theme.bg} border-t ${theme.border} flex items-center justify-center px-6 z-30 backdrop-blur-sm bg-black/20`}>
                <div className="flex items-center gap-4 text-sm text-white/50">
                    {/* Blog Link */}
                    <a
                        href="https://zhuxiongxian.cc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 hover:text-white/80 transition-colors duration-200"
                    >
                        <span>{t('footer.blog', currentLang)}</span>
                        <ExternalLink size={12} />
                    </a>

                    <span className="text-white/30">•</span>

                    {/* Designed By */}
                    <span className="flex items-center gap-1 text-white/50">
                        Designed by xx with <Heart size={12} className="inline text-red-500" fill="currentColor" />
                    </span>
                </div>
            </footer>
        </div>
    );
};
