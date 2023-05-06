/**
 * 结构
 * Game(fx)
 *    player(fx)
 *      keyhandler
 */
class Game{
  constructor(){
    this.fx = new Fx();
    this.particleService = new ParticleService();
    this.player = new Player(this.particleService);
    this.asteroidService = new AsteroidService(this.player, this.particleService);
  }
  
  init(){
    // console.log("game init");
    this.fx.init();
    this.player.init();
    this.asteroidService.init(8);
    this.particleService.init();
  }
  
  resize(){
  }
  
  update(){
    this.player.update();
    this.asteroidService.update();
    this.particleService.update();
  }
  
  render(){
    this.fx.fillCanvas("#ffe558");
    this.player.render();
    this.asteroidService.render();
    this.particleService.render();
  }
}