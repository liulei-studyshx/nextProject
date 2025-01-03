/* eslint-disable react/no-children-prop */
'use client'
import { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default function RayCaster() {
    useEffect(() => {
        init()
    },[])
    const init = () => {
        const dom = document.getElementById('canvas')
        // 创建场景
        const scene = new THREE.Scene();
        // 创建相机
        const camera = new THREE.PerspectiveCamera(75, dom?.clientWidth /dom?.clientHeight, 0.1, 1000);
        // 创建渲染器
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(dom?.clientWidth,dom?.clientHeight);
        dom.appendChild(renderer.domElement);
        // 创建控制器
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        camera.position.set(10,10,10);
        const light = new THREE.AmbientLight(0xffffff, 1);
        scene.add(light);

        // const texLoader= new THREE.TextureLoader();
        let plane = null;
        let boxHelper = null;
        // texLoader.load("/imgs/enter.png",texture => {
        //     const actualWidth = texture.image.width;
        //     const actualHeight = texture.image.height;
            const planeGeometry = new THREE.PlaneGeometry(20, 10);
            const planeMaterial = new THREE.MeshBasicMaterial({
                // map:texture,
                side: THREE.DoubleSide,
                color:new THREE.Color(0x0000ff),
                });
            plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.position.set(1, 1, 1); // 设置平面位置
            // plane.scale.set(0.07, 0.07, 0.07); // 设置平面大小
            planeGeometry.computeBoundingBox(); // 重新计算包围盒
            scene.add(plane);
            boxHelper = new THREE.BoxHelper(plane, 0xff0000); // 红色包围盒
            scene.add(boxHelper);
            // })
        // 创建射线
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const onMouseDown = (event: MouseEvent) => {
            // 计算鼠标位置
            console.log('dom?.clientWidth,,window.innerWidth,dom?.clientHeight,window.innerHeight: ', dom?.clientWidth,window.innerWidth,dom?.clientHeight,window.innerHeight);
            mouse.x = (event.clientX / dom?.clientWidth) * 2 - 1;
            mouse.y = -((event.clientY - dom?.offsetTop) / dom?.clientHeight) * 2 + 1 
            // + (window.innerHeight - dom?.clientHeight) / dom?.clientHeight * 2;
            console.log('mouse: ', mouse);
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(plane);
            console.log('intersects: ', intersects);
            if (intersects.length > 0) {
                intersects[0].object.material.color.set(0xff0000);
            }else{
                plane.material.color.set(0x00ff00);
            }
        }
        raycaster.params.Line.threshold = 1; // 容差值，可根据需要调整

        document.addEventListener('mousedown', onMouseDown, false);
        const animation = () => {
            renderer.render(scene, camera);
            window.requestAnimationFrame(animation);
            controls.update();
            if(plane){
                plane.updateMatrixWorld();
                plane.geometry.computeBoundingBox();
                plane.geometry.computeBoundingSphere();
            }
            if(boxHelper){
                boxHelper.update();
            }
            raycaster.setFromCamera(mouse, camera);
          };
          animation();
    }
    return <div id="canvas" style={{width:'100%',height:'100%'}}></div>
}

