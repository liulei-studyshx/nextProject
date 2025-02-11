'use client'
import React,{useEffect, useRef} from 'react'
import * as THREE from 'three';
export default function Page() {
    const points = useRef([]);
    useEffect(()=>{
        init();
    },[])
    const init = async() => {
    const factor = await import("../threeFactor");
    const {scene, camera, renderer,controls,directionalLight} = factor.threeFactor();
    camera.position.set(20,20,20);
    camera.lookAt(0,0,0);
    const axisHelper = new THREE.AxesHelper(50);
    scene.add(axisHelper);

    const dom = document.getElementById("three-contain");
    const handlerClick = (e)=>{
    //   console.log('e: ', e.button,e.buttons);
      //屏幕坐标转为世界坐标
      points.current.push(e);

     console.log(getWorldCoordinate(dom, scene, e.clientX, e.clientY,0));

      
    }
    const getWorldCoordinate=(dom, scene, x, y, z)=> {
	    const workOrder = sessionStorage.getItem('currWorkOrder') ? JSON.parse(sessionStorage.getItem('currWorkOrder')) : {};
	    z = z != undefined ? z : workOrder.offsetZ || 0;
	    const mouse = {};
        mouse.x = (x / dom?.clientWidth) * 2 - 1;
        mouse.y = -((y - dom?.offsetTop) / dom?.clientHeight) * 2 + 1 
	    const stdVector = new THREE.Vector3(mouse.x, mouse.y, z);
	    const unprojectVector = stdVector.unproject(camera);
        //unprojectVector 是相对于相机位置的世界坐标，需要减去相机位置才是相对于原点(0,0,0)的世界坐标
	    const dir = unprojectVector.sub(camera.position).normalize();
	    const distance = (z - camera.position.z) / dir.z;
        // 需要沿着相应的方向移动距离
	    const worldVector = camera.position.clone().add(dir.multiplyScalar(distance));
	    return worldVector;
		}
    const handlerMove = (e)=>{
        // console.log('e.ctrlKey: ',e.metaKey, e.ctrlKey);
    //   console.log(e)
    }
    dom.addEventListener('click',handlerClick);
    renderer.domElement.addEventListener('mousemove',handlerMove,false);
    document.addEventListener('mousedown',(e)=>{console.log(e)})
    const animate = () => {
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