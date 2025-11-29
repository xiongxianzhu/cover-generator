import React, { useState } from 'react';
import {
    Wand2,
    Type,
    Palette,
    Layout,
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
} from 'lucide-react';
import type { CoverConfig } from '../types';
import { t } from '../utils/i18n';
import type { Language } from '../utils/i18n';
import { appThemes, type AppTheme } from '../types/theme';

interface ControlsProps {
    config: CoverConfig;
    handleChange: <K extends keyof CoverConfig>(key: K, value: CoverConfig[K]) => void;
    onDownload: () => void;
    isDownloading: boolean;
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
    isDownloading,
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
        title,
        subtitle,
        author,
        titleAlignment,
        titleSize,
        backgroundType,
        backgroundColor,
        theme,
        aspectRatio,
        showAuthor,
        showIcon,
        showDecoration,
        pattern,
        gradientPreset,
    } = config;

    return (
        <div className={`flex flex-col h-full ${appTheme.sidebar} ${appTheme.text}`}>
            {/* Magic Button */}
            <div className={`p-4 border-b ${appTheme.border}`}>
                <button
                    onClick={onRandomize}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/20 group"
                >
                    <Wand2 size={18} className="group-hover:rotate-12 transition-transform" />
                    {t('magic.button', currentLang)}
                </button>
            </div>

            {/* Tabs */}
            <div className={`flex border-b ${appTheme.border}`}>
                <button
                    onClick={() => setActiveTab('general')}
                    className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'general' ? `${appTheme.text} border-b-2 border-purple-500` : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                    <Type size={16} /> {t('tab.content', currentLang)}
                </button>
                <button
                    onClick={() => setActiveTab('style')}
                    className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'style' ? `${appTheme.text} border-b-2 border-purple-500` : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                    <Palette size={16} /> {t('tab.style', currentLang)}
                </button>
                <button
                    onClick={() => setActiveTab('layout')}
                    className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'layout' ? `${appTheme.text} border-b-2 border-purple-500` : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                    <Layout size={16} /> {t('tab.layout', currentLang)}
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">

                {/* General Tab */}
                {activeTab === 'general' && (
                    <div className="space-y-5">
                        <div className="space-y-3">
                            <label className={`text-xs font-semibold ${appTheme.text} uppercase tracking-wider opacity-70`}>{t('label.textContent', currentLang)}</label>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    placeholder={t('placeholder.title', currentLang)}
                                    className={`w-full ${appTheme.sidebar} border ${appTheme.border} rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all`}
                                />
                                <input
                                    type="text"
                                    value={subtitle}
                                    onChange={(e) => handleChange('subtitle', e.target.value)}
                                    placeholder={t('placeholder.subtitle', currentLang)}
                                    className={`w-full ${appTheme.sidebar} border ${appTheme.border} rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all`}
                                />
                                <input
                                    type="text"
                                    value={author}
                                    onChange={(e) => handleChange('author', e.target.value)}
                                    placeholder={t('placeholder.author', currentLang)}
                                    className={`w-full ${appTheme.sidebar} border ${appTheme.border} rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all`}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className={`text-xs font-semibold ${appTheme.text} uppercase tracking-wider opacity-70`}>{t('label.typography', currentLang)}</label>
                            <div className="grid grid-cols-2 gap-3">
                                <div className={`${appTheme.sidebar} rounded-lg p-1 flex`}>
                                    {['left', 'center', 'right'].map((align) => (
                                        <button
                                            key={align}
                                            onClick={() => handleChange('titleAlignment', align as any)}
                                            className={`flex-1 p-2 rounded flex items-center justify-center transition-colors ${titleAlignment === align ? 'bg-neutral-700 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}
                                        >
                                            {align === 'left' && <AlignLeft size={16} />}
                                            {align === 'center' && <AlignCenter size={16} />}
                                            {align === 'right' && <AlignRight size={16} />}
                                        </button>
                                    ))}
                                </div>
                                <select
                                    value={titleSize}
                                    onChange={(e) => handleChange('titleSize', e.target.value as any)}
                                    className={`${appTheme.sidebar} border ${appTheme.border} rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500`}
                                >
                                    <option value="small">{t('size.small', currentLang)}</option>
                                    <option value="medium">{t('size.medium', currentLang)}</option>
                                    <option value="large">{t('size.large', currentLang)}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Style Tab */}
                {activeTab === 'style' && (
                    <div className="space-y-5">
                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{t('label.background', currentLang)}</label>
                            <div className="grid grid-cols-2 gap-2">
                                {['solid', 'gradient', 'pattern', 'image'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => handleChange('backgroundType', type as any)}
                                        className={`px-3 py-2 rounded-lg text-sm border transition-all ${backgroundType === type
                                            ? 'bg-purple-600/20 border-purple-500 text-purple-200'
                                            : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-600'
                                            }`}
                                    >
                                        {t(`bg.${type}` as any, currentLang)}
                                    </button>
                                ))}
                            </div>

                            {backgroundType === 'image' ? (
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="bg-upload"
                                    />
                                    <label
                                        htmlFor="bg-upload"
                                        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed ${appTheme.border} rounded-lg cursor-pointer hover:border-purple-500 hover:${appTheme.sidebar}/50 transition-all`}
                                    >
                                        <Upload size={24} className={`text-neutral-500 mb-2`} />
                                        <span className="text-xs text-neutral-400">{t('upload.text', currentLang)}</span>
                                    </label>
                                </div>
                            ) : (
                                <>
                                    {backgroundType === 'gradient' && (
                                        <div className="space-y-3">
                                            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">渐变预设</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {['custom', 'sunset', 'ocean', 'forest', 'candy', 'aurora', 'flame'].map((preset) => (
                                                    <button
                                                        key={preset}
                                                        onClick={() => handleChange('gradientPreset', preset as any)}
                                                        className={`px-3 py-2 rounded-lg text-sm border transition-all ${gradientPreset === preset
                                                            ? 'bg-purple-600/20 border-purple-500 text-purple-200'
                                                            : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-600'
                                                            }`}
                                                    >
                                                        {t(`gradient.${preset}` as any, currentLang)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {(backgroundType === 'solid' || (backgroundType === 'gradient' && gradientPreset === 'custom')) && (
                                        <div className="flex items-center gap-3 bg-neutral-800 p-3 rounded-lg border border-neutral-700">
                                            <input
                                                type="color"
                                                value={backgroundColor}
                                                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                                                className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
                                            />
                                            <span className="text-sm text-neutral-300 font-mono">{backgroundColor}</span>
                                        </div>
                                    )}
                                </>
                            )}

                        {/* Pattern Selection */}
                        {backgroundType !== 'image' && (
                            <div className="space-y-3">
                                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">几何纹理</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['none', 'dots', 'lines', 'waves', 'grid', 'triangles'].map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => handleChange('pattern', p as any)}
                                            className={`px-3 py-2 rounded-lg text-sm border transition-all ${pattern === p
                                                ? 'bg-purple-600/20 border-purple-500 text-purple-200'
                                                : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-600'
                                                }`}
                                        >
                                            {t(`pattern.${p}` as any, currentLang)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{t('label.theme', currentLang)}</label>
                            <div className="grid grid-cols-2 gap-2">
                                {['modern', 'classic', 'bold', 'minimal'].map((tVal) => (
                                    <button
                                        key={tVal}
                                        onClick={() => handleChange('theme', tVal as any)}
                                        className={`px-3 py-2 rounded-lg text-sm border transition-all ${theme === tVal
                                            ? 'bg-purple-600/20 border-purple-500 text-purple-200'
                                            : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-600'
                                            }`}
                                    >
                                        {t(`theme.${tVal}` as any, currentLang)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Layout Tab */}
                {activeTab === 'layout' && (
                    <div className="space-y-5">
                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{t('label.aspectRatio', currentLang)}</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => handleChange('aspectRatio', '16:9')}
                                    className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${aspectRatio === '16:9' ? 'bg-purple-600/20 border-purple-500 text-purple-200' : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-600'}`}
                                >
                                    <Monitor size={20} />
                                    <span className="text-xs">16:9</span>
                                </button>
                                <button
                                    onClick={() => handleChange('aspectRatio', '1:1')}
                                    className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${aspectRatio === '1:1' ? 'bg-purple-600/20 border-purple-500 text-purple-200' : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-600'}`}
                                >
                                    <Instagram size={20} />
                                    <span className="text-xs">1:1</span>
                                </button>
                                <button
                                    onClick={() => handleChange('aspectRatio', '9:16')}
                                    className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${aspectRatio === '9:16' ? 'bg-purple-600/20 border-purple-500 text-purple-200' : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-600'}`}
                                >
                                    <Smartphone size={20} />
                                    <span className="text-xs">9:16</span>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{t('label.visibility', currentLang)}</label>
                            <div className="space-y-2">
                                <label className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg border border-neutral-700 cursor-pointer hover:bg-neutral-750 transition-colors">
                                    <span className="text-sm text-neutral-300">{t('label.showAuthor', currentLang)}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleChange('showAuthor', !showAuthor)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-800 ${
                                            showAuthor ? 'bg-purple-600' : 'bg-neutral-600'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                showAuthor ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </label>
                                <label className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg border border-neutral-700 cursor-pointer hover:bg-neutral-750 transition-colors">
                                    <span className="text-sm text-neutral-300">{t('label.showIcon', currentLang)}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleChange('showIcon', !showIcon)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-800 ${
                                            showIcon ? 'bg-purple-600' : 'bg-neutral-600'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                showIcon ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </label>
                                <label className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg border border-neutral-700 cursor-pointer hover:bg-neutral-750 transition-colors">
                                    <span className="text-sm text-neutral-300">{t('label.showDecoration', currentLang)}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleChange('showDecoration', !showDecoration)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-800 ${
                                            showDecoration ? 'bg-purple-600' : 'bg-neutral-600'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                showDecoration ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </label>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Zoom Controls */}
            <div className="p-4 border-t border-neutral-800 bg-neutral-900">
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{t('zoom.preview', currentLang)}</label>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onZoomOut}
                            disabled={zoomLevel <= 20}
                            className="p-2 bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title={`${t('zoom.out', currentLang)} (-)`}
                        >
                            <ZoomOut size={16} />
                        </button>
                        <div className="flex-1 text-center">
                            <span className="text-sm font-medium text-neutral-300">{zoomLevel}%</span>
                        </div>
                        <button
                            onClick={onZoomIn}
                            disabled={zoomLevel >= 150}
                            className="p-2 bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title={`${t('zoom.in', currentLang)} (+)`}
                        >
                            <ZoomIn size={16} />
                        </button>
                        <button
                            onClick={onZoomReset}
                            className="p-2 bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 transition-colors"
                            title={`${t('zoom.reset', currentLang)} (0)`}
                        >
                            <RotateCcw size={16} />
                        </button>
                    </div>
                    <div className="text-xs text-neutral-500 text-center">
                        快捷键: + / - / 0 | 滚轮: Ctrl + 滚轮
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-neutral-800 bg-neutral-900">
                <button
                    onClick={onDownload}
                    disabled={isDownloading}
                    className="w-full bg-white text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isDownloading ? (
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Download size={18} />
                    )}
                    {isDownloading ? t('button.exporting', currentLang) : t('button.export', currentLang)}
                </button>
            </div>
        </div>
    );
};


