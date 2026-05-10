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
 
 class Circle{
    constructor(xpos, ypos, radius, color){
       this.xpos = xpos;
       this.ypos = ypos;
       this.radius = radius;
       this.color = color;
    }
    
    draw(context){
      context.beginPath();
      context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
      context.strokeStyle = 'grey';
      context.lineWidth = 3;
      context.fillStyle = this.color;
      context.fill();
      context.stroke();
      context.closePath();
    }
    
    changeColor(newColor){
      this.color = newColor;
      this.draw(context);
    }
    
    clickCircle(xmouse, ymouse){
      console.log(xmouse, ymouse);
      const distance = 
      Math.sqrt(
      (( xmouse - this.xpos )*( xmouse - this.xpos)) 
      +
      ((ymouse - this.ypos )*( ymouse - this.ypos))
      );
      console.log(distance);
      if(distance < this.radius){
        this.changeColor('#56f');
        return true;
      }else{
        this.changeColor('#f56');
        return false;
      }
    }
  }
  
  let circle = new Circle(200,200,100,'red');
  circle.draw(context);
  
  canvas.addEventListener('click',(event)=>{
    const rect = canvas.getBoundingClientRect(); // 获取整个canvas的有效边界
    console.log(rect);
    const x= event.clientX - rect.left; // event.clientX属性可以获得点击位置
    const y= event.clientY - rect.top; 
    circle.clickCircle(x, y);
  })
})(); // IIFE之间不加分号报错

(function() {  // 必须额外开一个IIFE
  // 这里是加载不同的 JavaScript 文件的代码  
  document.write('<script id="07interaction" src="07interaction.js"></script>');
})();  


