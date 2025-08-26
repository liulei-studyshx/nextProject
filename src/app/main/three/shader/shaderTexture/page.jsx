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
        camera.position.set(0, 0, 2);
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('/imgs/map.png');
        texture.wrapS = THREE.RepeatWrapping;
        // 顶点着色器
        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                vec3 newPosition = position;
                newPosition.y +=0.1;
                 //从物体坐标到屏幕坐标的转换
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
        `;
        // 片元着色器
        const fragmentShader = `
            uniform sampler2D uTexture;
            uniform float uTime;
            varying vec2 vUv;
            void main() {
                // gl_FragColor = vec4(vUv.x,vUv.y,0.0,1.0);// 红色 RGBA
                vec2 scrollvUv = vec2(vUv.x + uTime, vUv.y);
                //为什么uTime为负值时，背景图片向右移动，当前点 取的是 scrollvUv 位置的颜色，把左边坐标的点放在当前位置
                // gl_FragColor = texture2D(uTexture, vUv);
                vec4 textureColor = texture2D(uTexture, scrollvUv);
                float alpha = 1.0 - vUv.y;
                // 片元着色器最终输出的是gl_FragColor
                gl_FragColor = vec4(textureColor.rgb, alpha);
            }
        `;

        const aspect = window.innerWidth / window.innerHeight
        // plane
        const geometry = new THREE.PlaneGeometry(2*aspect, 2);
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: {
                    value: texture,
                },
                uTime:{
                    value: 0
                }

            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.DoubleSide,
            transparent: true 
        })
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        const animation = () => {
            material.uniforms.uTime.value -= 0.0005;
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