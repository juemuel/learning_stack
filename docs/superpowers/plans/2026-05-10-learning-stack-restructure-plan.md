# Learning Stack 目录重构实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 learning_stack 仓库从混乱的 `learning_*`/`demos_*` 结构重组为按技术领域分类的清晰结构 (frontends/servers/projects/mobile/data/devops/docs)，同时重写全部 README 为统一格式。

**Architecture:** 分三个阶段——先创建新目录骨架，再用 git mv 迁移所有项目，最后为每个项目编写统一格式的 README 文档。所有操作一次提交完成，保留 git 历史。

**Tech Stack:** Bash (git mv), Markdown

---

### Task 1: 创建新目录骨架

**Files:**
- Create: `frontends/`, `servers/`, `projects/`, `mobile/`, `data/`, `devops/` (所有子目录)
- Create: `docs/templates/`

- [ ] **Step 1: 创建所有新目录**

```bash
mkdir -p \
  frontends/react/movie-lib-demo \
  frontends/vue/weather-app-demo \
  frontends/flutter/todo-demo \
  frontends/canvas/canvas-demo \
  frontends/canvas/space-arcade \
  frontends/threejs/threejs-demo \
  frontends/threejs/pic-to-3d \
  frontends/d3/d3-demo \
  frontends/datav \
  frontends/web-components/audio-player \
  frontends/web-components/video-gallery \
  frontends/web-components/image-demo-1 \
  frontends/web-components/image-demo-2 \
  frontends/web-components/dialog-demo \
  frontends/web-components/pop-modal-demo \
  frontends/web-components/tool-kits \
  frontends/js-ts/typescript \
  frontends/build-tools \
  servers/node/file-server \
  servers/node/web-http-server \
  servers/python/socket-server \
  servers/java \
  projects/chat/webrtc-react/h5 \
  projects/chat/websocket-chat/h5 \
  projects/chat/vue-chat-demo \
  projects/portfolio/react \
  projects/admin/vue-ele-demo \
  projects/admin/vue-js-demo \
  projects/editor/codepen-demo \
  mobile/react-native \
  mobile/miniprogram/uniapp-unicloud-demo \
  mobile/miniprogram/wx-native-demo \
  mobile/chrome-extensions/clipboard-demo \
  mobile/chrome-extensions/getting-started \
  mobile/electron \
  data/machine-learning \
  data/bitcoin \
  devops/git \
  devops/spider \
  devops/infrastructure \
  docs/templates
```

- [ ] **Step 2: 为预留空目录创建 .gitkeep**

```bash
touch servers/java/.gitkeep
touch data/machine-learning/.gitkeep
touch data/bitcoin/.gitkeep
touch mobile/electron/.gitkeep
```

- [ ] **Step 3: 提交骨架**

```bash
git add -A
git commit -m "chore: create new directory skeleton for restructure

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 2: 迁移 frontends 目录

- [ ] **Step 1: 迁移 web-components（原 learning_web）**

```bash
# 注意：先清理由 mkdir -p 创建的空目标目录，避免 git mv 冲突
rmdir frontends/web-components/audio-player
rmdir frontends/web-components/video-gallery
rmdir frontends/web-components/image-demo-1
rmdir frontends/web-components/image-demo-2
rmdir frontends/web-components/dialog-demo
rmdir frontends/web-components/pop-modal-demo
rmdir frontends/web-components/tool-kits

