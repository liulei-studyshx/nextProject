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
            varying vec2 vUv;
            void main() {
                vUv = uv;
                vec3 newPosition = position;
                newPosition.y +=0.1;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
        `;
        // 片元着色器
        const fragmentShader = `
            varying vec2 vUv;
            void main() {
                gl_FragColor = vec4(vUv.x,vUv.y,0.0,1.0);// 红色 RGBA
            }
        `;

        const aspect = window.innerWidth / window.innerHeight
        // plane
        const geometry = new THREE.PlaneGeometry(4, 2);
        const material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.DoubleSide,
        })
        const plane = new THREE.Mesh(geometry, material);
        console.log(material.fragmentShader);
        scene.add(plane);

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