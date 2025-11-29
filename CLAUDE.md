# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个技术封面生成器（Cover Generator），用于创建高质量的技术相关封面图片。支持实时预览、多种主题、自定义文本和背景配置。

## 常用命令

### 开发环境
```bash
npm install        # 安装依赖
npm run dev        # 启动开发服务器（http://localhost:5173）
npm run build      # 构建生产版本
npm run preview    # 预览构建结果
npm run lint       # 代码检查
```

### Vite 特定命令
```bash
vite --host --port 3000  # 使用自定义端口和主机
vite build               # 构建项目
```

## 技术架构

### 技术栈
- **前端**: React 19.2.0 + TypeScript (严格模式)
- **构建工具**: Vite 7.2.4
- **样式**: Tailwind CSS 4.1.17 + PostCSS
- **图标**: Lucide React
- **图片导出**: html-to-image
- **代码质量**: ESLint + TypeScript ESLint

### 核心组件结构
```
src/
├── components/
│   ├── App.tsx       # 主应用组件，状态管理
│   ├── Layout.tsx    # 响应式布局组件
│   ├── Preview.tsx   # 封面预览组件
│   └── Controls.tsx  # 控制面板组件
├── utils/i18n.ts     # 国际化工具（中英文切换）
├── types.ts          # TypeScript 类型定义
└── main.tsx          # 应用入口
```

### 状态管理
项目使用 React Hooks 进行状态管理，主要状态包括：
- `content`: 封面内容（标题、副标题、作者）
- `theme`: 当前主题（modern, classic, bold, minimal）
- `backgroundColor`: 背景色配置
- `backgroundType`: 背景类型（solid, gradient, pattern, image）
- `aspectRatio`: 宽高比配置

## 配置文件

### TypeScript 配置
- `tsconfig.json`: 主配置，引用 app 和 node 配置
- `tsconfig.app.json`: 应用配置，启用严格模式
- `tsconfig.node.json`: Node.js 环境配置

### Vite 配置 (vite.config.ts)
使用 React 插件，支持开发服务器和生产构建。

### ESLint 配置 (eslint.config.js)
使用现代 flat config 格式，包含 React、React Hooks、React Refresh 和 TypeScript 规则。

## 开发注意事项

### React 19 特性
- 项目使用 React 19，支持最新的特性和优化
- 启用了 React Compiler（在 src/main.tsx 中）

### TypeScript 严格模式
项目启用了 TypeScript 严格类型检查，所有代码必须符合严格类型要求。

### 国际化支持
项目支持中英文双语切换，相关功能在 `src/utils/i18n.ts` 中实现。

### 组件开发
- 使用函数式组件和 Hooks
- 遵循 TypeScript 严格类型检查
- 使用 Tailwind CSS 进行样式设计
- 组件应支持响应式布局

### 图片导出功能
使用 html-to-image 库实现 PNG 格式的高质量图片导出功能。