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
    constructor(xpos, ypos, radius, color, text, speed){
       this.xpos = xpos;
       this.ypos = ypos;
       this.radius = radius;
       this.color = color;
       this.text = text;
       this.speed = speed;
       
       this.dx = 1 * this.speed;
       this.dy = 1 * this.speed;
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
    
    update(){
      this.text = hit_counter;
      context.clearRect(0, 0, window_width,window_height);// 把过去的清空，再重新渲染？！！
      this.draw(context);
      if((this.xpos + this.radius) > window_width){
        this.dx = -this.dx;
        hit_counter--;
      }
      if((this.xpos - this.radius) <0){
        this.dx = -this.dx;
        hit_counter--;
      }
      if((this.ypos + this.radius) > window_height){
        this.dy = -this.dy;
        hit_counter--;
      }
      if((this.ypos - this.radius) <0){
        this.dy = -this.dy;
        hit_counter--;
      }
      this.xpos += this.dx;
      this.ypos += this.dy;
    }
  }
  
  let hit_counter = 100;
  let my_circle = new Circle(100, 100, 50, "black", hit_counter,5);
  my_circle.draw(context);

  let updateCircle = function(){
    requestAnimationFrame(updateCircle);
    my_circle.update();
  }
  updateCircle();
})();

(function() {  
  // 这里是加载不同的 JavaScript 文件的代码  
  document.write('<script id="03collision" src="03collision.js"></script>');
})();  