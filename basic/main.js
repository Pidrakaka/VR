import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const amblight = new THREE.AmbientLight( 0x404040, 25 ); // soft white light
scene.add( amblight );

//--------
//const renderer = new THREE.WebGLRenderer();
//renderer.setSize( window.innerWidth, window.innerHeight );
//renderer.setAnimationLoop( animate );
//document.body.appendChild( renderer.domElement );
//--------

// Создаём рендерер с поддержкой WebXR (VR)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true; // Включаем поддержку VR
document.body.appendChild(renderer.domElement);

// Добавляем VR-кнопку
document.body.appendChild(VRButton.createButton(renderer));


// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

camera.position.z = 10;

const loader = new GLTFLoader();

// Load a glTF resource
// loader.load(
//     // resource URL
//     'models/zabka/scene.gltf',
//     // called when the resource is loaded
//     function ( gltf ) {
//
//         gltf.scene.scale.set(10, 10, 10);
//         scene.add( gltf.scene );
//     },
//     // called while loading is progressing
//     function ( xhr ) {
//
//         console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
//     },
//     // called when loading has errors
//     function ( error ) {
//
//         console.log( 'An error happened' );
//
//     }
// );

// loader.load(
//     // resource URL
//     'models/kfc/scene.gltf',
//     // called when the resource is loaded
//     function ( gltf ) {
//
//         gltf.scene.scale.set(10, 10, 10);
//         scene.add( gltf.scene );
//     },
//     // called while loading is progressing
//     function ( xhr ) {
//
//         console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
//     },
//     // called when loading has errors
//     function ( error ) {
//
//         console.log( 'An error happened' );
//
//     }
// );
loader.load(
    // resource URL
    'models/CV/CV2.gltf',
    // called when the resource is loaded
    function ( gltf ) {

        gltf.scene.scale.set(10, 10, 10);
        scene.add( gltf.scene );
    },
    // called while loading is progressing
    function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {

        console.log( 'An error happened' );

    }
);


const orbitControls = new OrbitControls(camera, renderer.domElement);

//function animate() {

    //renderer.render( scene, camera );

//}

// Главный рендер-цикл (для VR и обычного режима)
renderer.setAnimationLoop(() => {
    orbitControls.update(); // Обновляем управление камерой
    renderer.render(scene, camera);
});