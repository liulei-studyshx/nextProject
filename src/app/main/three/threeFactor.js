
'use client'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// if(typeof window == 'undefined'){return}
// 生成threeJs的三要素，场景，相机，渲染器
export const threeFactor = ()=>{
    
const dom = document.querySelector('#three-contain');
console.log('dom:=============== ', dom);

// if(!dom){ 
//     return;
// }
// 场景
const scene = new THREE.Scene();
//相机
const camera = new THREE.PerspectiveCamera(45, dom.clientWidth / dom.clientHeight, 0.1, 1000);

// 灯光
// 添加环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// 添加平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.castShadow = true;
scene.add(directionalLight);


// 渲染器，设置大小，添加到页面中
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(dom.clientWidth, dom.clientHeight);

renderer.shadowMap.enabled = true;
dom.appendChild(renderer.domElement);
console.log('dom,renderer.domElement',dom,renderer.domElement)
renderer.setPixelRatio(window.devicePixelRatio)
window.addEventListener('resize', () => {
    const dom = document.querySelector('#three-contain');
    resizeRenderer(dom.clientWidth)
})
const resizeRenderer = (width=dom.clientWidth) => {
    const dom = document.querySelector('#three-contain');
    camera.aspect = width / dom.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(width, dom.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio)
}
// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true; // 启用阻尼效果
// controls.dampingFactor = 0.1;  // 设置阻尼系数
 function textLoader(url){ 
   const textureLoader = new THREE.TextureLoader();
   return new Promise( async (resolve)=>{
       textureLoader.load(url,(obj)=>{resolve(obj)});
   })
}
return  {scene, camera, renderer,directionalLight,resizeRenderer,controls,textLoader}
}
