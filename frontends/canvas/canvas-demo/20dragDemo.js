  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");

  canvas.width = window.innerHeight - 30;
  canvas.height = window.innerWidth - 10;

  canvas.style.border = '5px solid red';
  let canvas_width = canvas.width;
  let canvas_height = canvas.height;
  let shapes = [];
  let current_shape_index = null;
  let is_dragging = false;
  let startX, startY;
  let offset_x,offset_y;
  // 计算偏移量
  let get_offset = function(){
    let canvas_offsets = canvas.getBoundingClientRect();
    offset_x = canvas_offsets.left;
    offset_y = canvas_offsets.top;
  }
  
  get_offset();
  window.onscroll = function(){get_offset()};
  window.onresize = function(){get_offset()};
  canvas.onresize = function(){get_offset()};
  
  shapes.push({
    x: 200,
    y: 50,
    width: 200,
    height: 200,
    color: 'red'
  });
  
  shapes.push({
    x: 50,
    y: 50,
    width: 10,
    height: 20,
    color: 'blue'
  });

  let is_mouse_in_shape = function(x, y, shape) {
    let shape_left = shape.x;
    let shape_right = shape.x + shape.width;
    let shape_top = shape.y;
    let shape_bottom = shape.y + shape.height;
    if (x > shape_left && x < shape_right && y > shape_top && y < shape_bottom) {
      return true;
    } else return false;

  }
  let mouse_down = function(event) {
    event.preventDefault();
    startX = parseInt(event.clientX - offset_x);
    startY = parseInt(event.clientY - offset_y);
    let index = 0;
    for (let shape of shapes) {
      if (is_mouse_in_shape(startX, startY, shape)) {
        current_shape_index = index;
        is_dragging = true;
        return;
      }
      index++;
    }
  }
  // mouse_out和mouse_up是一样的
  let mouse_out = function(event) {
    if (!is_dragging) {
      return;
    }
    event.preventDefault();
    is_dragging = false;
  }
  let mouse_up = function(event) {
    if (!is_dragging) {
      return;
    }
    event.preventDefault();
    is_dragging = false;
  }
  // mouse_move拖拽动作
  let mouse_move = function(event){
    if(!is_dragging) return;
    if(is_dragging){
      event.preventDefault();
      let mouseX = parseInt(event.clientX);
      let mouseY = parseInt(event.clientY);
      let dx  = mouseX - startX;
      let dy  = mouseY - startY;
      console.log('move with dragging');
      console.log(dx,dy)
      
      let current_shape = shapes[current_shape_index];
      current_shape.x +=dx;
      current_shape.y +=dy;
      draw_shapes();
      startX = mouseX;
      startY = mouseY;
    }
  }
  canvas.onmousedown = mouse_down;
  canvas.onmouseup = mouse_up;
  canvas.onmouseout = mouse_out;
  canvas.onmousemove = mouse_move;


  let draw_shapes = function() {
    context.clearRect(0, 0, canvas_width, canvas_height);
    for (let shape of shapes) {
      context.fillStyle = shape.color;
      context.fillRect(shape.x, shape.y, shape.width, shape.height);
    }
  }
  draw_shapes();