
// 用setInterval控制的Game刷新
class GameLoop{
  constructor(game){
    this.loop = null;
    this.game = game;
  }
  
  start(){
    this.init();
    this.loop = setInterval(()=>{
      this.update();
      this.render();
    }, 1000/60); // 每秒60次
  }
  
  stop(){
    clearInterval(this.loop);
  }
  
  init(){
    if(this.game){
      this.game.init();
    }
  }
  
  resize(){
    if(this.game){
      this.game.resize();
    }
  }
  
  update(){
    if(this.game){
      this.game.update();
    }
  }
  
  render(){
    if(this.game){
      this.game.render();
    }
  }
}