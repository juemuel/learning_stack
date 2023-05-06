class Game{
  constructor(){
    this.fx = new Fx();
    this.particleService = new ParticleService();
    this.player = new Player(this.particleService);
    this.asteroidService = new AsteroidService(this.player, this.particleService);
    this.type = null;
  }
  
  init(){
    // console.log("game init");
    this.fx.init();
    this.player.init();
    this.asteroidService.init(8);
    this.particleService.init();
    this.tpye = 1;
  }
  
  resize(){
  }
  
  update(){
    this.player.update();
    this.asteroidService.update();
    this.particleService.update();
  }

  renderFillCanvas(type){
    this.type = type;
    switch(type){
      case 2:
        this.fx.fillCanvas("#000");        
        break;
      case 3:
        this.fx.fillCanvas("#fff");
        break;
      default:
        this.fx.fillCanvas("#ffe558");
        break;
    }
  }
  
  render(){
    this.renderFillCanvas(this.type);
    this.player.render();
    this.asteroidService.render();
    this.particleService.render();
  }
  
}

