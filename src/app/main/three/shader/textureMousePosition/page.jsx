'use client'
import React,{useEffect} from 'react';
import * as THREE from 'three';
import Textures from './texture'


const Page = () => {
    useEffect(() => {
        init()
    }, [])
    const init = () => {
        const canvas = new Textures({canvas: document.getElementById('canvas')});

    }

    
    return <div id="canvas">

    </div>
}

export default Page;