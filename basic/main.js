// Импорт нужных модулей Three.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';


// === Создание сцены и камеры ===
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;

// === Добавляем освещение ===
const ambientLight = new THREE.AmbientLight(0x404040, 25); // Мягкий белый свет
scene.add(ambientLight);

// === Создаём рендерер и включаем VR ===
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// === Добавляем кнопку для VR ===
document.body.appendChild(VRButton.createButton(renderer));

// === Управление камерой (вращение) ===
const orbitControls = new OrbitControls(camera, renderer.domElement);

// === Загружаем модели ===
const loader = new GLTFLoader();

let zabka = null;
let kfc = null;
let room= null;

// Загружаем модель "Жабка"
loader.load('models/Girl/scene.gltf', (gltf) => {
    zabka = gltf.scene;
    zabka.scale.set(2, 2, 2);
    scene.add(zabka);
});

// Загружаем модель "KFC"
loader.load('models/kfc/scene.gltf', (gltf) => {
    kfc = gltf.scene;
    kfc.scale.set(10, 10, 10);
    scene.add(kfc);
});

loader.load('models/room/scene.gltf', (gltf) => {
    room = gltf.scene;
    room.scale.set(2, 2, 2);
    room.position.set(0, -2,0);
    scene.add(room);
});


// === Добавляем таймер для анимации ===
const clock = new THREE.Clock();

// === Звук в сцене ===
const listener = new THREE.AudioListener();
camera.add(listener);

const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();

audioLoader.load('audio/music.mp3', (buffer) => {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
});

// === Запуск музыки при первом касании (для мобильных устройств) ===
const playAudio = () => {
    if (!sound.isPlaying) {
        sound.play();
    }
    // Удаляем обработчик после первого клика
    document.removeEventListener('click', playAudio);
    document.removeEventListener('touchstart', playAudio);
};

// Добавляем обработчики для клика и касания (для телефонов)
document.addEventListener('click', playAudio);
document.addEventListener('touchstart', playAudio);



// === Основной рендер-цикл (для обычного режима и VR) ===
renderer.setAnimationLoop(() => {
    orbitControls.update(); // Обновляем управление камерой

    const elapsedTime = clock.getElapsedTime(); // Время с начала анимации

    // Анимация KFC (движение по кругу)
    if (kfc) {
        kfc.position.x = Math.cos(elapsedTime);
        kfc.rotation.y += 0.01;
    }

    // Вращение Жабки
    if (zabka) {
        zabka.rotation.y += 0.01;
    }

    // Рендер сцены
    renderer.render(scene, camera);
});
