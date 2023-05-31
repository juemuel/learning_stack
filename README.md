# Learning Stack

> 加粗内容已存于Git仓库。

## 前端技术与练手项目

| 名称                                        | 类型              | Github 存档                                                  | 技术点与经验                                                 | Status                                                       |
| ------------------------------------------- | ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| web_common_learning                         | 原生HTML、CSS、JS | 1.**imageDemo**：响应式的图片画廊<br />2.**toolKitsDemo**：web工具集合（下载、上传、QRCode、随机颜色等）<br />3.**VideoDemo**：响应式的视频画廊<br />4.TODO：PopDemo：一些原生弹窗案例（网络、cookies） | 1. **自定义样式库（待整合）**、响应式布局（flex、媒体查询）、CSS动画<br />2. 事件处理：HTML DOM、DOM2、懒加载<br /> | ★★☆<br />[Details](web_common_learning/README.md)<br />      |
| react_learning<br />（React框架）           | 前端框架          | 1. **movie_lib_react_demo**：一个基于开源电影API的react-web电影库 [Demo](https://comfy-haupia-02c33d.netlify.app/)<br />2. 关联Git项目 | 1. SPA：react-router<br />2. Redux<br /><br />3. React生命周期<br />4. React Hooks：useEffect、useState、useCallback、useContext<br />5. React组件（传子组件{{children}}、传参props） | ★★<br />                                                     |
| vue_learning<br />（Vue框架）               | 前端框架          | 1. **weather_app_vue_demo**：一个基于天气API的vue-web应用 [Demo](https://6476fc1bd18d7b7578c75d70--cozy-frangipane-de6138.netlify.app/)<br />2. 关联Git项目 | 1. SPA：vue-router<br />2. Ref、Reactive<br />Vuex<br />3. Vue生命周期<br />4. Vue Hooks<br />5. Vue语法糖<br />6. Vue组件 | ★★<br />                                                     |
| react_native_learning                       | 移动端            | TODO：待完善                                                 | 1. expo搭建                                                  | ★☆                                                           |
| uni_cloud_learning<br />                    | 移动端（小程序）  | 1. **留言墙**：图片、文本上传与删除、api请求、导航栏<br />   | 1. 云函数使用、云数据库<br />2. 微信小程序基本路由与tabbar   | ★☆<br />[Details](uniapp_learning/uniapp_unicloud_demo/readme.md) |
| Element Plus                                | 组件库            | TODO：不同环境下的组件库，如e-vue2、e-vue3                   |                                                              | ★☆                                                           |
| Antd                                        | 组件库            | 略                                                           | 1. Antd for react：组件使用与二次开发<br />                  | ★☆                                                           |
| Material                                    | 组件库            | 略                                                           | 1. Material for react：组件使用与二次开发                    | ★☆                                                           |
| d3_learning                                 | 图形库            | 略                                                           | 1. 图表可视化：条形图、散点图➕结合svg使用                    | ★☆                                                           |
| dataV                                       | 图形库            | 略                                                           | 1. 图表可视化                                                | ★☆                                                           |
| canvas_learning                             | 图形              | 1. **canvas_demo**：包含canvas的基本使用案例，以及一个绘画板App<br />2. **space arcade** 太空街机游戏 [Demo]([https://comfy-haupia-02c33d.netlify.app](https://comfy-haupia-02c33d.netlify.app/)) <br /> | 1. canvas工具类、碰撞检测、拖拽；<br />2. 片头动画、资源加载机制、粒子特效、JS的面向对象开发 | ★★<br />[Details](canvas_learning/readme.md)                 |
| threejs_learning<br />（webGL）             | 3D 图形           | 1.**threejs_learning**：包含threejs的基本使用案例，以及imgTo3d的案例。 | 1. three.js 基本使用                                         | ★☆                                                           |
| realchat_learning<br />（webRTC+webSocket） | 实时通讯          | 1. **webrtc_chatapp_react**：一个基于react+node+webrtc的双人视频对话项目<br />2.**websocket_chatapp**：一个基于websocket的双人对话项目 | 1. WebRTC：socket.io➕socket.io-client<br />2. WebSocket：ws  | ★★☆                                                          |
| engineering_learning                        | 工具              | 略                                                           | 1. webpack基本使用<br />2. vite<br />3. gulp等<br />4. Eslint、Babel的配置及使用（Vue） | ★★☆                                                          |
| chrome_extention                            | 插件              | TODO：颜色拾取器、词典                                       | 1. Chrome 简易插件开发                                       | ★☆                                                           |
|                                             |                   |                                                              |                                                              |                                                              |
|                                             |                   |                                                              |                                                              |                                                              |



## 语言、服务端+系统及相关工具

| 名称                 | 类型       | Github 存档                                                  | 技术点与经验                                                 | Status                                     |
| -------------------- | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------ |
| node_learning        | 服务端环境 | 略                                                           | 1. Web+跨域：Express、http、Cors<br />2. 文件：multer、path、fs<br />3. 通信：socket.io、ws<br /> | ★☆<br />                                   |
| lightserver_learning | 服务       | 1.  **http_server_node**：一个http server<br />2. **socket_server_node**：一个socket server<br />3. **socket_server_python**：一些基于socket模拟http等server<br />4.**file_server_node**：一个file upload server | 1. Python、Node基础<br />2. 轻量级基础server搭建             | ★☆                                         |
| git_learning         | 工具       | 略                                                           | 1. git push、pull及常见问题<br />2. git actions + gh pages持续部署 | ★★☆<br />[Details](git_learning/readme.md) |
| docker_learning      | 工具       | 略                                                           | 1. docker 镜像迁移、部署                                     | ★                                          |
| nginx_learning       | 工具       | 略                                                           | 1. 项目部署                                                  | ☆                                          |
| linux_learning       | 工具       | 略                                                           | 1. Linux 基本指令<br />2. 脚本语言：shell<br />3. 工具：vim、tmux、docker、ssh等 | ★★                                         |
|                      |            |                                                              |                                                              |                                            |

## 实战项目

| 名称     | 类型    | Github 存档                                                  | 技术点与经验                                                 | Status                                                     |
| -------- | ------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------------------- |
| kob      | Git项目 | 1. **kob**：一个基于Vue3+springboot的多人联机游戏项目        | 1. springboot：web开发<br />2. springcloud：security权限、匹配服务、测评服务 | ★★☆<br />[Details](https://github.com/juemuel/Kob-of-Game) |
| 其他经验 | 其他    | 1. **wemeet**：基于融云SDK开发的Android Java项目；<br />2. **bs-end-GA**：基于遗传算法的路径匹配系统<br />3. 数据大屏：一个基于 Vue2+DataV 的数据大屏项目<br />4. 边缘网关项目：一个基于 React+TS+Antd的边缘网关项目 | 1. Android Java开发<br />2. 路径匹配算法<br />3. 数据大屏-Vue-DataV实战<br />4. 物联网SPA-React-Antd实战 | ★☆                                                         |
|          |         |                                                              |                                                              |                                                            |

