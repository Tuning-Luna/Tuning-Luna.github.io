# Tuning-Luna.github.io

Tuning-Luna 的个人主页（Personal homepage），基于 **React + Vite + TypeScript** 构建，设计遵循 **Material Design 3**，并带有 **毛玻璃（Glassmorphism）UI**。

在线地址：<https://tuning-luna.github.io/>

## 特性

- **MD3 设计系统**：完整的设计令牌（颜色 / 排版 / 形状 / 阴影 / 间距 / 动效），无第三方 UI 组件库
- **毛玻璃 UI**：固定模糊背景图 + 半透明玻璃表面（`backdrop-filter: blur + saturate`），主题自适应
- **分栏布局**：右侧固定 Hero 面板（sticky，不随滚动），左侧内容滚动
- **中英双语**：默认 **English**，可手动切换中文（`react-i18next`）
- **明暗主题**：默认 **Dark**，支持 系统 / 浅色 / 深色 三态切换
- **自研音乐播放器**：MD3 极简播放器（Stan · Eminem Dido），含加载 / 失败 / 重试状态
- **动效**：区块滚动渐入、卡片 hover 放大、光标光圈（spotlight）、Hero 入场动画（均尊重 `prefers-reduced-motion`）

## 技术栈

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) 8（Rolldown 引擎）
- [TypeScript](https://www.typescriptlang.org/)
- [react-i18next](https://react.i18next.com/) —— 中英双语
- [@material/material-color-utilities](https://github.com/material-foundation/material-color-utilities)（仅开发期生成色彩令牌）
- GitHub Pages + GitHub Actions 自动构建部署

## 本地开发

```bash
npm install
npm run dev        # 本地开发（http://localhost:5173）
npm run lint       # ESLint 检查
npm run typecheck  # TypeScript 类型检查
npm run build      # 类型检查 + 生产构建
npm run preview    # 本地预览构建产物
```

## 项目结构

```
src/
├── theme/          # MD3 设计令牌：colors.css（生成）、tokens.css、global.css
├── components/     # 基础组件（Button、Card、Chip、Icon、AppBar、MiniPlayer……）
├── sections/       # 页面区块（Hero、About、TechStack、Projects、Activity、NowPlaying、Contact）
├── data/           # 与 UI 分离的数据（profile、projects、tech）
├── i18n/           # 中英文案（locales/）
├── hooks/          # useTheme（明暗主题）、useSpotlight（光标光圈）
└── assets/         # 背景图、音乐封面与音频文件
```

## 设计系统

### 颜色与主题

颜色令牌由 `@material/material-color-utilities`（Google 官方 M3 色彩算法）从种子色生成：

```bash
npm run theme:gen                    # 默认种子色 #18F741
SEED_COLOR=#006A6A npm run theme:gen # 自定义种子色
```

生成的 `src/theme/colors.css` 已提交，运行时无 JS 依赖。

**默认主题为深色、默认语言为英文**（不随浏览器 / 系统设置），用户可手动切换并持久化到 `localStorage`。`index.html` 内置内联脚本在首帧前应用偏好，避免闪烁。

### 毛玻璃

玻璃令牌定义在 `src/theme/tokens.css`：

```css
--md-glass-blur: 20px;         /* 模糊强度 */
--md-glass-saturate: 150%;     /* 饱和度提升 */
--md-glass-opacity-light: 0.6; /* 浅色透明度 */
--md-glass-opacity-dark: 0.6;  /* 深色透明度 */
```

玻璃表面 = MD3 表面色 × 透明度（`color-mix`）+ `backdrop-filter` + 低透明度 MD3 边框 + 顶部高光，应用于 AppBar、Hero 面板、卡片、播放器、统计面板、联系卡片、Footer。

### 音乐播放器

自研 MD3 播放器（`src/components/MiniPlayer.tsx`）：封面 + 歌名/歌手 + 播放键。

- `preload="metadata"`：访问页面时轻量获取音频头部，尽早暴露加载失败
- 加载失败显示错误态（可点击重试）；缓冲中显示旋转指示器（250ms 防抖，快速启动不闪）
- 音频文件 6.7MB，仅在用户点击播放时下载

## 内容更新

站内信息为 GitHub 公开数据快照（获取时间见 `src/data/` 中的注释），更新数据时：

1. 修改 `src/data/profile.ts` 中的统计快照与链接
2. 修改 `src/data/projects.ts` 中的项目
3. 同步更新 `src/i18n/locales/zh.ts` 与 `en.ts` 中的描述

## 部署

push 到 `main` 分支后，GitHub Actions 自动执行 `lint → build → deploy` 到 GitHub Pages。
配置见 `.github/workflows/deploy.yml`，遵循 [Vite 官方部署指南](https://vite.dev/guide/static-deploy)。
由于仓库名为 `<username>.github.io`，站点以用户站点部署在根路径，`vite.config.ts` 中 `base: '/'`。
