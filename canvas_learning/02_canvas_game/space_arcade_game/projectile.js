// 不止一个的可以设置Service类
class ProjectileService{
  constructor(owner){
    this.owner = owner;
    this.max = 10;
    this.pointer = 0;
    this.collection = [];
  }
  init(){
    this.pointer = 0;
    this.collection = [];
    for(let i = 0; i < this.max; i++){
      let p = new Projectile(this.owner);
      p.init();
      this.collection.push(p);
    }
  }
  update(){
    this.collection.forEach(p=>{
      p.update();
    });
  }
  render(){
    this.collection.forEach(p=>{
      p.render();
    });
  }
  fire(){
    if(this.pointer < this.max){
      this.collection[this.pointer].fire();
      this.pointer++;
    }else{
      this.pointer = 0;
    }
  }
}
class Projectile{
  constructor(owner){
    this.owner = owner;
    
    // 子弹角度、射速、坐标、大小
    this.angle = this.owner.angle;
    this.speed = 8;
    this.x = 0;
    this.y = 0;
    this.size = 3;
    
    this.active = false;
    this.lifeSpan = 100; // 子弹生命周期
    this.alive = this.lifeSpan;
    
    this.fx = new Fx();
  }
  init(){
    this.active = false;
    this.fx.init();
  }
  update(){
    if(this.active){
      // 设置子弹方向，在递减alive期间保持
      this.x += Math.sin(this.angle) * this.speed;
      this.y -= Math.cos(this.angle) * this.speed;
      this.alive--;
      this.active = this.alive > 0 ? true :false;
      
      // 出界效果
       if(this.x > this.fx.cnv.width){
         this.x = 0 - this.size;
       }
       if(this.x + this.size < 0){
         this.x = this.fx.cnv.width;
       }
       if(this.y > this.fx.cnv.height){
        this.y = 0;
      }
       if(this.y + this.size < 0){
        this.y = this.fx.cnv.height;
      }
      
    }
  }
  render(){
    if(this.active){
      this.fx.drawCircle(this.x, this.y, this.size, "limegreen");
    }
  }
  // 设置开火角度、子弹起始位置
  fire(){
    this.angle = this.owner.angle;
    this.alive = this.lifeSpan;
    this.x = this.owner.x + this.owner.img.width/2;
    this.y = this.owner.y + this.owner.img.height/2;
    this.active = true;
  }
}