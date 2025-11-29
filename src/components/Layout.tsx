import React from 'react';
import { Command } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
    sidebar: React.ReactNode;
    currentLang: 'en' | 'zh-CN';
    onToggleLanguage: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, sidebar, currentLang, onToggleLanguage }) => {
    return (
        <div className="h-screen bg-black text-white flex flex-col md:flex-row font-sans overflow-hidden">
            {/* Sidebar / Controls Panel */}
            <aside className="w-full md:w-[400px] bg-neutral-950 border-r border-neutral-800 flex flex-col h-full z-20 shadow-2xl">
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-800 bg-neutral-950/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex items-center gap-2 text-white">
                        <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center">
                            <Command size={18} />
                        </div>
                        <span className="font-bold tracking-tight text-lg">TechCover</span>
                    </div>
                    <button
                        onClick={onToggleLanguage}
                        className="text-xs font-medium px-2 py-1 rounded border border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors"
                    >
                        {currentLang === 'en' ? 'EN' : '中'}
                    </button>
                </div>

                {/* Controls Content */}
                <div className="flex-1 overflow-hidden flex flex-col">
                    {sidebar}
                </div>
            </aside>

            {/* Main Preview Area */}
            <main className="flex-1 bg-black relative flex items-center justify-center overflow-hidden p-8">
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Radial Gradient for focus */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/50 via-black to-black pointer-events-none" />

                {/* Content Container */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    {children}
                </div>
            </main>
        </div>
    );
};
