class Asteroid{
  constructor(){
    this.fx = new Fx();
    this.img = null;
    this.x = 0;
    this.y = 0;
    this.angle = 0;
  }
  init(){
    this.fx.init();
    this.img = window.gui.getResource("asteroid-img");
    this.x = 0 - this.img.width/2;
    this.y = 0 - this.img.height/2;
  
  }
  update(){
    
  }
  render(){
    this.fx.rotateAndDrawImage(this.img, this.x, this.y, this.angle);
  }
}