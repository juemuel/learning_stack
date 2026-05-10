// 使用了IIFE函数，避免混淆
(function(){
  // 1.1 获取canvas对象,理解为画布; context属性，在画布中创建图形的简化方式
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");
  
  // 1.2 调整画布大小并设置颜色
  var window_height = window.innerHeight;
  var window_width = window.innerWidth;
  canvas.width = window_width;
  canvas.height = window_height;
  canvas.style.background = "#ff8";
  
  // 2.1 设置矩形形状和颜色
  context.fillRect(0,0,100,100);
  context.fillStyle = "red"; // 只对后面的生效
  context.fillRect(100,500,100,200);
  
  // 2.2 设置圆形形状
  context.beginPath();
  context.strokeStyle = "blue"; // 设置线条颜色
  context.arc(100,100,50,0,Math.PI * 2, false); // 设置弧形
  context.lineWidth = 20; // 设置粗细
  context.stroke(); // 开始画线
  context.closePath();
})(); // IIFE之间不加分号报错

(function() {  // 必须额外开一个IIFE
  // 这里是加载不同的 JavaScript 文件的代码  
  document.write('<script id="01ori_obj" src="01ori_obj.js"></script>');
})();  


