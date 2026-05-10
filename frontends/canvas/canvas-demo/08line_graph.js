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
  canvas.style.background = "#bbf";
 
 const data = [
   200,
   150,
   170,
   100,
   80,
   50,
   350,
   200,
   200,
   230
 ]
 
 const start_value = data[0]; // 数据起点
 const start_point = 0; // 原点
 const distance = canvas.width / data.length; // 每一段的距离
 
 context.beginPath();
 context.lineWidth = 3; // 设置线的粗细
 context.strokeStyle = '#f56'; // 设置线的颜色
 
 // 起点
 context.moveTo(start_point, start_value);
 data.forEach((element, index) =>{
   const new_distance = start_point + (distance *(index + 1));
   context.lineTo(new_distance,element);
 })
 //终点
 context.lineTo(canvas.width, canvas.height);
 context.lineTo(start_point,canvas.height);
 context.lineTo(start_point,start_value);
 
 context.fillStyle = 'grey';
 context.fill();
 context.stroke();
 
})(); // IIFE之间不加分号报错

(function() {  // 必须额外开一个IIFE
  // 这里是加载不同的 JavaScript 文件的代码  
  document.write('<script id="08line_graph" src="08line_graph.js"></script>');
})();  


