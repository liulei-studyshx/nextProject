'use client'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import * as turf from "@turf/turf";

/**
 * @description 通过texture绘制虚线
 * @description 已知两个点，绘制可以设置宽度的虚线
 * @date 2023-03-30
 * step 1. 根据两个点生成一条线
 * step 2. 计算方向向量
 * step 3. 计算垂直向量
 * step 4. 计算起点和终点左右点
 * step 5. 根据起点和终点的左右点生成两个矩形
 * step 6. 根据矩形生成texture
*/

export default function Page() {
    useEffect(() => {
        init();
      }, []);
      
      const init = async () => {
        const factor = await import("../threeFactor");
        const {scene, camera, renderer} =  factor.threeFactor();
        camera.position.set(20,20,20);
        camera.lookAt(0,0,0);
        scene.background = new THREE.Color(0x8c8c8c);
        const textureLoader = new THREE.TextureLoader();
        const axesHelper = new THREE.AxesHelper( 100 );
        scene.add( axesHelper );
        // 生成线
        const lineMaterial = new THREE.LineBasicMaterial({color:0xffff00});
        const points = [];
        points.push( new THREE.Vector3(  5, 10, 0 ) );
        points.push( new THREE.Vector3( 0, 0, 0 ) );

        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        const line = new THREE.Line( geometry, lineMaterial );
        scene.add( line );

         // 计算方向向量
        const direction = new THREE.Vector3().subVectors(points[1], points[0]).normalize();

        // 定义一个参考向量，用于计算垂直方向
        // reference只要不和direction平行即可，垂直于这个面则垂直于这个面内的任意一条线
        /**
         * 为什么参考向量不能是平行向量
         * 如果是平行向量，参考向量和目标向量的乘积为0，向量0没有方向，因此不能是平行向量
         */
        const reference = new THREE.Vector3(0, 0, 1);

        // 计算垂直向量（使用叉积）
        const perpendicular = new THREE.Vector3().crossVectors(direction, reference).normalize();

        // 偏移距离
        const offsetDistance = 0.15;

        // 计算起点的左右点
        // 计算过程类似于沿着垂直方向移动offsetDistance的距离
        const leftPoint = new THREE.Vector3().addVectors(points[0], perpendicular.clone().multiplyScalar(offsetDistance));
        const rightPoint = new THREE.Vector3().addVectors(points[0], perpendicular.clone().multiplyScalar(-offsetDistance));
        // end左右点
        const endLeftPoint = new THREE.Vector3().addVectors(points[1], perpendicular.clone().multiplyScalar(offsetDistance));
        const endRightPoint = new THREE.Vector3().addVectors(points[1], perpendicular.clone().multiplyScalar(-offsetDistance));
       
        // 生成线左邻线
        const lineMaterialStart = new THREE.LineBasicMaterial({color:0xff00ff});
        const geometryStart = new THREE.BufferGeometry().setFromPoints( [leftPoint,endLeftPoint] );

        const lineStart = new THREE.Line( geometryStart, lineMaterialStart );
        scene.add( lineStart );
        // 生成右邻线
        const lineMaterialEnd = new THREE.LineBasicMaterial({color:0x00eeee});
        const geometryEnd = new THREE.BufferGeometry().setFromPoints( [rightPoint,endRightPoint] );

        const lineEnd = new THREE.Line( geometryEnd, lineMaterialEnd );
        scene.add( lineEnd );
        

        textureLoader.load('/imgs/zebra-crossing.png', (texture) => {
        // 计算方向
          const direction = new THREE.Vector3().subVectors(points[1], points[0]);
          //计算距离
          const distance = direction.length();
          // 计算四元素
          direction.normalize();
          const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1,0,0), direction);

          // 计算中心点
          const midPoint = new THREE.Vector3().addVectors(points[0], points[1]).multiplyScalar(0.5);

          const geometry = new THREE.PlaneGeometry(distance, offsetDistance*2);
          // 移动planeGeometry到中心点
            // 设置纹理重复模式
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(distance, 1); // 控制虚线的密度（10 表示在 U 方向上重复 10 次）
            // 创建材质，使用贴图
          const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true, // 启用透明效果
          });
          const mesh1 = new THREE.Mesh(geometry, material);
          mesh1.setRotationFromQuaternion(quaternion);
          mesh1.position.copy(midPoint);

          scene.add(mesh1);
        })
        renderer.setAnimationLoop(animation)
        function animation(){
            renderer.render(scene,camera)
            window.requestAnimationFrame(animation)
        }

    }
    return  <div
    id="three-contain"
    style={{ width: "100%", height: `calc(100vh - 46px)` }}
  />
}