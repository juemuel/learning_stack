# Learning Stack 目录重构设计方案

## 目标

重组织 learning_stack 仓库的目录结构和文档体系，使其分类清晰、命名统一、易于扩展。

## 当前问题

1. 顶层分类混乱：`learning_web`、`learning_frameworks`、`learning_others`、`demos_project`、`demos_server` 按不同维度划分，同一技术（如 React）散落多处
2. 命名冗余：`learning_`、`demos_` 前缀无区分作用
3. 扩展困难：新增 Python/ML/Bitcoin 等内容没有自然的归属位置
4. 文档不统一：45 个 README 格式各异，部分缺失

## 新目录结构

```
/
├── frontends/              # 前端（框架、组件、图形、构建工具）
│   ├── react/movie-lib-demo/
│   ├── vue/weather-app-demo/
│   ├── flutter/todo-demo/
│   ├── canvas/
│   │   ├── canvas-demo/
│   │   └── space-arcade/
│   ├── threejs/
│   │   ├── threejs-demo/
│   │   └── pic-to-3d/
│   ├── d3/d3-demo/
│   ├── datav/
│   ├── web-components/
│   │   ├── audio-player/
│   │   ├── video-gallery/
│   │   ├── image-demo-1/
│   │   ├── image-demo-2/
│   │   ├── dialog-demo/
│   │   ├── pop-modal-demo/
│   │   └── tool-kits/
│   ├── js-ts/typescript/
│   └── build-tools/
│
├── servers/                # 后端服务
│   ├── node/
│   │   ├── file-server/
│   │   └── web-http-server/
│   ├── python/socket-server/
│   └── java/               # 预留：Spring
│
├── projects/               # 完整项目（前后端一体）
│   ├── chat/
│   │   ├── webrtc-react/
│   │   ├── websocket-chat/
│   │   └── vue-chat-demo/
│   ├── portfolio/react/
│   ├── admin/
│   │   ├── vue-ele-demo/
│   │   └── vue-js-demo/
│   └── editor/codepen-demo/
│
├── mobile/                 # 移动端和浏览器扩展
│   ├── react-native/
│   ├── miniprogram/
│   │   ├── uniapp-unicloud-demo/
│   │   └── wx-native-demo/
│   ├── chrome-extensions/
│   │   ├── clipboard-demo/
│   │   └── getting-started/
│   └── electron/
│
├── data/                   # 数据与算法（新领域）
│   ├── machine-learning/
│   └── bitcoin/
│
├── devops/                 # 运维与工具
│   ├── git/
│   ├── spider/
│   └── infrastructure/
│
└── docs/                   # 统一文档
    ├── README.md
    ├── templates/
    └── specs/
```

### 命名规范

- 全部使用 **kebab-case** 英文命名
- 目录名应直观表达内容类型：`demo` 结尾表示小练习，框架名（`react`/`vue`）表示该技术的学习项目
- 合并文件名中的 `_` 为 `-`（如 `audio_player` → `audio-player`）

### 迁移映射

| 原路径 | 新路径 |
|--------|--------|
| `learning_web/audioDemo/` | `frontends/web-components/audio-player/` |
| `learning_web/videoDemo/` | `frontends/web-components/video-gallery/` |
| `learning_web/imageDemo/imageDemo1.0/` | `frontends/web-components/image-demo-1/` |
| `learning_web/imageDemo/imageDemo2.0/` | `frontends/web-components/image-demo-2/` |
| `learning_web/dialogComp/` | `frontends/web-components/dialog-demo/` |
| `learning_web/popModalComp/` | `frontends/web-components/pop-modal-demo/` |
| `learning_web/toolKitsDemo/` | `frontends/web-components/tool-kits/` |
| `learning_web/js_ts_learning/` | `frontends/js-ts/typescript/` |
| `learning_frameworks/react_learning/movie_lib_react_demo/` | `frontends/react/movie-lib-demo/` |
| `learning_frameworks/vue_learning/weather_app_vue_demo/` | `frontends/vue/weather-app-demo/` |
| `learning_frameworks/flutter_learning/apptest/` | `frontends/flutter/todo-demo/` |
| `learning_others/canvas_learning/` | `frontends/canvas/` |
| `learning_others/threejs_learning/` | `frontends/threejs/` |
| `learning_others/d3_learning/` | `frontends/d3/` |
| `learning_others/datav_learning/` | `frontends/datav/` |
| `learning_build/` | `frontends/build-tools/` |
| `demos_server/node_learning/` | `servers/node/` |
| `demos_server/file_server/file_server_node/` | `servers/node/file-server/` |
| `demos_server/web_http_server/` | `servers/node/web-http-server/` |
| `demos_server/socket_server/socket_server_python/` | `servers/python/socket-server/` |
| `demos_project/chat_web/` | `projects/chat/` |
| `demos_project/port_web/portfolio_react/` | `projects/portfolio/react/` |
| `demos_project/backend_h5/` | `projects/admin/` |
| `demos_project/others/editor_learning/` | `projects/editor/codepen-demo/` |
| `demos_project/chat_web/webrtc_chatapp_react/` | `projects/chat/webrtc-react/` |
| `demos_project/chat_web/websocket_chatapp/` | `projects/chat/websocket-chat/` |
| `demos_project/chat_web/vue_chat_demo_ep/` | `projects/chat/vue-chat-demo/` |
| `learning_frameworks/react_native_learning/` | `mobile/react-native/` |
| `learning_frameworks/miniprogram_learning/` | `mobile/miniprogram/` |
| `learning_frameworks/chrome_extention_learning/` | `mobile/chrome-extensions/` |
| `demos_server/tools/git_learning/` | `devops/git/` |
| `demos_server/tools/spider_learning/` | `devops/spider/` |
| `demos_server/tools/` (其他) | `devops/infrastructure/` |
| `demos_project/chat_h5/webrtc_chatapp_react/` | `projects/chat/webrtc-react/h5/` (H5 版本作为子目录) |
| `demos_project/chat_h5/websocket_chatapp/` | `projects/chat/websocket-chat/h5/` |
| `learning_frameworks/electron_learning/` | `mobile/electron/` |

## 文档体系

### 三层架构

| 层级 | 位置 | 内容 |
|------|------|------|
| 总索引 | `docs/README.md` | 项目概览、目录导航、技术栈总表、快速开始 |
| 领域索引 | 各顶层目录 `README.md` | 子目录列表、学习路线建议、资源链接 |
| 项目卡片 | 各项目 `README.md` | 统一模板：简介、技术栈、运行、演示、知识点 |

### 项目卡片模板

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

### 总索引风格

卡片式布局，按领域分组展示，每个卡片包含子目录链接和一句话介绍。

## 实施范围

### 包含
- 按新结构移动所有目录和文件
- 为所有项目编写统一格式的 README
- 编写 6 个顶层领域的 README
- 编写 `docs/README.md` 总索引
- 创建空模板文件 `docs/templates/project-readme-template.md`
- 为预留目录创建 `.gitkeep` 占位

### 不包含
- 修改项目源码
- 修复项目中的 bug 或依赖问题
- 清理 `node_modules` 等（已 gitignored）

## 约束

- 使用 `git mv` 移动文件，保留 git 历史
- 迁移完成后删除空的旧顶层目录（`learning_web/`、`learning_frameworks/`、`learning_build/`、`learning_others/`、`demos_project/`、`demos_server/`）
- 一次性提交，避免中间状态
- 移动后需确保各项目内的相对路径引用不被破坏
