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
                    className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-purple-900/20 hover:shadow-purple-900/30 group transform hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm"
                >
                    <Wand2 size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                    {t('magic.button', currentLang)}
                </button>
            </div>

            {/* Tabs */}
            <div className={`flex border-b ${appTheme.border}`}>
                <button
                    onClick={() => setActiveTab('general')}
                    className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 ${activeTab === 'general' ? `${appTheme.text} border-b-2 ${appTheme.accent.replace('text-', 'border-')} bg-gradient-to-b from-transparent to-purple-600/10` : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/30'}`}
                >
                    <Type size={16} className={activeTab === 'general' ? 'text-purple-400' : ''} />
                    {t('tab.content', currentLang)}
                </button>
                <button
                    onClick={() => setActiveTab('style')}
                    className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 ${activeTab === 'style' ? `${appTheme.text} border-b-2 ${appTheme.accent.replace('text-', 'border-')} bg-gradient-to-b from-transparent to-purple-600/10` : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/30'}`}
                >
                    <Palette size={16} className={activeTab === 'style' ? 'text-purple-400' : ''} />
                    {t('tab.style', currentLang)}
                </button>
                <button
                    onClick={() => setActiveTab('layout')}
                    className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 ${activeTab === 'layout' ? `${appTheme.text} border-b-2 ${appTheme.accent.replace('text-', 'border-')} bg-gradient-to-b from-transparent to-purple-600/10` : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/30'}`}
                >
                    <Layout size={16} className={activeTab === 'layout' ? 'text-purple-400' : ''} />
                    {t('tab.layout', currentLang)}
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
                                    className={`w-full ${appTheme.input} rounded-lg px-4 py-3 text-sm transition-all duration-200 transform hover:scale-[1.01] focus:scale-[1.01] shadow-sm hover:shadow-md focus:shadow-lg`}
                                />
                                <input
                                    type="text"
                                    value={subtitle}
                                    onChange={(e) => handleChange('subtitle', e.target.value)}
                                    placeholder={t('placeholder.subtitle', currentLang)}
                                    className={`w-full ${appTheme.input} rounded-lg px-4 py-3 text-sm transition-all duration-200 transform hover:scale-[1.01] focus:scale-[1.01] shadow-sm hover:shadow-md focus:shadow-lg`}
                                />
                                <input
                                    type="text"
                                    value={author}
                                    onChange={(e) => handleChange('author', e.target.value)}
                                    placeholder={t('placeholder.author', currentLang)}
                                    className={`w-full ${appTheme.input} rounded-lg px-4 py-3 text-sm transition-all duration-200 transform hover:scale-[1.01] focus:scale-[1.01] shadow-sm hover:shadow-md focus:shadow-lg`}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className={`text-xs font-semibold ${appTheme.text} uppercase tracking-wider opacity-70`}>{t('label.typography', currentLang)}</label>
                            <div className="grid grid-cols-2 gap-3">
                                <div className={`${appTheme.sidebar} rounded-xl p-1.5 flex shadow-sm ${appTheme.buttonBorder}`}>
                                    {['left', 'center', 'right'].map((align) => (
                                        <button
                                            key={align}
                                            onClick={() => handleChange('titleAlignment', align as any)}
                                            className={`flex-1 p-2.5 rounded-lg flex items-center justify-center transition-all duration-200 transform ${titleAlignment === align
                                                ? `${appTheme.active} shadow-md scale-[1.05]`
                                                : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/50 hover:scale-[1.02]'}`}
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
                                    className={`${appTheme.input} rounded-lg px-4 py-3 text-sm transition-all duration-200 transform hover:scale-[1.01] focus:scale-[1.01] shadow-sm hover:shadow-md focus:shadow-lg cursor-pointer`}
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
                                        className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${backgroundType === type
                                            ? `${appTheme.active} shadow-lg scale-[1.02] border-${appTheme.accent.replace('text-', '').replace('-400', '-500')}`
                                            : `${appTheme.button} ${appTheme.buttonBorder} text-neutral-400 hover:text-neutral-300 hover:shadow-md`
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
                                        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed ${appTheme.border} rounded-xl cursor-pointer hover:${appTheme.accent}/20 hover:border-${appTheme.accent.replace('text-', '').replace('-400', '-500')} hover:${appTheme.sidebar}/50 transition-all duration-200 group transform hover:scale-[1.01] active:scale-[0.99] backdrop-blur-sm`}
                                    >
                                        <Upload size={24} className={`text-neutral-500 mb-2 group-hover:${appTheme.accent} transition-colors duration-200`} />
                                        <span className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors duration-200">{t('upload.text', currentLang)}</span>
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
                                                        className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${gradientPreset === preset
                                                            ? `${appTheme.active} shadow-lg scale-[1.02]`
                                                            : `${appTheme.button} ${appTheme.buttonBorder} text-neutral-400 hover:text-neutral-300 hover:shadow-md`
                                                            }`}
                                                    >
                                                        {t(`gradient.${preset}` as any, currentLang)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {(backgroundType === 'solid' || (backgroundType === 'gradient' && gradientPreset === 'custom')) && (
                                        <div className={`flex items-center gap-3 ${appTheme.button} p-3 rounded-xl ${appTheme.buttonBorder} shadow-sm hover:shadow-md transition-all duration-200 group`}>
                                            <div className="relative">
                                                <input
                                                    type="color"
                                                    value={backgroundColor}
                                                    onChange={(e) => handleChange('backgroundColor', e.target.value)}
                                                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-2 border-neutral-600 hover:border-purple-500 transition-colors duration-200 shadow-sm"
                                                />
                                                <div className="absolute inset-0 rounded-lg pointer-events-none" style={{ backgroundColor, opacity: 0.2 }}></div>
                                            </div>
                                            <span className={`text-sm ${appTheme.accent} font-mono font-medium group-hover:scale-[1.02] transition-transform duration-200`}>{backgroundColor}</span>
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
                                            className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${pattern === p
                                                ? `${appTheme.active} shadow-lg scale-[1.02]`
                                                : `${appTheme.button} ${appTheme.buttonBorder} text-neutral-400 hover:text-neutral-300 hover:shadow-md`
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
                                        className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${theme === tVal
                                            ? `${appTheme.active} shadow-lg scale-[1.02]`
                                            : `${appTheme.button} ${appTheme.buttonBorder} text-neutral-400 hover:text-neutral-300 hover:shadow-md`
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
                                    className={`p-3.5 rounded-xl border flex flex-col items-center gap-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${aspectRatio === '16:9' ? `${appTheme.active} shadow-lg scale-[1.02]` : `${appTheme.button} ${appTheme.buttonBorder} text-neutral-400 hover:text-neutral-300 hover:shadow-md`}`}
                                >
                                    <Monitor size={20} className={aspectRatio === '16:9' ? 'text-purple-400' : ''} />
                                    <span className={`text-xs font-medium ${aspectRatio === '16:9' ? 'text-purple-200' : 'text-neutral-400'}`}>16:9</span>
                                </button>
                                <button
                                    onClick={() => handleChange('aspectRatio', '1:1')}
                                    className={`p-3.5 rounded-xl border flex flex-col items-center gap-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${aspectRatio === '1:1' ? `${appTheme.active} shadow-lg scale-[1.02]` : `${appTheme.button} ${appTheme.buttonBorder} text-neutral-400 hover:text-neutral-300 hover:shadow-md`}`}
                                >
                                    <Instagram size={20} className={aspectRatio === '1:1' ? 'text-purple-400' : ''} />
                                    <span className={`text-xs font-medium ${aspectRatio === '1:1' ? 'text-purple-200' : 'text-neutral-400'}`}>1:1</span>
                                </button>
                                <button
                                    onClick={() => handleChange('aspectRatio', '9:16')}
                                    className={`p-3.5 rounded-xl border flex flex-col items-center gap-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${aspectRatio === '9:16' ? `${appTheme.active} shadow-lg scale-[1.02]` : `${appTheme.button} ${appTheme.buttonBorder} text-neutral-400 hover:text-neutral-300 hover:shadow-md`}`}
                                >
                                    <Smartphone size={20} className={aspectRatio === '9:16' ? 'text-purple-400' : ''} />
                                    <span className={`text-xs font-medium ${aspectRatio === '9:16' ? 'text-purple-200' : 'text-neutral-400'}`}>9:16</span>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{t('label.visibility', currentLang)}</label>
                            <div className="space-y-2">
                                <label className={`flex items-center justify-between p-3.5 ${appTheme.button} rounded-xl ${appTheme.buttonBorder} cursor-pointer ${appTheme.hover} transition-all duration-200 group hover:shadow-md transform hover:scale-[1.01] active:scale-[0.99]`}>
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
                                <label className={`flex items-center justify-between p-3.5 ${appTheme.button} rounded-xl ${appTheme.buttonBorder} cursor-pointer ${appTheme.hover} transition-all duration-200 group hover:shadow-md transform hover:scale-[1.01] active:scale-[0.99]`}>
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
                                <label className={`flex items-center justify-between p-3.5 ${appTheme.button} rounded-xl ${appTheme.buttonBorder} cursor-pointer ${appTheme.hover} transition-all duration-200 group hover:shadow-md transform hover:scale-[1.01] active:scale-[0.99]`}>
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
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Zoom Controls */}
            <div className={`p-4 border-t ${appTheme.border} ${appTheme.button}`}>
                <div className="space-y-3">
                    <label className={`text-xs font-semibold ${appTheme.text} uppercase tracking-wider opacity-70`}>{t('zoom.preview', currentLang)}</label>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onZoomOut}
                            disabled={zoomLevel <= 20}
                            className={`p-2.5 ${appTheme.button} ${appTheme.buttonBorder} rounded-lg ${appTheme.hover} transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.05] active:scale-[0.95] shadow-sm hover:shadow-md`}
                            title={`${t('zoom.out', currentLang)} (-)`}
                        >
                            <ZoomOut size={16} />
                        </button>
                        <div className={`flex-1 text-center ${appTheme.button} rounded-lg px-3 py-2 ${appTheme.buttonBorder} shadow-sm`}>
                            <span className={`text-sm font-bold ${appTheme.accent}`}>{zoomLevel}%</span>
                        </div>
                        <button
                            onClick={onZoomIn}
                            disabled={zoomLevel >= 150}
                            className={`p-2.5 ${appTheme.button} ${appTheme.buttonBorder} rounded-lg ${appTheme.hover} transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.05] active:scale-[0.95] shadow-sm hover:shadow-md`}
                            title={`${t('zoom.in', currentLang)} (+)`}
                        >
                            <ZoomIn size={16} />
                        </button>
                        <button
                            onClick={onZoomReset}
                            className={`p-2.5 ${appTheme.button} ${appTheme.buttonBorder} rounded-lg ${appTheme.hover} transition-all duration-200 transform hover:scale-[1.05] active:scale-[0.95] shadow-sm hover:shadow-md`}
                            title={`${t('zoom.reset', currentLang)} (0)`}
                        >
                            <RotateCcw size={16} />
                        </button>
                    </div>
                    <div className={`text-xs ${appTheme.text} opacity-60 text-center`}>
                        快捷键: + / - / 0 | 滚轮: Ctrl + 滚轮
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className={`p-4 border-t ${appTheme.border} ${appTheme.button}`}>
                <button
                    onClick={onDownload}
                    disabled={isDownloading}
                    className="w-full bg-gradient-to-r from-white via-neutral-100 to-neutral-200 text-black font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:from-neutral-100 hover:via-neutral-200 hover:to-neutral-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl border border-neutral-300"
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


