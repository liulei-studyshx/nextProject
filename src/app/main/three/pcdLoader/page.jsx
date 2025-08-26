'use client'
import { useEffect, useRef } from 'react'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import {Spin} from 'antd'

export default function Page() {
    useEffect(()=>{
        init();
    },[])

    const init = async() => {
        const factor = await import("../threeFactor");
        const {scene, camera, renderer} =  factor.threeFactor();
        camera.position.set(0, 0, 0.5);
        const loader = new PCDLoader();
        loader.load('https://neolix-dmp.eos-wuxi-5.cmecloud.cn/dataset/upload/df90e99a85ea307c2991d0369b87275f/100652.pcd?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250213T021442Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=CQOJPATV4PAYTD9J3I3K%2F20250213%2FUS_EAST_1%2Fs3%2Faws4_request&X-Amz-Signature=be1aadf190215458f00b8ba83805c9dac7a4cf22edc44674da3c4a9fb8e22474', 
         function (points) {
            // points.material.color = { r: 0.9333333333333333, g: 0.9058823529411765, b: 0.9529411764705882 };
            points.material.size = 0.1;
            scene.add(points);
            // 将点云中心化,使整个页面把点云展示全
            var middle = new THREE.Vector3();
            points.geometry.computeBoundingBox();
            points.geometry.boundingBox.getCenter(middle);
            //applyMatrix4 用给定矩阵转换几何体的顶点坐标
            const matrix4 = new THREE.Matrix4();
            points.applyMatrix4(matrix4.makeTranslation(- middle.x, - middle.y, - middle.z));
  
            var largestDimension = Math.max(points.geometry.boundingBox.max.x,
                points.geometry.boundingBox.max.y,
                points.geometry.boundingBox.max.z);
            const min = Math.min(points.geometry.boundingBox.min.x,
                points.geometry.boundingBox.min.y,
                points.geometry.boundingBox.min.z);
            camera.position.z = largestDimension - min;
        })


        const animation = () => {
            renderer.render(scene, camera);
            requestAnimationFrame(animation);
        }
        animation()
    }

    return <div
        id="three-contain"
        style={{ width: "100%", height: `calc(100vh - 46px)` }}
        />
}