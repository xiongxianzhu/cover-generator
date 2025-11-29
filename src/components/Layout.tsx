import React, { useState, useEffect, useRef } from 'react';
import { Command, Globe, Sun, Moon, Palette } from 'lucide-react';
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
}

export const Layout: React.FC<LayoutProps> = ({
    children,
    sidebar,
    currentLang,
    onToggleLanguage,
    currentTheme: externalCurrentTheme,
    onThemeChange
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

    // 点击外部关闭下拉菜单
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
    }, []);

    return (
        <div className={`h-screen ${theme.bg} ${theme.text} flex flex-col md:flex-row font-sans overflow-hidden`}>
            {/* Sidebar / Controls Panel */}
            <aside className={`w-full md:w-[400px] ${theme.sidebar} border-r ${theme.border} flex flex-col h-full z-20 shadow-2xl`}>
                {/* Header */}
                <div className={`h-16 flex items-center justify-between px-6 border-b ${theme.border} ${theme.sidebar}/50 backdrop-blur-sm sticky top-0 z-10`}>
                    <div className="flex items-center gap-2 text-white">
                        <img
                            src="/logo.png"
                            alt="TechCover Logo"
                            className="w-8 h-8 rounded-lg object-cover"
                        />
                        <span className="font-bold tracking-tight text-lg">TechCover</span>
                    </div>

                    {/* Language and Theme Dropdowns */}
                    <div className="flex items-center gap-2">
                        {/* Theme Dropdown */}
                        <div className="relative" ref={themeDropdownRef}>
                            <button
                                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                                className={`text-xs font-medium px-3 py-1.5 rounded-md border ${theme.border} ${theme.text} hover:bg-white/10 transition-colors flex items-center gap-1`}
                            >
                                <Palette size={14} />
                                {t(`theme.${currentTheme}` as any, currentLang)}
                            </button>
                            {showThemeDropdown && (
                                <div className={`absolute right-0 top-full mt-1 w-32 ${theme.sidebar} border ${theme.border} rounded-md shadow-lg z-50`}>
                                    {Object.entries(appThemes).map(([key]) => (
                                        <button
                                            key={key}
                                            onClick={() => {
                                                setCurrentTheme(key as AppTheme);
                                                setShowThemeDropdown(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 text-sm hover:bg-white/10 transition-colors ${currentTheme === key ? 'bg-white/20' : ''} ${theme.text}`}
                                        >
                                            {t(`theme.${key}` as any, currentLang)}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Language Dropdown */}
                        <div className="relative" ref={langDropdownRef}>
                            <button
                                onClick={() => setShowLangDropdown(!showLangDropdown)}
                                className={`text-xs font-medium px-3 py-1.5 rounded-md border ${theme.border} ${theme.text} hover:bg-white/10 transition-colors flex items-center gap-1`}
                            >
                                <Globe size={14} />
                                {currentLang === 'en' ? 'EN' : '中'}
                            </button>
                            {showLangDropdown && (
                                <div className={`absolute right-0 top-full mt-1 w-24 ${theme.sidebar} border ${theme.border} rounded-md shadow-lg z-50`}>
                                    <button
                                        onClick={() => {
                                            onToggleLanguage('en');
                                            setShowLangDropdown(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 text-sm hover:bg-white/10 transition-colors ${currentLang === 'en' ? 'bg-white/20' : ''} ${theme.text}`}
                                    >
                                        English
                                    </button>
                                    <button
                                        onClick={() => {
                                            onToggleLanguage('zh-CN');
                                            setShowLangDropdown(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 text-sm hover:bg-white/10 transition-colors ${currentLang === 'zh-CN' ? 'bg-white/20' : ''} ${theme.text}`}
                                    >
                                        中文
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
            <main className={`flex-1 ${theme.bg} relative flex items-center justify-center overflow-hidden p-8`}>
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(${currentTheme === 'cyberpunk' ? '#a855f7' : currentTheme === 'forest' ? '#22c55e' : currentTheme === 'ocean' ? '#3b82f6' : '#333'} 1px, transparent 1px), linear-gradient(90deg, ${currentTheme === 'cyberpunk' ? '#a855f7' : currentTheme === 'forest' ? '#22c55e' : currentTheme === 'ocean' ? '#3b82f6' : '#333'} 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Radial Gradient for focus */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />

                {/* Content Container */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    {children}
                </div>
            </main>
        </div>
    );
};