# audioDemo/audioPlayer → web-components/audio-player
git mv learning_web/audioDemo/audioPlayer frontends/web-components/audio-player
# videoDemo/videoGallery → web-components/video-gallery
git mv learning_web/videoDemo/videoGallery frontends/web-components/video-gallery
# imageDemo/imageDemo1.0 → web-components/image-demo-1
git mv learning_web/imageDemo/imageDemo1.0 frontends/web-components/image-demo-1
# imageDemo/imageDemo2.0 → web-components/image-demo-2
git mv learning_web/imageDemo/imageDemo2.0 frontends/web-components/image-demo-2
# dialogComp → web-components/dialog-demo
git mv learning_web/dialogComp frontends/web-components/dialog-demo
# popModalComp → web-components/pop-modal-demo
git mv learning_web/popModalComp frontends/web-components/pop-modal-demo
# toolKitsDemo → web-components/tool-kits
git mv learning_web/toolKitsDemo frontends/web-components/tool-kits
```

- [ ] **Step 2: 迁移 js-ts 和框架**

```bash
rmdir frontends/js-ts/typescript
rmdir frontends/react/movie-lib-demo
rmdir frontends/vue/weather-app-demo
rmdir frontends/flutter/todo-demo

git mv learning_web/js_ts_learning/typescript frontends/js-ts/typescript
git mv learning_frameworks/react_learning/movie_lib_react_demo frontends/react/movie-lib-demo
git mv learning_frameworks/vue_learning/weather_app_vue_demo frontends/vue/weather-app-demo
git mv learning_frameworks/flutter_learning/apptest frontends/flutter/todo-demo
```

- [ ] **Step 3: 迁移图形和构建工具**

```bash
# canvas: 先移除空目录，再移动内容
rm -rf frontends/canvas/canvas-demo
git mv learning_others/canvas_learning/01_canvas_demo frontends/canvas/canvas-demo

# space-arcade 源码不在本仓库，保留为空占位目录（有外部 Demo 链接）

# threejs
rm -rf frontends/threejs/threejs-demo
rm -rf frontends/threejs/pic-to-3d
git mv learning_others/threejs_learning/threejs_demo frontends/threejs/threejs-demo
git mv learning_others/threejs_learning/picTo3D frontends/threejs/pic-to-3d

# d3
rm -rf frontends/d3/d3-demo
git mv learning_others/d3_learning/d3_demo frontends/d3/d3-demo

# datav
rmdir frontends/datav
git mv learning_others/datav_learning frontends/datav

# build-tools
rmdir frontends/build-tools
git mv learning_build frontends/build-tools
```

---

### Task 3: 迁移 servers 目录

- [ ] **Step 1: 迁移 node 和 python 服务**

```bash
rmdir servers/node/file-server
rmdir servers/node/web-http-server
rmdir servers/node
rmdir servers/python/socket-server

git mv demos_server/node_learning servers/node
git mv demos_server/file_server/file_server_node servers/node/file-server
git mv demos_server/web_http_server servers/node/web-http-server
git mv demos_server/socket_server/socket_server_python servers/python/socket-server
```

---

### Task 4: 迁移 projects 目录

- [ ] **Step 1: 迁移完整项目**

```bash
rm -rf projects/chat/webrtc-react/h5
rm -rf projects/chat/websocket-chat/h5
rmdir projects/chat/vue-chat-demo
rmdir projects/portfolio/react
rmdir projects/admin/vue-ele-demo
rmdir projects/admin/vue-js-demo
rmdir projects/editor/codepen-demo

git mv demos_project/chat_web/webrtc_chatapp_react projects/chat/webrtc-react
git mv demos_project/chat_web/websocket_chatapp projects/chat/websocket-chat
git mv demos_project/chat_web/vue_chat_demo_ep projects/chat/vue-chat-demo
git mv demos_project/port_web/portfolio_react projects/portfolio/react
git mv demos_project/backend_h5/vue_web_demo_ele projects/admin/vue-ele-demo
git mv demos_project/backend_h5/vue_web_demo_js projects/admin/vue-js-demo
git mv demos_project/others/editor_learning/codepen_demo_ori projects/editor/codepen-demo

