class Game{
  constructor(){
    this.fx = new Fx();
    this.player = new Player();
  }
  
  init(){
    console.log("game init");
    this.fx.init();
    this.player.init();
  }
  
  resize(){
    console.log("game resize")
  }
  
  update(){
    this.player.update();
  }
  
  render(){
    this.fx.fillCanvas("#033");
    this.player.render();
  }
}