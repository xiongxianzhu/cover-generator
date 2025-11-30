import React, { useState } from 'react';
import {
    Wand2,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Upload,
    Monitor,
    Instagram,
    Smartphone,
    Download,
    ZoomIn,
    ZoomOut,
    RotateCcw,
    Cpu,
    Code,
    Database,
    Cloud,
    Layers,
    Package,
    Settings,
    Brush,
} from 'lucide-react';
import type { CoverConfig } from '../types';
import { t, type TranslationKey } from '../utils/i18n';
import type { Language } from '../utils/i18n';
import { appThemes, type AppTheme } from '../types/theme';

interface ControlsProps {
    config: CoverConfig;
    handleChange: <K extends keyof CoverConfig>(key: K, value: CoverConfig[K]) => void;
    onDownload: () => void;
    onDownload3D?: () => void; // 添加3D导出函数
    isDownloading: boolean;
    isDownloading3D?: boolean; // 添加3D导出状态
    onRandomize: () => void;
    currentLang: Language;
    currentTheme: AppTheme;
    zoomLevel: number;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onZoomReset: () => void;
}

type Tab = 'general' | 'style' | 'layout';

export const Controls: React.FC<ControlsProps> = ({
    config,
    handleChange,
    onDownload,
    onDownload3D, // 解构3D导出函数
    isDownloading,
    isDownloading3D, // 解构3D导出状态
    onRandomize,
    currentLang,
    currentTheme,
    zoomLevel,
    onZoomIn,
    onZoomOut,
    onZoomReset,
}) => {
    const appTheme = appThemes[currentTheme];
    const [activeTab, setActiveTab] = useState<Tab>('general');

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleChange('backgroundImage', reader.result as string);
                handleChange('backgroundType', 'image');
            };
            reader.readAsDataURL(file);
        }
    };

    const {
        backgroundColor,
        pattern,
        aspectRatio,
        backgroundType,
        gradientPreset,
        showAuthor,
        showIcon,
        showDecoration,
    } = config;

    const renderGeneralTab = () => {
        // 在函数内部解构所需的变量
        const {
            title,
            subtitle,
            author,
            titleAlignment,
            titleSize,
            showIcon,
            iconType,
        } = config;

        return (
            <div className="space-y-5">
                <div className="space-y-3">
                    <label className={`text-xs font-semibold ${appTheme.text} uppercase tracking-wider opacity-70`}>
                        {t('label.textContent', currentLang)}
                    </label>
                    <div className="space-y-3">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            placeholder={t('placeholder.title', currentLang)}
                            className={`w-full ${appTheme.input} rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        />
                        <input
                            type="text"
                            value={subtitle}
                            onChange={(e) => handleChange('subtitle', e.target.value)}
                            placeholder={t('placeholder.subtitle', currentLang)}
                            className={`w-full ${appTheme.input} rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        />
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => handleChange('author', e.target.value)}
                            placeholder={t('placeholder.author', currentLang)}
                            className={`w-full ${appTheme.input} rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        />
                    </div>
                </div>

                {/* Typography Section */}
                <div className="space-y-3">
                    <label className={`text-xs font-semibold ${appTheme.text} uppercase tracking-wider opacity-70`}>
                        {t('label.typography', currentLang)}
                    </label>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-1 xs:gap-2">
                            {['left', 'center', 'right'].map((align) => (
                                <button
                                    key={align}
                                    onClick={() => handleChange('titleAlignment', align as CoverConfig['titleAlignment'])}
                                    className={`flex-1 p-1.5 rounded xs:p-2 sm:p-2.5 flex items-center justify-center transition-all duration-200 transform ${titleAlignment === align
                                        ? `${appTheme.active} shadow-md scale-[1.05]`
                                        : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/50 hover:scale-[1.02]'}`}
                                >
                                    {align === 'left' && <AlignLeft size={14} className="xs:size-16" />}
                                    {align === 'center' && <AlignCenter size={14} className="xs:size-16" />}
                                    {align === 'right' && <AlignRight size={14} className="xs:size-16" />}
                                </button>
                            ))}
                        </div>
                        <div className="grid grid-cols-3 gap-1 xs:gap-2">
                            {['small', 'medium', 'large'].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => handleChange('titleSize', size as CoverConfig['titleSize'])}
                                    className={`px-2 py-1.5 rounded border transition-colors duration-150 text-xs xs:text-sm ${
                                        titleSize === size
                                            ? 'bg-white/15 text-white font-medium border-white/20'
                                            : 'text-white/70 border-white/10 bg-white/5 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {t(`size.${size}` as TranslationKey, currentLang)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Icon Type Selection */}
                {showIcon && (
                    <div className="space-y-3">
                        <label className={`text-xs font-semibold ${appTheme.text} uppercase tracking-wider opacity-70`}>
                            装饰图标类型
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                            {[
                                { type: 'brush', label: '画笔' },
                                { type: 'cpu', label: 'CPU' },
                                { type: 'code', label: '代码' },
                                { type: 'database', label: '数据库' },
                                { type: 'cloud', label: '云' },
                                { type: 'layers', label: '图层' },
                                { type: 'package', label: '包' },
                                { type: 'settings', label: '设置' }
                            ].map((icon) => (
                                <button
                                    key={icon.type}
                                    onClick={() => handleChange('iconType', icon.type as CoverConfig['iconType'])}
                                    className={`flex flex-col items-center justify-center p-2 rounded border transition-all duration-200 ${
                                        iconType === icon.type
                                            ? `${appTheme.active} shadow-md`
                                            : `${appTheme.button} ${appTheme.buttonBorder} ${appTheme.text} hover:${appTheme.text}/80 hover:shadow-md`
                                    }`}
                                >
                                    <div className="mb-1">
                                        {icon.type === 'brush' && <Brush size={20} />}
                                        {icon.type === 'cpu' && <Cpu size={20} />}
                                        {icon.type === 'code' && <Code size={20} />}
                                        {icon.type === 'database' && <Database size={20} />}
                                        {icon.type === 'cloud' && <Cloud size={20} />}
                                        {icon.type === 'layers' && <Layers size={20} />}
                                        {icon.type === 'package' && <Package size={20} />}
                                        {icon.type === 'settings' && <Settings size={20} />}
                                    </div>
                                    <span className="text-xs">{icon.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderStyleTab = () => {
        return (
            <div className="space-y-5">
                {/* Background Type */}
                <div className="space-y-3">
                    <label className={`text-xs font-semibold ${appTheme.text} uppercase tracking-wider opacity-70`}>
                        {t('label.background', currentLang)}
                    </label>
                    <div className="grid grid-cols-3 gap-1 xs:gap-2">
                        {['solid', 'gradient', 'image'].map((type) => (
                            <button
                                key={type}
                                onClick={() => handleChange('backgroundType', type as CoverConfig['backgroundType'])}
                                className={`px-2 py-1.5 rounded border transition-colors duration-150 text-xs xs:text-sm ${
                                    backgroundType === type
                                        ? 'bg-white/15 text-white font-medium border-white/20'
                                        : 'text-white/70 border-white/10 bg-white/5 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {t(`bg.${type}` as TranslationKey, currentLang)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Color Picker - Solid */}
                {backgroundType === 'solid' && (
                    <div className="space-y-3">
                        <label className={`text-xs font-semibold ${appTheme.text} uppercase tracking-wider opacity-70`}>
                            {t('label.backgroundColor', currentLang)}
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={backgroundColor}
                                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                                className="w-10 h-10 cursor-pointer rounded border border-neutral-600 bg-neutral-800"
                            />
                            <input
                                type="text"
                                value={backgroundColor}
                                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                                className={`flex-1 ${appTheme.input} rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                placeholder="#000000"
                            />
                        </div>
                    </div>
                )}

                {/* Gradient Preset */}
                {backgroundType === 'gradient' && (
                    <div className="space-y-3">
                        <label className={`text-xs font-semibold ${appTheme.text} uppercase tracking-wider opacity-70`}>
                            渐变预设
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {Object.entries({
                                sunset: '日落',
                                ocean: '海洋',
                                forest: '森林',
                                candy: '糖果',
                                aurora: '极光',
                                flame: '火焰',
                                custom: '自定义'
                            }).map(([preset, label]) => (
                                <button
                                    key={preset}
                                    onClick={() => handleChange('gradientPreset', preset as CoverConfig['gradientPreset'])}
                                    className={`p-2 rounded border transition-all duration-200 ${
                                        gradientPreset === preset
                                            ? `${appTheme.active} shadow-md`
                                            : `${appTheme.button} ${appTheme.buttonBorder} ${appTheme.text} hover:${appTheme.text}/80 hover:shadow-md`
                                    }`}
                                >
                                    <span className="text-xs">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Image Upload */}
                {backgroundType === 'image' && (
                    <div className="space-y-3">
                        <label className={`text-xs font-semibold ${appTheme.text} uppercase tracking-wider opacity-70`}>
                            {t('label.uploadImage', currentLang)}
                        </label>
                        <label className={`flex flex-col items-center justify-center p-4 ${appTheme.button} ${appTheme.buttonBorder} rounded border-2 border-dashed cursor-pointer transition-all duration-200 hover:shadow-md`}>
                            <Upload size={24} className="mb-2" />
                            <span className="text-sm font-medium">{t('button.upload', currentLang)}</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                    </div>
                )}

                {/* Pattern Overlay */}
                <div className="space-y-3">
                    <label className={`text-xs font-semibold ${appTheme.text} uppercase tracking-wider opacity-70`}>
                        {t('label.pattern', currentLang)}
                    </label>
                    <div className="grid grid-cols-3 gap-1 xs:gap-2">
                        {['none', 'dots', 'lines', 'waves', 'grid', 'triangles'].map((pat) => (
                            <button
                                key={pat}
                                onClick={() => handleChange('pattern', pat as CoverConfig['pattern'])}
                                className={`px-2 py-1.5 rounded border transition-colors duration-150 text-xs xs:text-sm ${
                                    pattern === pat
                                        ? 'bg-white/15 text-white font-medium border-white/20'
                                        : 'text-white/70 border-white/10 bg-white/5 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {t(`pattern.${pat}` as TranslationKey, currentLang)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderLayoutTab = () => {
        return (
            <div className="space-y-5">
                {/* Aspect Ratio */}
                <div className="space-y-3">
                    <label className={`text-xs font-semibold ${appTheme.text} uppercase tracking-wider opacity-70`}>{t('label.aspectRatio', currentLang)}</label>
                    <div className="grid grid-cols-3 gap-2">
                        <button
                            onClick={() => handleChange('aspectRatio', '16:9')}
                            className={`p-3.5 rounded border flex flex-col items-center gap-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${aspectRatio === '16:9' ? `${appTheme.active} shadow-lg scale-[1.02]` : `${appTheme.button} ${appTheme.buttonBorder} ${appTheme.text} hover:${appTheme.text}/80 hover:shadow-md`}`}
                        >
                            <Monitor size={20} className={aspectRatio === '16:9' ? 'text-purple-400' : ''} />
                            <span className={`text-xs font-medium ${aspectRatio === '16:9' ? 'text-purple-200' : 'text-neutral-400'}`}>16:9</span>
                        </button>
                        <button
                            onClick={() => handleChange('aspectRatio', '1:1')}
                            className={`p-3.5 rounded border flex flex-col items-center gap-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${aspectRatio === '1:1' ? `${appTheme.active} shadow-lg scale-[1.02]` : `${appTheme.button} ${appTheme.buttonBorder} ${appTheme.text} hover:${appTheme.text}/80 hover:shadow-md`}`}
                        >
                            <Instagram size={20} className={aspectRatio === '1:1' ? 'text-purple-400' : ''} />
                            <span className={`text-xs font-medium ${aspectRatio === '1:1' ? 'text-purple-200' : 'text-neutral-400'}`}>1:1</span>
                        </button>
                        <button
                            onClick={() => handleChange('aspectRatio', '9:16')}
                            className={`p-3.5 rounded border flex flex-col items-center gap-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${aspectRatio === '9:16' ? `${appTheme.active} shadow-lg scale-[1.02]` : `${appTheme.button} ${appTheme.buttonBorder} ${appTheme.text} hover:${appTheme.text}/80 hover:shadow-md`}`}
                        >
                            <Smartphone size={20} className={aspectRatio === '9:16' ? 'text-purple-400' : ''} />
                            <span className={`text-xs font-medium ${aspectRatio === '9:16' ? 'text-purple-200' : 'text-neutral-400'}`}>9:16</span>
                        </button>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className={`text-xs font-semibold ${appTheme.text} uppercase tracking-wider opacity-70`}>{t('label.visibility', currentLang)}</label>
                    <div className="space-y-2">
                        <label className={`flex items-center justify-between p-3.5 ${appTheme.button} rounded ${appTheme.buttonBorder} cursor-pointer ${appTheme.hover} transition-all duration-200 group hover:shadow-md transform hover:scale-[1.01] active:scale-[0.99]`}>
                            <span className="text-sm font-medium text-neutral-300 group-hover:text-neutral-200">{t('label.showAuthor', currentLang)}</span>
                            <button
                                type="button"
                                onClick={() => handleChange('showAuthor', !showAuthor)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-800 shadow-sm ${
                                    showAuthor ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-purple-900/30' : 'bg-neutral-600'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 shadow-md ${
                                        showAuthor ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </label>
                        <label className={`flex items-center justify-between p-3.5 ${appTheme.button} rounded ${appTheme.buttonBorder} cursor-pointer ${appTheme.hover} transition-all duration-200 group hover:shadow-md transform hover:scale-[1.01] active:scale-[0.99]`}>
                            <span className="text-sm font-medium text-neutral-300 group-hover:text-neutral-200">{t('label.showIcon', currentLang)}</span>
                            <button
                                type="button"
                                onClick={() => handleChange('showIcon', !showIcon)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-800 shadow-sm ${
                                    showIcon ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-purple-900/30' : 'bg-neutral-600'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 shadow-md ${
                                        showIcon ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </label>
                        <label className={`flex items-center justify-between p-3.5 ${appTheme.button} rounded ${appTheme.buttonBorder} cursor-pointer ${appTheme.hover} transition-all duration-200 group hover:shadow-md transform hover:scale-[1.01] active:scale-[0.99]`}>
                            <span className="text-sm font-medium text-neutral-300 group-hover:text-neutral-200">{t('label.showDecoration', currentLang)}</span>
                            <button
                                type="button"
                                onClick={() => handleChange('showDecoration', !showDecoration)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-800 shadow-sm ${
                                    showDecoration ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-purple-900/30' : 'bg-neutral-600'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 shadow-md ${
                                        showDecoration ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </label>
                        {/* 3D Effect Toggle */}
                        <label className={`flex items-center justify-between p-3.5 ${appTheme.button} rounded ${appTheme.buttonBorder} cursor-pointer ${appTheme.hover} transition-all duration-200 group hover:shadow-md transform hover:scale-[1.01] active:scale-[0.99]`}>
                            <span className="text-sm font-medium text-neutral-300 group-hover:text-neutral-200">3D效果</span>
                            <button
                                type="button"
                                onClick={() => handleChange('enable3DEffect', !config.enable3DEffect)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-800 shadow-sm ${
                                    config.enable3DEffect ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-purple-900/30' : 'bg-neutral-600'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 shadow-md ${
                                        config.enable3DEffect ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </label>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={`h-full flex flex-col ${appTheme.sidebar}`}>
            {/* Header */}
            <div className={`p-4 border-b ${appTheme.border}`}>
                <div className="flex items-center justify-between">
                    <button
                        onClick={onRandomize}
                        className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-white font-semibold py-3 px-4 rounded flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-purple-900/20 hover:shadow-purple-900/30 group transform hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm"
                        title={t('magic.button', currentLang)}
                    >
                        <Wand2 size={18} />
                        <span>{t('magic.button', currentLang)}</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className={`border-b ${appTheme.border}`}>
                <div className="flex">
                    {(['general', 'style', 'layout'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
                                activeTab === tab
                                    ? `${appTheme.active} ${appTheme.text}`
                                    : `${appTheme.button} ${appTheme.text} hover:${appTheme.text}/80`
                            }`}
                        >
                            {t(`tab.${tab}`, currentLang)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'general' && renderGeneralTab()}
                {activeTab === 'style' && renderStyleTab()}
                {activeTab === 'layout' && renderLayoutTab()}
            </div>

            {/* Zoom Controls */}
            <div className={`p-4 border-t ${appTheme.border}`}>
                <div className="space-y-3">
                    <label className={`text-xs font-semibold ${appTheme.text} uppercase tracking-wider opacity-70`}>{t('zoom.preview', currentLang)}</label>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onZoomOut}
                            disabled={zoomLevel <= 20}
                            className={`p-2 ${appTheme.button} ${appTheme.buttonBorder} rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                            title={`${t('zoom.out', currentLang)} (-)`}
                        >
                            <ZoomOut size={16} />
                        </button>
                        <div className={`flex-1 text-center ${appTheme.button} rounded px-2 py-2 ${appTheme.buttonBorder} shadow-sm`}>
                            <span className={`text-sm font-bold ${appTheme.accent}`}>{zoomLevel}%</span>
                        </div>
                        <button
                            onClick={onZoomIn}
                            disabled={zoomLevel >= 150}
                            className={`p-2 ${appTheme.button} ${appTheme.buttonBorder} rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                            title={`${t('zoom.in', currentLang)} (+)`}
                        >
                            <ZoomIn size={16} />
                        </button>
                        <button
                            onClick={onZoomReset}
                            className={`p-2 ${appTheme.button} ${appTheme.buttonBorder} rounded transition-all duration-200`}
                            title={`${t('zoom.reset', currentLang)} (0)`}
                        >
                            <RotateCcw size={16} />
                        </button>
                    </div>
                    <div className={`text-[0.6rem] xs:text-xs ${appTheme.text} opacity-60 text-center`}>
                        {t('zoom.shortcuts', currentLang)}
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className={`p-4 border-t ${appTheme.border}`}>
                {/* 3D导出按钮 */}
                {onDownload3D && (
                    <button
                        onClick={onDownload3D}
                        disabled={isDownloading3D}
                        className={`w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white font-bold py-3 px-4 rounded mb-3 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base`}
                    >
                        {isDownloading3D ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Download size={18} />
                        )}
                        {isDownloading3D ? "正在导出3D..." : "导出3D封面"}
                    </button>
                )}
                
                {/* 2D导出按钮 */}
                <button
                    onClick={onDownload}
                    disabled={isDownloading}
                    className="w-full bg-gradient-to-r from-white via-neutral-100 to-neutral-200 text-black font-bold py-3 px-4 rounded flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                    {isDownloading ? (
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Download size={18} className="text-neutral-700" />
                    )}
                    {isDownloading ? t('button.exporting', currentLang) : t('button.export', currentLang)}
                </button>
            </div>
        </div>
    );
};