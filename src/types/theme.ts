// 主题预设
export const appThemes = {
    dark: {
        bg: 'bg-black',
        sidebar: 'bg-neutral-950',
        border: 'border-neutral-800',
        text: 'text-white'
    },
    midnight: {
        bg: 'bg-slate-950',
        sidebar: 'bg-slate-900',
        border: 'border-slate-700',
        text: 'text-slate-100'
    },
    cyberpunk: {
        bg: 'bg-purple-950',
        sidebar: 'bg-purple-900',
        border: 'border-purple-700',
        text: 'text-purple-100'
    },
    forest: {
        bg: 'bg-green-950',
        sidebar: 'bg-green-900',
        border: 'border-green-700',
        text: 'text-green-100'
    },
    ocean: {
        bg: 'bg-blue-950',
        sidebar: 'bg-blue-900',
        border: 'border-blue-700',
        text: 'text-blue-100'
    }
} as const;

export type AppTheme = keyof typeof appThemes;