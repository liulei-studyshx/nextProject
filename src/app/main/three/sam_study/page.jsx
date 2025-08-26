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