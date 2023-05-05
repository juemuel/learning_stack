class AsteroidService{
  constructor(player, particles){
    this.collection = [];
    this.player = player;
    this.particles = particles;
  }
  init(total){
    this.collection = [];
    for (let i = 0; i < total; i++) {
      let asteroid = new Asteroid();
      asteroid.init();
      this.collection.push(asteroid)
    }
  }
  update(){
    this.collection.forEach(a => {
      a.update();
      a.checkForCollisionsWithPhasers(this.player.projectileService.collection, this.particles);
    })
  }
  render(){
    this.collection.forEach(a => {
      a.render();
    })
  }
}
class Asteroid{
  constructor(){
    this.fx = new Fx();
    this.img = null;
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
    this.img = window.gui.getResouce("asteroid-img");
    this.x = 0 - this.img.width/2;
    this.y = 0 - this.img.height/2;
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
  }
  
  hasCollideWithEntity(entity){
    if(!this.active || !entity.active) return false;
    // 保证在地图内才能被击毁
    if(this.x<0 || this.y<0 || entity.x <0 || entity.y <0) return false;
    // 四个边界外的判定，注意细节～可以先把x,y描出来
    let aLeftOfB = (entity.x + entity.size) < (this.x);
    let aBelowB = (entity.y + entity.size) > (this.y + this.img.height);
    let aRightOfB = (entity.x) > ( this.x + this.img.width);
    let aAboveB = (entity.y) < (this.y );
    // 同时满足
    return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
  }
  
  // 传入子弹
  checkForCollisionsWithPhasers(phasers,particles){
    if(this.active){
      phasers.forEach(p=>{
        if(this.hasCollideWithEntity(p)){
          this.collisionDetected();
          particles.spawn(16, this)
          p.active = false;
          console.log("zidan:",p.x,p.y)
          console.log("guai:",this.x,this.y)
          return;
        }
      })
    }
  }
}