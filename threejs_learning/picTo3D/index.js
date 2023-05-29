// 初始化场景、相机和渲染器
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建盒子几何体和纹理
let geometry = new THREE.BoxGeometry(14.5, 11.7, 14.5);
let textureLoader = new THREE.TextureLoader();
let texture = textureLoader.load('https://cdn.shopify.com/s/files/1/0741/5129/7333/files/exam-test.jpg');
let material = new THREE.MeshBasicMaterial({
    map: texture,
    opacity: 0.8,
    transparent: true
});

// 创建立方体模型并添加到场景中
let cube = new THREE.Mesh(geometry, material);
cube.rotation.x = -0.3;
cube.rotation.y = 0.5;
scene.add(cube);

// 渲染场景
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();