class AsteroidService{
  constructor(player, particles){
    this.collection = [];
    this.player = player;
    this.particles = particles;
  }
  init(total){
    this.collection = [];
    for (let i = 0; i < total; i++) {
      let asteroid = new Asteroid(1);
      asteroid.init();
      this.collection.push(asteroid)
    }
  }
  update(){
    this.collection.forEach(a => {
      a.update();
      a.checkForCollisionsWithPhasers(this.player.projectileService.collection, this.particles,this);
      a.checkForCollisionsWithPlayer(this.player);
    })
  }
  render(){
    this.collection.forEach(a => {
      a.render();
    })
    
  }
  // 碰撞产生
  spawn(size, total, owner){
    for (var i = 0; i < total; i++) {
      let asteroid = new Asteroid(size);
      asteroid.init();
      asteroid.x = owner.x + owner.img.width/2;
      asteroid.y = owner.y + owner.img.height/2;
      this.collection.push(asteroid);
    }
  }
}
class Asteroid{
  constructor(size){
    this.size = size;
    this.fx = new Fx();
    this.img = null;
    this.boom = null;
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.speed = 0;
    this.rotation = 0.0;
    this.turnrat = 0.0;
    this.active = false;
  }
  init(){
    this.fx.init();
    this.setAsteroidImg()
    this.boom = window.gui.getResouce("boom-audio");
    this.x = 0 + this.img.width/2;
    this.y = 0 + this.img.height/2;
    this.angle = Math.random()*Math.PI*2.0;
    this.speed = Math.random()*Math.PI*0.5;
    this.rotation = 0;
    this.turnrate = Math.random()*(0.04 - - 0.04) + -0.04;
    this.active=true;
  }
  update(){
    if(this.active){
      this.x += Math.sin(this.angle) * this.speed;
      this.y +=  Math.cos(this.angle) * this.speed;
      this.rotation += this.turnrate;
      // 出界效果
       if(this.x > this.fx.cnv.width){
         this.x = 0 - this.img.width/2;
       }
       if(this.x + this.fx.cnv.width < 0){
         this.x = this.fx.cnv.width;
       }
       if(this.y > this.fx.cnv.height){
        this.y = 0;
      }
       if(this.y + this.img.height < 0){
        this.y = this.fx.cnv.height;
      }
    }
  }
  render(){
    if(this.active){
      this.fx.rotateAndDrawImage(this.img, this.x, this.y, this.rotation);
      this.fx.drawCircle(this.x,this.y,5, "gray")
    }
  }
  collisionDetected(){
    this.active = false;
    this.boom.pause();
    this.boom.currentTime = 0;
    this.boom.play();
  }
  
  // 敌机碰撞检测：可以是子弹、也可玩家
  hasCollideWithEntity(entity){
    if(!this.active || !entity.active) return false;
    // 保证在地图内才能被击毁
    if(this.x<0 || this.y<0 || entity.x <0 || entity.y <0) return false;

    // 敌-四个边界外的判定，注意细节～可以先把x,y描出来
    let aLeftOfB = (entity.x + entity.size) < (this.x);
    // let aBelowB = (entity.y + entity.size) > (this.y + this.img.height);
    let aBelowB = (entity.y) > (this.y + this.img.height);
    let aRightOfB = (entity.x) > ( this.x + this.img.width);
    let aAboveB = (entity.y) < (this.y );
    if(!(aLeftOfB || aRightOfB || aAboveB || aBelowB)) console.log("玩家！")
    // 同时满足
    return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
  }
  
  // 敌-子弹碰撞检测
  checkForCollisionsWithPhasers(phasers,particles,service){
    if(this.active){
      phasers.forEach(p=>{
        if(this.hasCollideWithEntity(p)){
          this.collisionDetected();
          let nextSize = ++this.size;
          let total = Math.random() * 4;
          if(nextSize <=3){
            service.spawn(nextSize, total, this);
          }
          particles.spawn(16, this)
          p.active = false;
          return;
        }
      })
    }
  }
  
  // 敌-玩家碰撞检测
  checkForCollisionsWithPlayer(player){
    let active = (player.state == player.alive) ? true:false;
    let entity = {
      type:"player",
      x:player.x,
      y:player.y,
      size: player.img.width,
      active: active,
    }
    if(this.hasCollideWithEntity(entity)){
      console.log("hasCollide")
      player.kill();
    }
  }
  
  setAsteroidImg(){
    switch(this.size){
      case 2:
        this.img = window.gui.getResouce("asteroid-medium");
        break;
      case 3:
        this.img = window.gui.getResouce("asteroid-easy");
        break;
      default:
        this.img = window.gui.getResouce("asteroid-hard");
        break;
    }
  }

}