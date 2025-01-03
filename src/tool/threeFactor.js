'use client'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export function getWindowWidth() {
// 生成threeJs的三要素，场景，相机，渲染器
const dom = document.querySelector('#three-contain');
if(!dom){ 
    return;
}
// 场景
const scene = new THREE.Scene();
//相机
const camera = new THREE.PerspectiveCamera(75, dom.innerWidth / dom.innerHeight, 0.1, 1000);

// 灯光
// 添加环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// 添加平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.castShadow = true;
scene.add(directionalLight);


// 渲染器，设置大小，添加到页面中
const renderer = new THREE.WebGLRenderer();
renderer.setSize(dom.innerWidth, dom.innerHeight);

renderer.shadowMap.enabled = true;
dom.appendChild(renderer.domElement);

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
return {scene, camera, renderer,directionalLight}
}
// export {scene, camera, renderer,directionalLight}
