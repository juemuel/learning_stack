const toggle = document.getElementById("toggleDark");
const body = document.querySelector('body');

toggle.addEventListener('click',function(){
  this.classList.toggle('bi-moon');
  if(this.classList.toggle('bi-brightness-high')){
    console.log(toggle)
    // toggle.style.color = 'black'; // 黑色开始界面就不改了
    body.style.background = 'white';
    body.style.color = 'black';
    body.style.transition = '2s';
    if(window.gui.gameloop.game.fx.cnv !== null){
       toggle.style.color = 'white'; 
       window.gui.gameloop.game.renderFillCanvas(2);
    }
  }else{
    body.style.background = 'black';
    body.style.color = 'white';
    body.style.transition = '2s';
    if(window.gui.gameloop.game.fx.cnv !== null){
      toggle.style.color = 'black'; 
      window.gui.gameloop.game.renderFillCanvas(3);
    }
  }
})