# H5 版本作为子目录
git mv demos_project/chat_h5/webrtc_chatapp_react projects/chat/webrtc-react/h5
git mv demos_project/chat_h5/websocket_chatapp projects/chat/websocket-chat/h5
```

---

### Task 5: 迁移 mobile 目录

- [ ] **Step 1: 迁移移动端和扩展**

```bash
rmdir mobile/react-native
rm -rf mobile/miniprogram/uniapp-unicloud-demo
rm -rf mobile/miniprogram/wx-native-demo
rm -rf mobile/chrome-extensions/clipboard-demo
rm -rf mobile/chrome-extensions/getting-started

git mv learning_frameworks/react_native_learning mobile/react-native
git mv learning_frameworks/miniprogram_learning/uniapp_unicloud_demo mobile/miniprogram/uniapp-unicloud-demo
git mv learning_frameworks/miniprogram_learning/mini_wx_demo mobile/miniprogram/wx-native-demo
git mv learning_frameworks/chrome_extention_learning/clipboard-demo mobile/chrome-extensions/clipboard-demo
git mv learning_frameworks/chrome_extention_learning/getting-started mobile/chrome-extensions/getting-started
```

---

### Task 6: 迁移 devops 目录

- [ ] **Step 1: 迁移运维工具**

```bash
rmdir devops/git
rmdir devops/spider
rmdir devops/infrastructure

