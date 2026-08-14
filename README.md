# Tuning-Luna.github.io

Tuning-Luna 的个人主页（Personal homepage），基于 **React + Vite + TypeScript** 构建，设计遵循 **Material Design 3**。

在线地址：<https://tuning-luna.github.io/>

## 技术栈

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) 8（Rolldown 引擎）
- [TypeScript](https://www.typescriptlang.org/)
- [react-i18next](https://react.i18next.com/) —— 中英双语
- Material Design 3 设计令牌（`src/theme/`），无第三方 UI 组件库
- GitHub Pages + GitHub Actions 自动构建部署

## 本地开发

```bash
npm install
npm run dev       # 本地开发（http://localhost:5173）
npm run lint      # ESLint 检查
npm run typecheck # TypeScript 类型检查
npm run build     # 类型检查 + 生产构建
npm run preview   # 本地预览构建产物
```

## 项目结构

```
src/
├── theme/        # MD3 设计令牌：colors.css（生成）、tokens.css、global.css
├── components/   # 基础组件（Button、Card、Chip、Icon、AppBar……）
├── sections/     # 页面区块（Hero、About、TechStack、Projects、Activity、Contact）
├── data/         # 与 UI 分离的数据（profile、projects、tech）
├── i18n/         # 中英文案（locales/）
└── hooks/        # useTheme（明暗/系统主题）
```

## 主题颜色

颜色令牌由 [@material/material-color-utilities](https://github.com/material-foundation/material-color-utilities)（Google 官方 M3 色彩算法）从种子色生成：

```bash
npm run theme:gen                # 默认种子色 #18F741
SEED_COLOR=#006A6A npm run theme:gen   # 自定义种子色
```

生成的 `src/theme/colors.css` 已提交，运行时无 JS 依赖。

## 内容更新

站内信息为 GitHub 公开数据快照（获取时间见 `src/data/` 中的注释），更新数据时：

1. 修改 `src/data/profile.ts` 中的统计快照
2. 修改 `src/data/projects.ts` 中的项目
3. 同步更新 `src/i18n/locales/zh.ts` 与 `en.ts` 中的描述

## 部署

push 到 `main` 分支后，GitHub Actions 自动执行 `lint → build → deploy` 到 GitHub Pages。
配置见 `.github/workflows/deploy.yml`，遵循 [Vite 官方部署指南](https://vite.dev/guide/static-deploy)。
由于仓库名为 `<username>.github.io`，站点以用户站点部署在根路径，`vite.config.ts` 中 `base: '/'`。
