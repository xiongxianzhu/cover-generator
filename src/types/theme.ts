// 主题预设 - 美化大气版本
export const appThemes = {
    dark: {
        bg: 'bg-black',
        sidebar: 'bg-neutral-950',
        border: 'border-neutral-800',
        text: 'text-white',
        accent: 'text-purple-400',
        hover: 'hover:bg-neutral-900',
        button: 'bg-neutral-800 hover:bg-neutral-700',
        buttonBorder: 'border-neutral-700',
        active: 'bg-purple-600/20 border-purple-500 text-purple-200',
        input: 'bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500'
    },
    midnight: {
        bg: 'bg-slate-950',
        sidebar: 'bg-slate-900',
        border: 'border-slate-700',
        text: 'text-slate-100',
        accent: 'text-blue-400',
        hover: 'hover:bg-slate-800',
        button: 'bg-slate-800 hover:bg-slate-700',
        buttonBorder: 'border-slate-600',
        active: 'bg-blue-600/20 border-blue-500 text-blue-200',
        input: 'bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
    },
    cyberpunk: {
        bg: 'bg-purple-950',
        sidebar: 'bg-purple-900/30',
        border: 'border-purple-700/50',
        text: 'text-purple-100',
        accent: 'text-pink-400',
        hover: 'hover:bg-purple-900/50',
        button: 'bg-purple-900/50 hover:bg-purple-800/50 border-purple-700',
        buttonBorder: 'border-purple-700',
        active: 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-purple-400 text-purple-100',
        input: 'bg-purple-950/50 border-purple-700 text-purple-100 placeholder:text-purple-400 focus:border-pink-500 focus:ring-1 focus:ring-pink-500/50'
    },
    forest: {
        bg: 'bg-green-950',
        sidebar: 'bg-green-900/30',
        border: 'border-green-700/50',
        text: 'text-green-100',
        accent: 'text-emerald-400',
        hover: 'hover:bg-green-900/50',
        button: 'bg-green-900/50 hover:bg-green-800/50 border-green-700',
        buttonBorder: 'border-green-700',
        active: 'bg-gradient-to-r from-green-600/30 to-emerald-600/30 border-emerald-500 text-emerald-100',
        input: 'bg-green-950/50 border-green-700 text-green-100 placeholder:text-green-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50'
    },
    ocean: {
        bg: 'bg-blue-950',
        sidebar: 'bg-blue-900/30',
        border: 'border-blue-700/50',
        text: 'text-blue-100',
        accent: 'text-cyan-400',
        hover: 'hover:bg-blue-900/50',
        button: 'bg-blue-900/50 hover:bg-blue-800/50 border-blue-700',
        buttonBorder: 'border-blue-700',
        active: 'bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border-cyan-500 text-cyan-100',
        input: 'bg-blue-950/50 border-blue-700 text-blue-100 placeholder:text-blue-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50'
    },
    sunset: {
        bg: 'bg-orange-950',
        sidebar: 'bg-orange-900/30',
        border: 'border-orange-700/50',
        text: 'text-orange-100',
        accent: 'text-yellow-400',
        hover: 'hover:bg-orange-900/50',
        button: 'bg-orange-900/50 hover:bg-orange-800/50 border-orange-700',
        buttonBorder: 'border-orange-700',
        active: 'bg-gradient-to-r from-orange-600/30 to-yellow-600/30 border-yellow-500 text-yellow-100',
        input: 'bg-orange-950/50 border-orange-700 text-orange-100 placeholder:text-orange-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50'
    },
    aurora: {
        bg: 'bg-teal-950',
        sidebar: 'bg-teal-900/30',
        border: 'border-teal-700/50',
        text: 'text-teal-100',
        accent: 'text-lime-400',
        hover: 'hover:bg-teal-900/50',
        button: 'bg-teal-900/50 hover:bg-teal-800/50 border-teal-700',
        buttonBorder: 'border-teal-700',
        active: 'bg-gradient-to-r from-teal-600/30 to-lime-600/30 border-lime-500 text-lime-100',
        input: 'bg-teal-950/50 border-teal-700 text-teal-100 placeholder:text-teal-400 focus:border-lime-500 focus:ring-1 focus:ring-lime-500/50'
    }
} as const;

export type AppTheme = keyof typeof appThemes;