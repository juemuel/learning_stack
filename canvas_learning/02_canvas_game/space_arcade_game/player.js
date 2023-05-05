class Player{
  constructor(){
    this.fx = new Fx();
    this.img = null;
    this.keyHandler = new KeyHandler();
    this.projectileService = new ProjectileService(this);
    this.laserSound = null;
    
    this.turnSpeed = 5;
    this.acceleration = 5;
    this.friction = 0.00;
    
    this.x = 0;
    this.y = 0;
    this.thrust = {x:0, y:0};
    this.angle = 0;
    this.rotation = 0;
    
    // 子弹
    this.reload = 10; 
    this.frames = 0 // 当前弹量
  }
  
  init(){
    this.fx.init();
    this.img = window.gui.getResouce("player-img");
    this.keyHandler.init();
    this.projectileService.init();
    this.laserSound = window.gui.getResouce("laser-audio");
    
    // 出生位置
    this.x = this.fx.cnv.width/2 - this.img.width/2;
    this.y = this.fx.cnv.height/2 - this.img.height/2;
    this.thrust = {x:0, y:0};
    
    this.angle = 0/360*Math.PI;
    console.log(Math.PI, this.angle)
    this.rotation = 0;
    this.reload = 10;
    this.frames = 0;
  }

  update(){
    // 弹量更新
    this.frames++;
    // 位置更新
    this.rotation = 0;
    this.thrust.x = this.thrust.x * this.friction;
    this.thrust.y = this.thrust.y * this.friction;
    // console.log("画布宽度高度",this.fx.cnv.width,this.fx.cnv.height,"player位置",this.x,this.y)
    // 出界效果
    if(this.x > this.fx.cnv.width){
      this.x = 0 - this.img.width/2;
    }
    if(this.x + this.img.width < 0){
      this.x = this.fx.cnv.width;
    }
    if(this.y > this.fx.cnv.height){
     this.y = 0;
   }
    if(this.y + this.img.height < 0){
     this.y = this.fx.cnv.height;
    }
    
    if(this.keyHandler.keys.indexOf("ArrowUp") > -1){
      // 根据angle的方向来前进（即向上当作x坐标方向）
      this.thrust.x = this.acceleration * Math.sin(this.angle);
      this.thrust.y = - this.acceleration * Math.cos(this.angle);
    }
    if(this.keyHandler.keys.indexOf("ArrowLeft") > -1){
      this.rotation = - this.turnSpeed / 360 * Math.PI;
    }
    if(this.keyHandler.keys.indexOf("ArrowRight") > -1){
      this.rotation = this.turnSpeed / 360 * Math.PI;
    }

    if(this.keyHandler.keys.indexOf(" ") !== -1){
      if(this.frames > this.reload){
        this.frames = 0;
        this.laserSound.pause();
        this.laserSound.currentTime = 0;
        this.laserSound.play();    
        this.projectileService.fire();
      }
    }
    this.angle += this.rotation;
    this.x += this.thrust.x;
    this.y += this.thrust.y;
    this.projectileService.update();
  }
  
  render(){
    this.projectileService.render();
    this.fx.rotateAndDrawImage(this.img, this.x, this.y, this.angle);
  }
}