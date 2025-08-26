'use client'

import React,{useEffect, useRef} from 'react'
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

const Page = () => {
    useEffect(()=>{
        init();
    },[])
    const init = async() => {
        const factor = await import("../../threeFactor");
        const {scene, camera, renderer,controls,directionalLight} = factor.threeFactor();
        camera.position.set(0,0,20);
        camera.lookAt(0,0,0);
        // 添加正方形
        const geometry = new THREE.BoxGeometry(1,1,1);
        const material = new THREE.MeshBasicMaterial({color:0x00ff00});
        const cube = new THREE.Mesh(geometry,material);
        cube.position.set(6, 0, 0);
        scene.add(cube);
        // 添加第二个正方形
        const cube2 = cube.clone();
        cube2.material = new THREE.MeshBasicMaterial({color:0x0000ff});
        cube2.position.set(0, 0, 0);
        scene.add(cube2);

        const tween = new TWEEN.Tween(cube.position)
            .to({ x: -6 }, 4000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .yoyo(true)
            .repeat(Infinity)
            .start();

        // 添加射线
        const raycaster = new THREE.Raycaster();
        let afterPositionX = cube.position.x - 0.001;
        const animate = () => {
            // 射线穿透检测
            // if(cube.position.x - afterPositionX >0 && afterPositionX > -6){
            //     cube.position.x -= 0.001;
            //     afterPositionX -= 0.001;
            // }
            // if(cube.position.x - afterPositionX < 0 && afterPositionX < 6){
            //     cube.position.x += 0.001;
            //     afterPositionX += 0.001;
            // }
            // if(afterPositionX <= -6 || afterPositionX >=6){
            //     afterPositionX = afterPositionX + (afterPositionX >= 6 ? -0.002 : 0.002);
            // }
            TWEEN.update();
            // 包围盒
            const box1 = new THREE.Box3().setFromObject(cube);
            const box2 = new THREE.Box3().setFromObject(cube2);
            box1.intersectsBox(box2) ? cube2.material.color.set('#ff0000'):cube2.material.color.set('#0000ff')

            
            controls.update();
            renderer.render(scene, camera);
          }
        renderer.setAnimationLoop(animate);
    }

    return(
        <div
      id="three-contain"
      style={{ width: "100%", height: `calc(100vh - 46px)` }}
    />
    )
}
export default Page