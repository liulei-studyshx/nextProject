'use client'

import React,{useEffect, useRef} from 'react'
import * as THREE from 'three';

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

        // 添加射线
        const raycaster = new THREE.Raycaster();

        const animate = () => {
            // 射线穿透检测
            cube.position.x -= 0.001;
            raycaster.set(cube.position, new THREE.Vector3(-1,0,0).normalize());
            const intersects = raycaster.intersectObject(cube2);
            if(intersects.length > 0){
                if (intersects[0].distance < 0.5) {
                    intersects[0].object.material.color.set(0xff0000);
                }
            }
            raycaster.set(cube.position, new THREE.Vector3(1, 0, 0).normalize());
            const intersection2 = raycaster.intersectObject(cube2);
            if (intersection2.length > 0) {
                if (intersection2[0].distance < 0.5) {
                intersection2[0].object.material.color.set(0x0000ff);
                }
            }
            
            requestAnimationFrame(animate);
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