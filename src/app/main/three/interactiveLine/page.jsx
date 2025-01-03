"use client";

import { useEffect } from "react";
import * as THREE from "three";

export default function Page() {
  useEffect(() => {
    init();
  }, []);
  
  const init = async () => {
    const {scene, camera, renderer} = await import('../threeFactor');
    let theta = 0;
    const radius = 100;
    const pointer = new THREE.Vector2();
    scene.background = new THREE.Color( 0xf0f0f0 );

    // const axesHelper = new THREE.AxesHelper(50);
    // scene.add(axesHelper);
    // 生成选中时的球形
    const geometry = new THREE.SphereGeometry( 5, 32, 32 );
    const material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    const sphereInter = new THREE.Mesh( geometry, material );
    sphereInter.visible = false;
    scene.add( sphereInter );

    // 生成线段
    // 生成的几何体是一个BufferGeometry，包含一个position属性，是一个Float32Array类型的数据，表示顶点的位置，顶点的位置是相对位值
    const lineGeometry = new THREE.BufferGeometry();
    const points = [];
    const point = new THREE.Vector3();
    const direction = new THREE.Vector3();
    for ( let i = 0; i < 50; i ++ ) {
        direction.x += Math.random() - 0.5;
        direction.y += Math.random() - 0.5;
        direction.z += Math.random() - 0.5;
        direction.normalize().multiplyScalar( 10 );
        point.add( direction );//向量相加 point 沿着 direction 方向在X，Y，Z轴上移动direction,X,Y,Z的长度
        points.push( point.x, point.y, point.z );
    }

    lineGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( points, 3 ) );
    const parentTransform = new THREE.Object3D();
    parentTransform.position.x = Math.random() * 40 -20;
    parentTransform.position.y = Math.random() * 40 -20;
    parentTransform.position.z = Math.random() * 40 -20;

    parentTransform.rotation.x = Math.random() * 2 * Math.PI;
    parentTransform.rotation.y = Math.random() * 2 * Math.PI;
    parentTransform.rotation.z = Math.random() * 2 * Math.PI;

    parentTransform.scale.x = Math.random() + 0.5;
    parentTransform.scale.y = Math.random() + 0.5;
    parentTransform.scale.z = Math.random() + 0.5;

    for ( let i = 0; i < 50; i ++ ) {
        let object;
        const lineMaterial = new THREE.LineBasicMaterial( { color: Math.random() * 0xffffff,linewidth:30 } );
        if(Math.random() > 0.5){
            object = new THREE.Line( lineGeometry, lineMaterial );
        }else{
            object = new THREE.LineSegments( lineGeometry, lineMaterial );
        }
        // 生成的线都使用了一组顶点位置，但是每个线段使用的几何体的position和旋转角度，缩放不一致，因此生成不同方向和不同位置的线段
        object.position.x = Math.random() * 400 -200;
        object.position.y = Math.random() * 400 -200;
        object.position.z = Math.random() * 400 -200;
        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;
        
        object.scale.x = Math.random() + 0.5;
        object.scale.y = Math.random() + 0.5;
        object.scale.z = Math.random() + 0.5;
        parentTransform.add(object);
    }
    scene.add(parentTransform);
    const raycaster = new THREE.Raycaster();
    raycaster.params.Line.threshold = 3;
    const onPointerMove = (event)=>{
        const dom = document.getElementById('three-contain')
        // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
        pointer.x = ( event.clientX / dom.clientWidth ) * 2 - 1;
        pointer.y = - ( (event.clientY - dom.offsetTop) / dom.clientHeight ) * 2 + 1;
    }
    document.addEventListener( 'pointermove', onPointerMove );
    

    const animate = () => {
        render()
    }
    renderer.setAnimationLoop(animate)
      
    const render = () => {
      // 相机旋转
      // theta += 0.1;
      camera.position.x = radius * Math.sin(THREE.MathUtils.degToRad(theta));
      camera.position.y = radius * Math.sin(THREE.MathUtils.degToRad(theta));
      camera.position.z = radius * Math.cos(THREE.MathUtils.degToRad(theta));
      camera.lookAt(scene.position);
      camera.updateMatrixWorld()
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(parentTransform.children, true);
      if(intersects.length > 0){
        sphereInter.visible = true;
        sphereInter.position.copy(intersects[0].point);
      }else{
        sphereInter.visible = false;
      }
      renderer.render(scene, camera);
    }
  }

  return (
    <div
      id="three-contain"
      style={{ width: "100%", height: `calc(100vh - 46px)` }}
    />
  );
}
