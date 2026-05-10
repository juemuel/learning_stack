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
    
  class Image{
    constructor(imagePath, xpos, ypos, width, height){
      this.imagePath = imagePath;
      this.xpos = xpos;
      this.ypos = ypos;
      this.width = width;
      this.height = height;
    }
  }
  let image = new Image('logo01.png', 100, 50,200,200);
  
  function createImage(context, imagePath, xpos, ypos, width, height){
    let myImage = document.createElement('img');
    myImage.src = imagePath;
    myImage.onload = function(){
      context.drawImage(myImage, xpos, ypos, width, height);
    }
  }
  
  createImage(context, image.imagePath, image.xpos, image.ypos, image.width, image.height);

})(); // IIFE之间不加分号报错

(function() {  // 必须额外开一个IIFE
  // 这里是加载不同的 JavaScript 文件的代码  
  document.write('<script id="07interaction" src="07interaction"></script>');
})();  


