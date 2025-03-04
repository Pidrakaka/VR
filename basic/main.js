import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.173.0/build/three.module.js';

// 1. Create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#F0F0F0');

// 2. Create the Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 3. Create the Cube
const geometry = new THREE.SphereGeometry(1, 32, 32); // Радиус 1, 32 сегмента по ширине и высоте
const geometry2 = new THREE.BoxGeometry();

const material = new THREE.MeshStandardMaterial({ color: '#468585', emissive: '#468585' });
const material2 = new THREE.MeshStandardMaterial({ color: '#00FF00', emissive: '#468585' });

const sphere = new THREE.Mesh(geometry, material);
const cube = new THREE.Mesh(geometry2, material2);
cube.position.x = 2; // Смещаем вправо

scene.add(cube);
scene.add(sphere);

// 4. Create the Lights

const light = new THREE.DirectionalLight(0x9CDBA6, 1.5);
light.position.set(1, 1, 1);
scene.add(light);


// 5. Create the Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 6.Animation
function animate() {
    requestAnimationFrame(animate);

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();




