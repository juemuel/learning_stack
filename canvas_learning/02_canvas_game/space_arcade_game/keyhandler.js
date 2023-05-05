class KeyHandler {
  constructor() {
    this.keys = [];
  }

  init() {
    window.addEventListener('keydown', (e) => {
      this.keyPressed(e);
    });
    window.addEventListener('keyup', (e) => {
      this.keyReleased(e);
    });
  }
  
  

  
  keyPressed(e) {  
    // 当按下时，如果e.key在数组中不存在，this.keys.indexOf(e.key)则为-1
    if( (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === ' ') 
        && this.keys.indexOf(e.key) === -1) {
          this.keys.push(e.key);
    }
  }
  


  keyReleased(e) {  
    if( (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === ' ')
     && this.keys.indexOf(e.key) !== -1){
      this.keys.splice(this.keys.indexOf(e.key), 1);
    }
  }
}