// 1.1 获取canvas对象,理解为画布; context属性，在画布中创建图形的简化方式
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

// 1.2 调整画布大小并设置颜色
canvas.width =  window.innerHeight - 60;
canvas.height = 400;
let start_background_color = "white";
context.fillStyle= start_background_color;
context.fillRect(0,0,canvas.width, canvas.height);
let draw_color = "black";
let draw_width = "2";
let is_drawing =false;
let restore_array = [];
let index = -1;

function change_color(element){
  draw_color = element.style.backgroundColor;
}

canvas.addEventListener("touchstart",start,false);
canvas.addEventListener("touchmove",draw,false);
canvas.addEventListener("mousedown",start,false);
canvas.addEventListener("mousemove",draw,false);

canvas.addEventListener("touchend",stop,false);
canvas.addEventListener("mouseup",stop,false);
canvas.addEventListener("mouseout",stop,false);

function start(event){
  is_drawing = true;
  event.preventDefault();  
  context.beginPath();
  //TODO：这边clientX失效只能用pageX的原因？考虑通过canvas.onmousedown来实现？类似dragObject.js中那样
  console.log(event.pageX)
  context.moveTo(event.pageX - canvas.offsetLeft,
                 event.pageY - canvas.offsetTop);
  event.preventDefault();
}
function draw(event){
  if(is_drawing){
    console.log(event.ClientX)
    context.lineTo(event.pageX - canvas.offsetLeft,
                 event.pageY - canvas.offsetTop);
    context.strokeStyle = draw_color;
    context.lineWidth = draw_width;
    context.lineCap="round";
    context.lineJoin = "round";
    context.stroke();
  }
  event.preventDefault();
}
function stop(event){
  if(is_drawing){
    context.stroke;
    context.closePath();
    is_drawing = false;
  }
  event.preventDefault();
  if(event.type != 'mouseout'){
    restore_array.push(context.getImageData(0,0,canvas.width, canvas.height));
    index += 1;    
  }
  console.log(restore_array);
}

function clear_canvas(){
  context.fillStyle = start_background_color;
  context.clearRect(0,0,canvas.width, canvas.height);
  context.fillRect(0,0,canvas.width, canvas.height);
  restore_array = [];
  index = -1;
}

function undo_last(){
  if(index <= 0 ){
    clear_canvas();
  }else{
    index -= 1;
    restore_array.pop();
    context.putImageData(restore_array[index],0,0);
  }
}