git mv demos_server/tools/git_learning devops/git
git mv demos_server/tools/spider_learning devops/spider
```

- [ ] **Step 2: 处理 tools 剩余内容 (linux/docker/nginx 等)**

```bash
# 如果 tools 下还有其他文件/目录，移到 infrastructure
for item in demos_server/tools/*; do
  if [ -e "$item" ]; then
    git mv "$item" devops/infrastructure/
  fi
done
```

---

### Task 7: 清理旧空目录并创建 .gitkeep

- [ ] **Step 1: 删除旧的空顶层目录**

```bash
# 清理迁移后变空的旧目录
rmdir learning_web/audioDemo 2>/dev/null
rmdir learning_web/imageDemo 2>/dev/null
rmdir learning_web/videoDemo 2>/dev/null
rmdir learning_web/js_ts_learning 2>/dev/null
rmdir learning_web 2>/dev/null || rm -rf learning_web

rmdir learning_frameworks/react_learning 2>/dev/null
rmdir learning_frameworks/vue_learning 2>/dev/null
rmdir learning_frameworks/flutter_learning 2>/dev/null
rmdir learning_frameworks/miniprogram_learning 2>/dev/null
rmdir learning_frameworks/chrome_extention_learning 2>/dev/null
rmdir learning_frameworks/react_native_learning 2>/dev/null
rmdir learning_frameworks/electron_learning 2>/dev/null
rmdir learning_frameworks 2>/dev/null || rm -rf learning_frameworks

rmdir learning_others/canvas_learning 2>/dev/null
rmdir learning_others/threejs_learning 2>/dev/null
rmdir learning_others/d3_learning 2>/dev/null
rmdir learning_others 2>/dev/null || rm -rf learning_others

rm -rf learning_build  # 已完整迁移

rmdir demos_project/chat_web 2>/dev/null
rmdir demos_project/chat_h5 2>/dev/null
rmdir demos_project/backend_h5 2>/dev/null
rmdir demos_project/port_web 2>/dev/null
rmdir demos_project/others 2>/dev/null
rmdir demos_project 2>/dev/null || rm -rf demos_project

rmdir demos_server/node_learning 2>/dev/null
rmdir demos_server/file_server 2>/dev/null
rmdir demos_server/socket_server 2>/dev/null
rmdir demos_server/web_http_server 2>/dev/null
rmdir demos_server/tools 2>/dev/null
rmdir demos_server 2>/dev/null || rm -rf demos_server
```

- [ ] **Step 2: 为无源码占位目录添加 .gitkeep**

```bash
touch mobile/electron/.gitkeep
touch frontends/canvas/space-arcade/.gitkeep
```

---

### Task 8: 编写 docs/README.md 总索引

**Files:**
- Create: `docs/README.md`

- [ ] **Step 1: 编写总索引**

编写 `docs/README.md`：

```markdown
# Learning Stack

全栈技术学习仓库，按技术领域组织，覆盖前端、后端、移动端、数据科学和 DevOps。

## 目录

| 领域 | 说明 |
|------|------|
| [frontends/](../frontends/) | 前端：框架、组件、图形、构建工具 |
| [servers/](../servers/) | 后端：Node.js、Python、Java |
| [projects/](../projects/) | 完整项目：前后端一体应用 |
| [mobile/](../mobile/) | 移动端：小程序、React Native、Chrome 扩展、Electron |
| [data/](../data/) | 数据与算法：机器学习、区块链 |
| [devops/](../devops/) | 运维与工具：Git、爬虫、基础设施 |
| [docs/](./) | 文档：索引、模板、设计规范 |

## 快速开始

每个项目目录下都有独立的 README，包含技术栈、运行方式和知识点说明。

## 文档模板

新建学习项目时，参考 [项目 README 模板](templates/project-readme-template.md)。
```

---

### Task 9: 编写 6 个领域索引 README

**Files:**
- Create: `frontends/README.md`, `servers/README.md`, `projects/README.md`, `mobile/README.md`, `data/README.md`, `devops/README.md`

- [ ] **Step 1: 编写 frontends/README.md**

```markdown
# Frontends

前端技术学习，包含框架、原生组件、图形可视化和构建工具。

## 目录

### 框架

| 项目 | 说明 |
|------|------|
| [react/movie-lib-demo/](react/movie-lib-demo/) | React 电影库 — React Router、Redux、Hooks |
| [vue/weather-app-demo/](vue/weather-app-demo/) | Vue 天气应用 — Vue Router、Vuex |
| [flutter/todo-demo/](flutter/todo-demo/) | Flutter 待办事项 |

### 图形与可视化

| 项目 | 说明 |
|------|------|
| [canvas/canvas-demo/](canvas/canvas-demo/) | Canvas 基础案例与绘画板 |
| [canvas/space-arcade/](canvas/space-arcade/) | Canvas 太空街机游戏 — 粒子特效、碰撞检测 |
| [threejs/threejs-demo/](threejs/threejs-demo/) | Three.js 基础案例 |
| [threejs/pic-to-3d/](threejs/pic-to-3d/) | 图片转 3D 效果 |
| [d3/d3-demo/](d3/d3-demo/) | D3.js 条形图、散点图 |
| [datav/](datav/) | DataV 图表可视化 (Vue2) |

### 原生组件

| 项目 | 说明 |
|------|------|
| [web-components/audio-player/](web-components/audio-player/) | 音频播放器 |
| [web-components/video-gallery/](web-components/video-gallery/) | 视频画廊 |
| [web-components/image-demo-1/](web-components/image-demo-1/) | 图片 Demo 1.0 |
| [web-components/image-demo-2/](web-components/image-demo-2/) | 图片 Demo 2.0 |
| [web-components/dialog-demo/](web-components/dialog-demo/) | 原生对话框组件 |
| [web-components/pop-modal-demo/](web-components/pop-modal-demo/) | 原生弹窗组件 |
| [web-components/tool-kits/](web-components/tool-kits/) | Web 工具集 (下载/上传/QRCode) |

### 语言与工具

| 项目 | 说明 |
|------|------|
| [js-ts/typescript/](js-ts/typescript/) | TypeScript 学习 |
| [build-tools/](build-tools/) | Webpack、Vite、Gulp、ESLint、Babel |
```

- [ ] **Step 2: 编写 servers/README.md**

```markdown
# Servers

后端服务学习。

## 目录

### Node.js

| 项目 | 说明 |
|------|------|
| [node/](node/) | Node.js 基础 — Express、HTTP、CORS、WebSocket |
| [node/file-server/](node/file-server/) | 文件上传服务 |
| [node/web-http-server/](node/web-http-server/) | HTTP 服务器 |

### Python

| 项目 | 说明 |
|------|------|
| [python/socket-server/](python/socket-server/) | Socket 服务 |

### Java

| 项目 | 说明 |
|------|------|
| [java/](java/) | 预留：Spring Boot |
```

- [ ] **Step 3: 编写 projects/README.md**

```markdown
# Projects

完整项目（前后端一体）。

## 目录

### 通讯

| 项目 | 说明 |
|------|------|
| [chat/webrtc-react/](chat/webrtc-react/) | WebRTC 视频通话 (React + Node.js) |
| [chat/websocket-chat/](chat/websocket-chat/) | WebSocket 聊天应用 |
| [chat/vue-chat-demo/](chat/vue-chat-demo/) | Vue 聊天 Demo |

### 门户与后台

| 项目 | 说明 |
|------|------|
| [portfolio/react/](portfolio/react/) | 个人门户 (React + Tailwind CSS + Google Maps) |
| [admin/vue-ele-demo/](admin/vue-ele-demo/) | 后台管理 (Vue + Element UI) |
| [admin/vue-js-demo/](admin/vue-js-demo/) | 后台管理 (Vue + JS) |

### 工具

| 项目 | 说明 |
|------|------|
| [editor/codepen-demo/](editor/codepen-demo/) | 在线代码编辑器 |
```

- [ ] **Step 4: 编写 mobile/README.md**

```markdown
# Mobile

移动端和跨平台应用。

## 目录

| 项目 | 说明 |
|------|------|
| [miniprogram/uniapp-unicloud-demo/](miniprogram/uniapp-unicloud-demo/) | UniApp 留言墙 — 云函数、云数据库 |
| [miniprogram/wx-native-demo/](miniprogram/wx-native-demo/) | 微信小程序原生 Demo |
| [react-native/](react-native/) | React Native (Expo) |
| [chrome-extensions/clipboard-demo/](chrome-extensions/clipboard-demo/) | Chrome 剪贴板插件 |
| [chrome-extensions/getting-started/](chrome-extensions/getting-started/) | Chrome 插件入门 |
| [electron/](electron/) | Electron (预留) |
```

- [ ] **Step 5: 编写 data/README.md**

```markdown
# Data

数据科学与算法。

## 目录

| 项目 | 说明 |
|------|------|
| [machine-learning/](machine-learning/) | 机器学习 (预留) |
| [bitcoin/](bitcoin/) | 比特币与区块链 (预留) |
```

- [ ] **Step 6: 编写 devops/README.md**

```markdown
# DevOps

运维与开发工具。

## 目录

| 项目 | 说明 |
|------|------|
| [git/](git/) | Git 学习 |
| [spider/](spider/) | 爬虫学习 |
| [infrastructure/](infrastructure/) | Linux、Docker、Nginx 等基础设施 |
```

---

### Task 10: 重写项目 README — frontends

**Files:**
- Overwrite: 所有 `frontends/` 下项目的 README.md

- [ ] **Step 1: 编写 frontends/react/movie-lib-demo/README.md**

```markdown
# Movie Library (React)

基于 OMDb API 的 React 电影库 SPA。

## 技术栈
- 前端: React, React Router, Redux
- API: OMDb

## 运行
```bash
npm install
npm start
```

## 演示
[Live Demo](https://comfy-haupia-02c33d.netlify.app/)

## 知识点
- React Router SPA 路由
- Redux 状态管理
- React 生命周期与 Hooks (useEffect, useState, useCallback, useContext)
- 组件通信 (props, children)
```

- [ ] **Step 2: 编写 frontends/vue/weather-app-demo/README.md**

```markdown
# Weather App (Vue)

基于天气 API 的 Vue 天气应用。

## 技术栈
- 前端: Vue, Vue Router, Vuex

## 运行
```bash
npm install
npm run dev
```

## 演示
[Live Demo](https://6476fc1bd18d7b7578c75d70--cozy-frangipane-de6138.netlify.app/)

## 知识点
- Vue Router SPA 路由
- Vuex 状态管理
- Vue 生命周期与 Hooks
- Vue 组件通信
```

- [ ] **Step 3: 编写 frontends/flutter/todo-demo/README.md**

```markdown
# Flutter Todo Demo

Flutter 待办事项入门 Demo。

## 技术栈
- 框架: Flutter (Dart)

## 运行
```bash
flutter run
```

## 知识点
- Flutter Widget 基础
- Dart 语言基础
```

- [ ] **Step 4: 编写 frontends/canvas 相关 README**

`frontends/canvas/canvas-demo/README.md`:
```markdown
# Canvas Demo

Canvas 基础案例与绘画板。

## 技术栈
- Canvas API

## 知识点
- Canvas 绘制基础
- 拖拽交互
```

`frontends/canvas/space-arcade/README.md` (如果 space-arcade 存在):
```markdown
# Space Arcade

Canvas 太空街机游戏。

## 技术栈
- Canvas API

## 演示
[Live Demo](https://playful-jelly-e3d85f.netlify.app/)

## 知识点
- 片头动画
- 资源加载机制
- 粒子特效
- 碰撞检测
- JS 面向对象开发
```

- [ ] **Step 5: 编写 frontends/threejs 相关 README**

`frontends/threejs/threejs-demo/README.md`:
```markdown
# Three.js Demo

Three.js 基础使用案例。

## 技术栈
- Three.js

## 知识点
- Three.js 场景、相机、渲染器
```

`frontends/threejs/pic-to-3d/README.md`:
```markdown
# Picture to 3D

将 2D 图片转为 3D 效果。

## 技术栈
- Three.js

## 知识点
- 图片纹理映射
- 3D 几何体变换
```

- [ ] **Step 6: 编写 frontends/d3/d3-demo/README.md**

```markdown
# D3 Demo

D3.js 数据可视化案例。

## 技术栈
- D3.js

## 知识点
- 条形图
- 散点图
- 数据绑定
```

- [ ] **Step 7: 编写 frontends/web-components 各项目 README**

注：这些项目 README 各自独立，按模板格式编写：

`frontends/web-components/audio-player/README.md`:
```markdown
# Audio Player

自定义音频播放器组件。

## 技术栈
- HTML, CSS, JavaScript

## 知识点
- HTML5 Audio API
- 自定义播放控件
```

`frontends/web-components/video-gallery/README.md`:
```markdown
# Video Gallery

视频画廊展示。

## 技术栈
- HTML, CSS, JavaScript

## 知识点
- HTML5 Video API
- 响应式布局
```

`frontends/web-components/image-demo-1/README.md`:
```markdown
# Image Demo 1.0

图片处理演示。

## 技术栈
- HTML, CSS, JavaScript

## 知识点
- 图片懒加载
- 响应式图片
```

`frontends/web-components/image-demo-2/README.md`:
```markdown
# Image Demo 2.0

图片处理演示（升级版）。

## 技术栈
- HTML, CSS, JavaScript
```

`frontends/web-components/dialog-demo/README.md`:
```markdown
# Dialog Component

原生对话框组件。

## 技术栈
- HTML, CSS, JavaScript

## 知识点
- DOM 操作
- 事件处理
```

`frontends/web-components/pop-modal-demo/README.md`:
```markdown
# Pop Modal Component

原生弹窗组件（网络状态、Cookies 等）。

## 技术栈
- HTML, CSS, JavaScript

## 知识点
- 模态框设计模式
- 浏览器 API
```

`frontends/web-components/tool-kits/README.md`:
```markdown
# Tool Kits

Web 工具集合：下载、上传、QRCode 生成、随机颜色等。

## 技术栈
- HTML, CSS, JavaScript
- Node.js (服务端部分)

## 知识点
- File API
- Canvas 生成 QRCode
```

- [ ] **Step 8: 编写 frontends/js-ts/typescript/README.md**

```markdown
# TypeScript Learning

TypeScript 语言学习。

## 技术栈
- TypeScript

## 知识点
- 类型系统
- 泛型
- 接口与类型别名
```

- [ ] **Step 9: 编写 frontends/build-tools/README.md**

```markdown
# Build Tools

前端构建工具学习。

## 技术栈
- Webpack, Vite, Gulp, ESLint, Babel

## 知识点
- Webpack 配置与优化
- Vite 快速构建
- Gulp 任务自动化
- ESLint 代码规范
- Babel 转译
```

---

### Task 11: 重写项目 README — servers

- [ ] **Step 1: 编写 servers/node/README.md** (原 demos_server/node_learning)

```markdown
# Node.js Learning

Node.js 服务端基础学习。

## 技术栈
- Node.js, Express

## 知识点
- HTTP 模块
- Express 路由与中间件
- CORS 跨域
- multer 文件上传
- socket.io WebSocket 通信
```

- [ ] **Step 2: 编写 servers/node/file-server/README.md**

```markdown
# File Server (Node.js)

文件上传服务。

## 技术栈
- Node.js, Express, multer

## 运行
```bash
npm install
node index.js
```

## 知识点
- multer 文件处理
- path/fs 路径操作
```

- [ ] **Step 3: 编写 servers/node/web-http-server/README.md**

```markdown
# Web HTTP Server

基础 HTTP 服务器。

## 技术栈
- Node.js, http 模块
```

- [ ] **Step 4: 编写 servers/python/socket-server/README.md**

```markdown
# Socket Server (Python)

Python Socket 服务。

## 技术栈
- Python, socket

## 知识点
- TCP/UDP Socket 编程
```

---

### Task 12: 重写项目 README — projects

- [ ] **Step 1: 编写 projects/chat/webrtc-react/README.md**

```markdown
# WebRTC Chat App (React)

基于 WebRTC 的双人视频对话应用。

## 技术栈
- 前端: React
- 后端: Node.js
- 通信: WebRTC, socket.io, socket.io-client

## 运行
```bash
# 前端
npm install && npm start
# 服务端
cd server && node index.js
```

## 知识点
- WebRTC 音视频通信
- socket.io 信令服务
```

- [ ] **Step 2: 编写 projects/chat/websocket-chat/README.md**

```markdown
# WebSocket Chat App

基于 WebSocket 的双人聊天应用。

## 技术栈
- 前端: HTML/CSS/JS
- 后端: Node.js
- 通信: ws

## 运行
```bash
npm install
node server.js
```

## 知识点
- WebSocket 协议
- ws 库使用
```

- [ ] **Step 3: 编写 projects/chat/vue-chat-demo/README.md**

```markdown
# Vue Chat Demo

Vue 聊天应用 Demo。

## 技术栈
- 前端: Vue, Element Plus

## 知识点
- Vue 组件开发
- Element Plus UI 库
```

- [ ] **Step 4: 编写 projects/portfolio/react/README.md**

```markdown
# Portfolio (React)

个人门户网站。

## 技术栈
- React, Tailwind CSS, Google Maps API

## 演示
[Live Demo](https://joyful-boba-455906.netlify.app/)

## 知识点
- Tailwind CSS 响应式布局
- Google Maps 集成
- React 组件化
```

- [ ] **Step 5: 编写 projects/admin/vue-ele-demo/README.md**

```markdown
# Admin Dashboard (Vue + Element UI)

后台管理系统。

## 技术栈
- Vue, Element UI

## 知识点
- Element UI 组件使用
- 后台管理布局
```

- [ ] **Step 6: 编写 projects/admin/vue-js-demo/README.md**

```markdown
# Admin Dashboard (Vue + JS)

后台管理系统。

## 技术栈
- Vue, JavaScript

## 知识点
- Vue 项目结构
- 后台管理布局
```

- [ ] **Step 7: 编写 projects/editor/codepen-demo/README.md**

```markdown
# CodePen Clone

仿 CodePen 在线代码编辑器。

## 技术栈
- CodeMirror / Ace Editor

## 知识点
- 代码编辑器集成
- 静态资源加载与渲染
```

---

### Task 13: 重写项目 README — mobile 和 devops

- [ ] **Step 1: 编写 mobile/miniprogram/uniapp-unicloud-demo/README.md**

```markdown
# UniApp 留言墙

基于 UniApp + UniCloud 的留言墙应用。

## 技术栈
- UniApp, UniCloud

## 功能
- 图片/文本上传与删除
- API 请求
- 底部导航栏

## 知识点
- 云函数使用
- 云数据库操作
- 小程序路由与 TabBar
```

- [ ] **Step 2: 编写 mobile/miniprogram/wx-native-demo/README.md**

```markdown
# 微信小程序原生 Demo

微信小程序入门 Demo。

## 技术栈
- 微信小程序原生框架

## 知识点
- 小程序页面生命周期
- WXML/WXSS 语法
```

- [ ] **Step 3: 编写 mobile/react-native/README.md**

```markdown
# React Native Learning

React Native 移动端开发。

## 技术栈
- React Native, Expo

## 知识点
- Expo 环境搭建
- React Native 组件
```

- [ ] **Step 4: 编写 mobile/chrome-extensions/clipboard-demo/README.md**

```markdown
# Clipboard Extension

Chrome 剪贴板插件。

## 技术栈
- Chrome Extension API

## 知识点
- Chrome 插件开发基础
```

- [ ] **Step 5: 编写 mobile/chrome-extensions/getting-started/README.md**

```markdown
# Chrome Extension Getting Started

Chrome 插件入门示例。

## 技术栈
- Chrome Extension API

## 知识点
- manifest.json 配置
- Content Script 与 Background Script
```

- [ ] **Step 6: 编写 devops/git/README.md**

```markdown
# Git Learning

Git 版本控制学习。

## 知识点
- 基本操作 (push, pull, commit, branch)
- Git Actions + GitHub Pages 持续部署
```

- [ ] **Step 7: 编写 devops/spider/README.md**

```markdown
# Spider Learning

爬虫学习。

## 知识点
- HTTP 请求与解析
- 数据提取
```

- [ ] **Step 8: 编写 devops/infrastructure/README.md**

```markdown
# Infrastructure

基础设施与运维工具。

## 知识点
- Linux 基本指令
- Shell 脚本
- Vim, tmux
- Docker 镜像迁移与部署
- Nginx 反向代理
- SSH 远程连接
- 项目部署
```

---

### Task 14: 创建文档模板并清理

- [ ] **Step 1: 创建 docs/templates/project-readme-template.md**

```markdown
# 项目名称

一句话描述。

## 技术栈
- 前端: ...
- 后端: ...

## 运行
\`\`\`bash
\`\`\`

## 演示
[Live Demo](url)

## 知识点
- ...
```

- [ ] **Step 2: 清理旧的根 README.md 并建立指向**

```bash
# 删除旧根 README
git rm README.md

# docs/README.md 作为新的入口
```

- [ ] **Step 3: 最终提交**

```bash
git add -A
git status
git commit -m "refactor: restructure directory layout and rewrite documentation

- Reorganize from learning_*/demos_* into domain-based structure
- New top-level: frontends, servers, projects, mobile, data, devops, docs
- Use kebab-case naming throughout
- Rewrite all READMEs with unified project card format
- Add documentation template
- Reserve directories for future content (java, ml, bitcoin)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```
