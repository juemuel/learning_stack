const myButton01 = document.getElementById('button01');

myButton01.addEventListener('click', function() {  
  window.animationFrameId = null;
  // 获取要加载的 JavaScript 文件名  
  const scriptTag = document.createElement('script');  
  // 设置 JavaScript 文件的路径和文件名  
  scriptTag.src = '01ori_obj.js';  
  scriptTag.setAttribute('id', 'script1');  
  document.head.appendChild(scriptTag);  
  document.close();  
});  

const myButton02 = document.getElementById('button02');  
myButton02.addEventListener('click', function() {      
  window.animationFrameId = null;
  // 同理，可以加载另一个 JavaScript 文件  
  const scriptTag = document.createElement('script');  
  scriptTag.src = '02class_obj.js';  
  scriptTag.setAttribute('id', 'script2');  
  document.head.appendChild(scriptTag);  
  document.close();  
});  


const myButton03 = document.getElementById('button03');  
myButton03.addEventListener('click', function() {      
  window.animationFrameId = null;
  // 同理，可以加载另一个 JavaScript 文件  
  const scriptTag = document.createElement('script');  
  scriptTag.src = '03collision.js';  
  scriptTag.setAttribute('id', 'script3');  
  document.head.appendChild(scriptTag);  
  document.close();  
});  


const myButton04 = document.getElementById('button04');  
myButton04.addEventListener('click', function() {      
  window.animationFrameId = null;
  // 同理，可以加载另一个 JavaScript 文件  
  const scriptTag = document.createElement('script');  
  scriptTag.src = '04collision.js';  
  scriptTag.setAttribute('id', 'script4');  
  document.head.appendChild(scriptTag);  
  document.close();  
});  

const myButton05 = document.getElementById('button05');  
myButton05.addEventListener('click', function() {      
  window.animationFrameId = null;
  // 同理，可以加载另一个 JavaScript 文件  
  const scriptTag = document.createElement('script');  
  scriptTag.src = '05dynamic_obj_array.js';  
  scriptTag.setAttribute('id', 'script5');  
  document.head.appendChild(scriptTag);  
  document.close();  
});  