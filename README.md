# Learning Stack

## 一、learning_web

> 前端基础的学习，使用原生js、html、css实现的常用媒体样式，以及定制化的组件实现。

| 名称             | 类型                             | Github 存档                                                  | 技术点与经验                                                 | Status                                           |
| ---------------- | -------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------ |
| **learning_web** | 原生HTML、CSS、JS，web技术的应用 | 1.imageDemo<br />2.videoDemo<br />3.audioDemo<br />4.toolKitsDemo：web工具集合（下载、上传、QRCode、随机颜色等）<br />5.popModalDemo：原生弹窗（网络、cookies）<br />6.dialogDemo：原生的对话框<br /><br />7.js_ts_learning | 1. **自定义样式库（待整合）**、响应式布局（flex、媒体查询）、CSS动画<br />2. 事件处理：HTML DOM、DOM2、懒加载<br /> | ★★☆<br />[Details](learning_web/README.md)<br /> |
|                  |                                  |                                                              |                                                              |                                                  |

## 二、learning_frameworks

> 前端框架的学习，在不同的框架版本下实现简易的项目。

| 名称                       | 类型             | Github 存档                                                  | 技术点与经验                                                 | Status                                                       |
| -------------------------- | ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| react_learning<br />       | 前端框架         | 1. **movie_lib_react_demo**：一个基于开源电影API的react-web电影库 [Demo](https://comfy-haupia-02c33d.netlify.app/)<br />2. 见衍生Git项目 | 1. SPA：react-router<br />2. Redux<br /><br />3. React生命周期<br />4. React Hooks：useEffect、useState、useCallback、useContext<br />5. React组件（传子组件{{children}}、传参props） | ★★<br />                                                     |
| vue_learning<br />         | 前端框架         | 1. **weather_app_vue_demo**：一个基于天气API的vue-web应用 [Demo](https://6476fc1bd18d7b7578c75d70--cozy-frangipane-de6138.netlify.app/)<br />2.**spa_vue_comp_web**：一个使用 vite、vue-router、svg的 spa  demo项目，将整合不同web组件库的应用。<br /> | 1. SPA：vue-router<br />2. Ref、Reactive<br />Vuex<br />3. Vue生命周期<br />4. Vue Hooks<br />5. Vue语法糖<br />6. Vue组件 | ★★<br />                                                     |
| react_native_learning      | 移动端           | 略                                                           | 1. expo搭建                                                  | ★☆                                                           |
| miniprogram_learning<br /> | 移动端（小程序） | 1. **基于uni实现的留言墙**：图片、文本上传与删除、api请求、导航栏<br /><br />2.原生wx小程序demo<br />3.更多完整项目见**mini_program_all** | 1. 云函数使用、云数据库<br />2. 微信小程序基本路由与tabbar   | ★☆<br />[Details](uniapp_learning/uniapp_unicloud_demo/readme.md) |
| flutter_learning           | 前端框架         |                                                              |                                                              |                                                              |
| chrome_extention           | 插件             | 略                                                           | 1. Chrome 简易插件开发                                       | ★☆                                                           |
| electron_learning          |                  |                                                              |                                                              |                                                              |
|                            |                  |                                                              |                                                              |                                                              |

## 三、**learning_build**：前端优化

> 前端打包工具优化的学习

| 名称                   | 类型 | Github 存档 | 技术点与经验                                                 | Status |
| ---------------------- | ---- | ----------- | ------------------------------------------------------------ | ------ |
| **web_build_learning** | 工具 | 略          | 1. webpack（env：原生）<br />2. vite（env：Vue）<br />3. gulp<br />4. Eslint、Babel（env：Vue） | ★★☆    |

## 四、learning_others

> 前端其他技术的使用

| 名称                            | 类型    | Github 存档                                                  | 技术点与经验                                                 | Status                                       |
| ------------------------------- | ------- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------- |
| canvas_learning                 | 图形    | 1. **canvas_demo**：canvas基本案例，以及一个绘画板App<br />2. **space arcade** ：太空街机游戏 [Demo](https://playful-jelly-e3d85f.netlify.app/) <br /> | 1. canvas工具类、碰撞检测、拖拽；<br />2. 片头动画、资源加载机制、粒子特效、JS的面向对象开发 | ★★<br />[Details](canvas_learning/readme.md) |
| threejs_learning<br />（webGL） | 3D 图形 | 1.**threejs_demo**：包含threejs的基本使用案例<br />2.**picTo3d**：将一张图片转为3d效果 <br />3.threejs_tool：待整理 | 1. 原生环境的three.js 基本使用<br />                         | ★☆                                           |
| d3_learning                     | 图形库  | 1. **d3_demo**，一些使用d3实现的条形图、散点图。             | 1. Exp：原生<br />                                           | ★☆                                           |
| dataV                           | 图形库  | 略                                                           | 1. Exp：Vue2<br />2. 图表可视化                              | ★☆                                           |

## 五、demos_project

| 名称        | 类型    | Github 存档                                                  | 技术点与经验                                                 | Status |
| ----------- | ------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------ |
| backend_web | 后台web |                                                              |                                                              |        |
| backend_h5  | 后台h5  |                                                              |                                                              |        |
| port_web    | 门户Web | 1. **portfolio_react**：一个使用react+tailwind CSS+Google map的portfoli项目 [Demo]([https://joyful-boba-455906.netlify.app](https://joyful-boba-455906.netlify.app/)) |                                                              |        |
| port_h5     | 门户h5  |                                                              |                                                              |        |
| chat_web    | 通讯web | 1. **webrtc_chatapp_react**：一个基于react+node+webrtc的双人视频对话项目<br />2.**websocket_chatapp**：一个基于websocket的双人对话项目 | 1. WebRTC：socket.io➕socket.io-client<br />2. WebSocket：ws  | ★★☆    |
| chat_h5     | 通讯h5  |                                                              |                                                              |        |
| others      | 其他    | 1.**codepen_demo_ori**：一个使用原生的仿codepen项目（fontawesome+）<br /> 2.codepen_clone_react：一个使用react的仿codepen项目<br /> | 1. 原生环境、React环境的静态资源加载与渲染<br />2. codeMirror、Ace使用经验 |        |



## 六、demos_server

| 名称            | 类型       | Github 存档                                                  | 技术点与经验                                                 | Status   |
| --------------- | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------- |
| node_learning   | 服务端环境 | 略                                                           | 1. Web+跨域：Express、http、Cors<br />2. 文件：multer、path、fs<br />3. 通信：socket.io、ws<br /> | ★☆<br /> |
| web_http_server |            |                                                              |                                                              |          |
| file_server     |            | **file_server_node**：一个file upload server                 |                                                              |          |
| socket_server   |            |                                                              |                                                              |          |
| tools           |            | linux_learning<br />docker_learning<br />nginx_learning<br />git_learning | 1. Linux 基本指令<br />2. 脚本语言：shell<br />3. 工具：vim、tmux、docker、ssh等<br />4. docker 镜像迁移、部署<br />5. 项目部署、反向代理<br />6. git push、pull及常见问题<br />7. git actions + gh pages持续部署 |          |
|                 |            |                                                              |                                                              |          |
|                 |            |                                                              |                                                              |          |
|                 |            |                                                              |                                                              |          |
|                 |            |                                                              |                                                              |          |



## 其他实战项目

| 名称     | 类型    | Github 存档                                                  | 技术点与经验                                                 | Status                                                     |
| -------- | ------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------------------- |
| kob      | Git项目 | 1. **kob**：一个基于Vue3+springboot的多人联机游戏项目        | 1. springboot：web开发<br />2. springcloud：security权限、匹配服务、测评服务 | ★★☆<br />[Details](https://github.com/juemuel/Kob-of-Game) |
| 其他经验 | 其他    | 1. **wemeet**：基于融云SDK开发的Android Java项目；<br />2. **bs-end-GA**：基于遗传算法的路径匹配系统<br />3. 数据大屏：一个基于 Vue2+DataV 的数据大屏项目<br />4. 边缘网关项目：一个基于 React+TS+Antd的边缘网关项目 | 1. Android Java开发<br />2. 路径匹配算法<br />3. 数据大屏-Vue-DataV实战<br />4. 物联网SPA-React-Antd实战 | ★☆                                                         |
|          |         |                                                              |                                                              |                                                            |

