class Fx{
  constructor(){
    this.cnv = null;
    this.ctx = null;
  }
  
  init(){
    this.cnv = document.getElementById("canvas");
    this.ctx = this.cnv.getContext("2d");
    console.log("canvas:",this.cnv)
  }
  
  fillCanvas(color){
    this.drawRect(0,0,this.cnv.width,this.cnv.height,color);
  }
  
  drawRect(x,y,width,height,color){
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x,y,width,height);
    this.ctx.fill();
  }
  drawCircle(x,y,size,color){
    this.ctx.beginPath();
    this.ctx.fillStyle = color();
    this.ctx.arc(x,y,size,0,Math.PI*2);
    this.ctx.fill();
  }
  // 旋转绘制img
  rotateAndDrawImage(image,atx,aty,angle){
    if(image && this.ctx){
      this.ctx.save();
      this.ctx.translate(atx+image.width/2, aty+image.height/2);
      this.ctx.rotate(angle);
      this.ctx.drawImage(image, -image.width/2, -image.height/2);
      this.ctx.restore();
    }
  }

}