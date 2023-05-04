let game = new Game();
window.gui = new Gui(game);

window.onload = function(){
  console.log('loading...');
  window.gui.load([
    {id:"player-img", var:playerImg = document.createElement("img"), file:"assets/player01.png"},
    {id:"asteroid-img", var:asteroidImg = document.createElement("img"), file:"assets/space01.png"},
    {id:"laser-audio", var:laserAudio = document.createElement("audio"), file:"assets/shoot.wav"},
    {id:"boom-audio", var:boomAudio = document.createElement("audio"), file:"assets/enemy-death.wav"},
  ])
}
// 窗口调整行为：带gui调整
window.onresize = function(){
  console.log('resizing...');
  window.gui.resize();
}