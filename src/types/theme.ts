// 扁平化主题预设
export const appThemes = {
    dark: {
        bg: 'bg-gray-950',
        sidebar: 'bg-gray-900',
        border: 'border-gray-800',
        text: 'text-gray-100',
        accent: 'text-gray-300',
        hover: 'hover:bg-gray-800',
        button: 'bg-gray-800 hover:bg-gray-700',
        buttonBorder: 'border-gray-700',
        active: 'bg-gray-700 border-gray-600 text-white',
        input: 'bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-400 focus:border-gray-600 input-base'
    },
    midnight: {
        bg: 'bg-slate-900',
        sidebar: 'bg-slate-800',
        border: 'border-slate-700',
        text: 'text-slate-100',
        accent: 'text-slate-300',
        hover: 'hover:bg-slate-700',
        button: 'bg-slate-700 hover:bg-slate-600',
        buttonBorder: 'border-slate-600',
        active: 'bg-slate-600 border-slate-500 text-white',
        input: 'bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-slate-500 input-base'
    },
    cyberpunk: {
        bg: 'bg-purple-900',
        sidebar: 'bg-purple-800',
        border: 'border-purple-700',
        text: 'text-purple-100',
        accent: 'text-purple-300',
        hover: 'hover:bg-purple-700',
        button: 'bg-purple-700 hover:bg-purple-600',
        buttonBorder: 'border-purple-600',
        active: 'bg-purple-600 border-purple-500 text-white',
        input: 'bg-purple-700 border-purple-600 text-purple-100 placeholder:text-purple-300 focus:border-purple-500 input-base'
    },
    forest: {
        bg: 'bg-green-900',
        sidebar: 'bg-green-800',
        border: 'border-green-700',
        text: 'text-green-100',
        accent: 'text-green-300',
        hover: 'hover:bg-green-700',
        button: 'bg-green-700 hover:bg-green-600',
        buttonBorder: 'border-green-600',
        active: 'bg-green-600 border-green-500 text-white',
        input: 'bg-green-700 border-green-600 text-green-100 placeholder:text-green-300 focus:border-green-500 input-base'
    },
    ocean: {
        bg: 'bg-blue-900',
        sidebar: 'bg-blue-800',
        border: 'border-blue-700',
        text: 'text-blue-100',
        accent: 'text-blue-300',
        hover: 'hover:bg-blue-700',
        button: 'bg-blue-700 hover:bg-blue-600',
        buttonBorder: 'border-blue-600',
        active: 'bg-blue-600 border-blue-500 text-white',
        input: 'bg-blue-700 border-blue-600 text-blue-100 placeholder:text-blue-300 focus:border-blue-500 input-base'
    },
    sunset: {
        bg: 'bg-orange-900',
        sidebar: 'bg-orange-800',
        border: 'border-orange-700',
        text: 'text-orange-100',
        accent: 'text-orange-300',
        hover: 'hover:bg-orange-700',
        button: 'bg-orange-700 hover:bg-orange-600',
        buttonBorder: 'border-orange-600',
        active: 'bg-orange-600 border-orange-500 text-white',
        input: 'bg-orange-700 border-orange-600 text-orange-100 placeholder:text-orange-300 focus:border-orange-500 input-base'
    },
    aurora: {
        bg: 'bg-teal-900',
        sidebar: 'bg-teal-800',
        border: 'border-teal-700',
        text: 'text-teal-100',
        accent: 'text-teal-300',
        hover: 'hover:bg-teal-700',
        button: 'bg-teal-700 hover:bg-teal-600',
        buttonBorder: 'border-teal-600',
        active: 'bg-teal-600 border-teal-500 text-white',
        input: 'bg-teal-700 border-teal-600 text-teal-100 placeholder:text-teal-300 focus:border-teal-500 input-base'
    }
} as const;

export type AppTheme = keyof typeof appThemes;