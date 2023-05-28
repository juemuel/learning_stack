# Common_Web

## 内容结构

- ★★☆ imageDemo：
  - [完成]图片画廊（支持懒加载、搜索、modal、下载、预览） [Preview](#一、图片画廊)
  - [TD]图片编辑器
- ★★☆ videoDemo：
  - [完成]视频画廊（支持悬浮预览、modal、CSS动画） [Preview](#二、视频画廊)
- ★★☆ toolKitsDemo：web工具箱  [Preview](#三、通用工具)
  - [完成]文件上传（web+node express：支持文件上传、记录显示、进度显示）
  - [完成]文件下载（web）
  - [完成]验证码生成验证器（web）
  - [完成]颜色生成器（web）
  - [TD]颜色拾取器
  - [完成]QRCode生成器（web+api）
  - [TD]QRCode扫描器
  - [TD]虚浮工具（聊天助手）
  - [TD]密码强弱工具
- ☆☆☆ popDemo：弹窗案例工具箱
  - [TD]cookeDemo
  - [TD]netWorkDemo




## 一、图片画廊
### 内容描述
- imageGallery1.0：响应式列数+等分列宽+页内img搜索+本地图片展示
- imageGallery2.0：响应式列数+自动列宽+API搜索+api请求fetch promise处理+懒加载（两种方案）并模块化+URL图片下载（blob、a）+图片预览
   - lazyload1：window.scroll+window.resize监听
   - lazyload2: IntersectionObserver
   - 资源下载：支持local src和http src的下载
   - 图片预览：display:none和block实现；
   - EXP：onclick与事件监听
     - onclick适用于包含该属性的元素+方便域内字面量传参
       - 可以接一些功能：如onclick"xxx;event.stopPropagation();"
       - event.stopPropagation();阻止重复调用
     - 事件监听可以对任意元素绑定（比如某些自定义的组件如某些icon）+传参需要元素额外携带属性data-xxx，用e.target.dataset.xxx取 
   - EXP：html发生在js之前；js发生在html之前（嘿嘿，想一想吧，可以参考代码）

### 效果图
<p style="text-align:center;">
  <img src="https://s2.loli.net/2023/05/19/Tnpzj39sWcHLAwb.png" alt="image-20230519044639535" style="zoom:50%;" />
  <img src="https://s2.loli.net/2023/05/19/HYN4MQhtUmw3ZxV.png" alt="image-20230519043701349" style="zoom:50%;"/>
  <img src="https://s2.loli.net/2023/05/19/hKgNiqUlrYbf2yG.png" alt="image-20230519044404834" style="zoom:50%;" />
  <img src="https://s2.loli.net/2023/05/19/zjZ82xyYTDAG7VF.png" alt="image-20230519043201551" style="zoom: 25%;" />
</p>

## 二、视频画廊
- videoGallery：响应式列数+等分列宽+modal预览+视频悬浮预览
### 效果图
<p style="text-align:center;">
  <img src="https://s2.loli.net/2023/05/28/dxm8j1RcF24kEet.png" alt="image-20230528151241330" style="zoom:50%;" />
  <img src="https://s2.loli.net/2023/05/28/BFpuzMkR8GSHv4W.png" alt="image-20230528151306311" style="zoom:50%;" />
</p>
## 三、通用工具
### 效果图
![image-20230528151517647](https://s2.loli.net/2023/05/28/FBNJVKMEYzZPLec.png)



