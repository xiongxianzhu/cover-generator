import React, { useState, useEffect, useRef } from 'react';
import { Globe, Palette } from 'lucide-react';
import { t } from '../utils/i18n';
import type { Language } from '../utils/i18n';
import { appThemes, type AppTheme } from '../types/theme';

interface LayoutProps {
    children: React.ReactNode;
    sidebar: React.ReactNode;
    currentLang: Language;
    onToggleLanguage: (lang: Language) => void;
    currentTheme?: AppTheme;
    onThemeChange?: (theme: AppTheme) => void;
    onWheel?: (event: WheelEvent) => void;
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
        <div className={`h-screen ${theme.bg} ${theme.text} flex flex-col md:flex-row font-sans overflow-hidden`}>
            {/* Sidebar / Controls Panel */}
            <aside className={`w-full md:w-[400px] ${theme.sidebar} border-r ${theme.border} flex flex-col h-full z-20 shadow-2xl ${currentTheme === 'cyberpunk' ? 'glass-effect-cyberpunk' : currentTheme === 'forest' ? 'glass-effect-forest' : currentTheme === 'ocean' ? 'glass-effect-ocean' : currentTheme === 'sunset' ? 'glass-effect-sunset' : currentTheme === 'aurora' ? 'glass-effect-aurora' : 'glass-effect-dark'}`}>
                {/* Header */}
                <div className={`h-16 flex items-center justify-between px-6 ${theme.sidebar}/70 backdrop-blur-md sticky top-0 z-10 glass-effect`}>
                    <div className="flex items-center gap-3 text-white group">
                        <img
                            src="/logo.png"
                            alt={t('app.title', currentLang)}
                            className="w-12 h-12 rounded-xl object-cover transition-all duration-200"
                        />
                        <span className="font-bold tracking-tight text-lg bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">{t('app.title', currentLang)}</span>
                    </div>

                    {/* Language and Theme Dropdowns */}
                    <div className="flex items-center gap-2">
                        {/* Theme Dropdown */}
                        <div className="relative" ref={themeDropdownRef}>
                            <button
                                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                                className={`text-xs font-medium px-3 py-1.5 rounded-xl border ${theme.border} ${theme.text} ${theme.button} hover:shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5`}
                            >
                                <Palette size={14} className="text-purple-400" />
                                <span className="font-medium">{t(`theme.${currentTheme}` as any, currentLang)}</span>
                            </button>
                            {showThemeDropdown && (
                                <div className={`absolute right-0 top-full mt-2 w-36 ${theme.sidebar} border ${theme.border} rounded-xl shadow-2xl z-50 backdrop-blur-sm transform transition-all duration-200 glass-effect`}>
                                    {Object.entries(appThemes).map(([key]) => (
                                        <button
                                            key={key}
                                            onClick={() => {
                                                setCurrentTheme(key as AppTheme);
                                                setShowThemeDropdown(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 text-sm hover:bg-white/10 transition-all duration-200 ${currentTheme === key ? 'bg-white/20 text-purple-300 font-medium' : ''} ${theme.text} transform hover:scale-[1.02]`}
                                        >
                                            <span className="flex items-center gap-2">
                                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${key === 'cyberpunk' ? 'from-purple-500 to-pink-500' : key === 'forest' ? 'from-green-500 to-emerald-500' : key === 'ocean' ? 'from-blue-500 to-cyan-500' : key === 'sunset' ? 'from-orange-500 to-yellow-500' : key === 'aurora' ? 'from-teal-500 to-lime-500' : 'from-gray-500 to-gray-600'}`}></div>
                                                {t(`theme.${key}` as any, currentLang)}
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
                                className={`text-xs font-medium px-3 py-1.5 rounded-xl border ${theme.border} ${theme.text} ${theme.button} hover:shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5`}
                            >
                                <Globe size={14} className="text-blue-400" />
                                <span className="font-medium">{currentLang === 'en' ? 'EN' : '中'}</span>
                            </button>
                            {showLangDropdown && (
                                <div className={`absolute right-0 top-full mt-2 w-32 ${theme.sidebar} border ${theme.border} rounded-xl shadow-2xl z-50 backdrop-blur-sm transform transition-all duration-200 glass-effect`}>
                                    <button
                                        onClick={() => {
                                            onToggleLanguage('zh-CN');
                                            setShowLangDropdown(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 text-sm hover:bg-white/10 transition-all duration-200 ${currentLang === 'zh-CN' ? 'bg-white/20 text-red-300 font-medium' : ''} ${theme.text} transform hover:scale-[1.02]`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className="text-red-400">🇨🇳</span>
                                            中文
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            onToggleLanguage('en');
                                            setShowLangDropdown(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 text-sm hover:bg-white/10 transition-all duration-200 ${currentLang === 'en' ? 'bg-white/20 text-blue-300 font-medium' : ''} ${theme.text} transform hover:scale-[1.02]`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className="text-blue-400">🇺🇸</span>
                                            English
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

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
    );
};
