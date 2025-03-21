// === Импорт модулей Three.js ===
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';

// === Создание сцены и камеры ===
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;

// === Освещение ===
const ambientLight = new THREE.AmbientLight(0x404040, 25);
scene.add(ambientLight);

// === Рендерер и VR ===
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));

// === Камера управление ===
const orbitControls = new OrbitControls(camera, renderer.domElement);

// === Загрузка моделей ===
const loader = new GLTFLoader();

let zabka = null;
let kfc = null;
let room = null;

loader.load('models/Girl/scene.gltf', (gltf) => {
    zabka = gltf.scene;
    zabka.scale.set(2, 2, 2);
    scene.add(zabka);
});

loader.load('models/kfc/scene.gltf', (gltf) => {
    kfc = gltf.scene;
    kfc.scale.set(10, 10, 10);
    scene.add(kfc);
});

loader.load('models/room/scene.gltf', (gltf) => {
    room = gltf.scene;
    room.scale.set(2, 2, 2);
    room.position.set(0, -2, 0);
    scene.add(room);
});

// === Таймер для анимации ===
const clock = new THREE.Clock();

// === Аудио ===
const listener = new THREE.AudioListener();
camera.add(listener);
let sound = null;

// === Кнопка для включения музыки ===
const musicButton = document.createElement('button');
musicButton.innerText = '🔊 Включить музыку';
musicButton.style.position = 'absolute';
musicButton.style.top = '20px';
musicButton.style.left = '20px';
musicButton.style.zIndex = '999';
musicButton.style.padding = '10px';
musicButton.style.fontSize = '16px';
document.body.appendChild(musicButton);

// === Функция запуска музыки ===
const playAudio = () => {
    if (!sound) {
        sound = new THREE.Audio(listener);
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load('audio/sigma.mp3', (buffer) => {
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.setVolume(0.5);
            sound.play();
        });
    } else if (!sound.isPlaying) {
        sound.play();
    }
    musicButton.remove(); // Убираем кнопку после запуска
};

// === Обработчик клика по кнопке ===
musicButton.addEventListener('click', playAudio);

// === Если юзер входит в VR — запускаем музыку тоже ===
renderer.xr.addEventListener('sessionstart', () => {
    playAudio();
});

// === Основной рендер-цикл ===
renderer.setAnimationLoop(() => {
    orbitControls.update();
    const elapsedTime = clock.getElapsedTime();

    if (kfc) {
        kfc.position.x = Math.cos(elapsedTime);
        kfc.rotation.y += 0.01;
    }

    if (zabka) {
        zabka.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
});
