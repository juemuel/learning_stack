# Learning Stack

## 内容结构
- d3_learning
    - 条形图
    - 散点图
    - 结合svg使用
- spider_learning
    - http_server
    - socket_server
    _ request
- canvas_learning
    - canvas_demo
      - 通过按钮切换样式
      - P1. 简单的定义canvas画布，并绘制矩形、圆形（rect、circle）
      - P2. 通过class类在canvas上生成多个静态圆形；（添加text两种方式）
      - P3. 生成动态圆形并对窗口边缘做碰撞检测，碰到边缘弹射collision detection、requestAnimationFrame
      - P4. 动态圆形A对静态圆形B的区域做碰撞检测，进入区域变色，出去恢复；
      - P5. 使用Array维护多个生产的动态圆形
      - P6. 将IMAGE做成canvas LOGO（调整位置、形状） 
      - P7. 交互事件（点击变色）
      - P8. 线状图表
      - P9. ⭐️绘画板App
      - P10.⭐️拖拽canvas图形
      - P11.⭐️绘制头像
      - TODO：当选择P3后，无法切回P1 P2 的 js样式
    - canvas_game: space arcade太空街机
      - EXP：资源加载和GUI切换（index、gui）、canvas工具类（fx）、按键事件处理（keyhandler）、日间夜间样式切换
      - 页面结构：加载页、开始页、游戏页、结束页
      - 文件结构
        - index：窗口调整、资源加载
          - gui(game):资源加载和页面显示
            - gameloop(game)：游戏刷新与进程控制
            - game：游戏主体
              - asteroidService：Png敌机
              - player(fx)：Png玩家
                - keyhandler：按键事件
                - projectile：子弹
        - Else 
          - particleService：Canvas粒子特效
          - lightdark：日夜模式
- uni_cloud_learning
    - uni-app、uni-cloud
    - 留言墙demo：使用uni_cloud完成支持图片、文本上传的留言墙
- git_learning
    - git
- chrome_extention
    - chrome-extention
    - 谷歌插件啦，官方demo案例


