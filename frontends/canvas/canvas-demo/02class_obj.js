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
  
  // 2.1 定义canvas的形状类（Circle为例）
  class Circle {
    constructor(xpos, ypos, radius, color, text){
       this.xpos = xpos;
       this.ypos = ypos;
       this.radius = radius;
       this.color = color;
       this.text = text;
    }
    
    draw(context){
      context.beginPath();
      
      context.strokeStyle = this.color;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.font = "20px Arial";
      context.fillText(this.text, this.xpos, this.ypos);
      // context.strokeText(this.text, this.xpos, this.ypos);// 这个粗
      context.lineWidth = 5;
      context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
      context.stroke();
      
      context.closePath();
    }
  }
  
  let circle_counter = 1;
  let all_circle = [];
  let createCircle = function(circle){
    circle.draw(context);
  }
  for(var numbers = 0; numbers < 10; numbers++){
    let random_x = Math.random()*window_width;
    let random_y = Math.random()*window_height;
    let my_circle = new Circle(random_x, random_y, 50, "black", circle_counter);
    all_circle.push(my_circle);
    createCircle(all_circle[numbers]);
    circle_counter++;
  }
})();


(function() {  
  // 这里是加载不同的 JavaScript 文件的代码  
  document.write('<script id="02class_obj" src="02class_obj.js"></script>');  
})();  