import * as THREE from 'three';
import { GLTFLoader } from 'jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from "jsm/loaders/DRACOLoader.js"

const w = window.innerWidth;
const h = window.innerHeight
const renderer = new THREE.WebGLRenderer({ antialias: true })

renderer.setSize(w, h);
document.body.appendChild(renderer.domElement)

const fov = 75;
const aspect = w / h
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const scene = new THREE.Scene()
const geo = new THREE.IcosahedronGeometry(1.0, 2)
const mat = new THREE.MeshNormalMaterial({
    color: 0xccff,
})

const mesh = new THREE.Mesh(geo, mat)
scene.add(mesh)

// Load GLB model
const loader = new GLTFLoader();
const draco = new DRACOLoader();
draco.setDecoderConfig({ type: 'js' });
draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
loader.setDRACOLoader(draco);
loader.load(
    "/threeJS/black-cubes.glb", // path relative to `public/`
    function (gltf) {

        scene.add(gltf.scene);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

    },
    // called while loading is progressing
    function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    (error) => {
        console.error("Error loading .glb:", error);
    }
);

function animate(t = 0) {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate()