'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const Page = () => {
    useEffect(() => {
        init()
    },[])

    const init = async() => {
        const factor = await import("../../threeFactor");
        const {scene, camera, renderer} =  factor.threeFactor();
        camera.position.set(0, 0, 5);
        // 顶点着色器
        const vertexShader = `
            uniform vec3 uPosition; // 传入的参数
            varying vec2 vUv;
            void main() {
                vUv = uv;
                vec3 newPosition = position;
                newPosition = (newPosition + uPosition)/2.;//取每个顶点和传入参数的平均值
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
        `;
        // 片元着色器
        const fragmentShader = `
            uniform vec3 uColor; // 传入的参数
            varying vec2 vUv;
            void main() {
                gl_FragColor = vec4(uColor,1.0);// 红色 RGBA
            }
        `;

        const aspect = window.innerWidth / window.innerHeight
        // plane
        const geometry = new THREE.PlaneGeometry(4, 2);
        const material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.DoubleSide,
            uniforms: {
                uColor:{value: new THREE.Vector3(0.0, 0.18, 0.65)},
                uPosition:{value: new THREE.Vector3(1,0,0)}
            }
        })
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        const axes = new THREE.AxesHelper(10);
        scene.add(axes)

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
export default Page;