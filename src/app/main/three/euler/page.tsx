/* eslint-disable react/no-children-prop */
'use client'
import { useEffect,useState,useRef } from 'react'
import {Button} from 'antd'
import * as THREE from 'three'
import "react-markdown-editor-lite/lib/index.css";
import dynamic from 'next/dynamic';
import 'github-markdown-css';
import '../../style.css'

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false,
  });
const ReactMarkdown = dynamic(() => import('react-markdown'), {
    ssr: false,
})

export default function EulerStudy() {
    const [content,setContent] = useState<string>('');
    const [threeContainerWidth,setThreeContainerWidth] = useState('50%');
    const [showEdit,setShowEdit] = useState<boolean>(true);
    const draying = useRef<boolean>(null);
    const resizeHandler = useRef<() => void>();
    const timer = useRef<number>();
    useEffect(() => {
        init();
        getContent();
        window.addEventListener('mouseup',dragContentUp)
        timer.current = setInterval(() => {
            if(content){return}
            // saveArticle();
        },60000)
        return () => {
            window.removeEventListener('mouseup',dragContentUp);
            if(timer.current){
                clearInterval(timer.current);
                timer.current = null;
            }
        }
    },[])

    const getContent =async ()=>{
        const res = await fetch(`${window.location.origin}/api/article/getArticle?id=1`)
       const data = await res.json();
       setContent(data[0].content)
    }
    
    const init = async() => {
        const { scene, camera, renderer,textLoader,resizeRenderer } = await import('../threeFactor');
        resizeHandler.current = resizeRenderer;
        camera.position.set(20,0,0);
        camera.lookAt(0,0,0);
        scene.background = new THREE.Color(0x8c8c8c);
        const axesHelper = new THREE.AxesHelper( 100 );
        scene.add( axesHelper );

        const geometry = new THREE.BoxGeometry(10,10,10);
        // 给box设置不同的颜色
        // const materials = [
        //     new THREE.MeshBasicMaterial( { color: 0x00ff00 } ),
        //     new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
        //     new THREE.MeshBasicMaterial( { color: 0x0000ff } ),
        //     new THREE.MeshBasicMaterial( { color: 0x453423 } ),
        //     new THREE.MeshBasicMaterial( { color: 0x867542 } ),
        //     new THREE.MeshBasicMaterial( { color: 0x980977 } )
        // ];
        // 给不同的面设置不同的贴图
        // const textLoader = new THREE.TextureLoader();
        // X轴正方向负方向 Y轴正方向负方向 Z轴正方向负方向
        const materials = [
            new THREE.MeshBasicMaterial( { map:  await textLoader('/image/one.jpeg')} ), //X轴的正方向
            new THREE.MeshBasicMaterial( { map:  await textLoader('/image/three.jpeg')} ), //X轴的负方向
            new THREE.MeshBasicMaterial( { map:  await textLoader('/image/five.jpeg')} ), //Y轴的正方向
            new THREE.MeshBasicMaterial( { map:  await textLoader('/image/six.jpeg')} ), //Y轴的负方向
            new THREE.MeshBasicMaterial( { map:  await textLoader('/image/four.jpeg')} ), //Z轴的正方向
            new THREE.MeshBasicMaterial( { map:  await textLoader('/image/two.jpeg')} ), //Z轴的负方向
        ]
        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);
        const euler = new THREE.Euler(0,0,0);
        cube.rotation.copy(euler);
        const animation = () => {
            renderer.render(scene,camera)
            window.requestAnimationFrame(animation)
        }
        animation();
    }
    const handleEditorChange = ({text}) => {
        setContent(text)
    }
    const saveArticle = async ()=> {
        await fetch(`http://localhost:3000/api/article/updateArticle`,{
            method:'POST',
            body:content});
    }
    const dragContentDown = () => {
        draying.current = true
    }
    const dragContentMove = () => {
        if(!draying.current) return;
    }
    const dragContentUp = (e) => {
        if(!draying.current) return;
        const {clientX} = e;
        setThreeContainerWidth(clientX);
        resizeHandler.current?.(clientX);
        draying.current = false;

    }
    const showEditHandler = () => {
        setShowEdit(!showEdit)
        setThreeContainerWidth(showEdit?'100%':'50%');
        resizeHandler.current?.(showEdit?window.innerWidth:window.innerWidth/2);
    }
    return <div style={{width: '100%', height: '100%',display:'flex',overflow:'hidden'}}>
        <div id="three-contain" style={{width: threeContainerWidth, height: `calc(100vh - 46px)`}}></div>
        <div className='move_line' onMouseDown={dragContentDown} onMouseMove={dragContentMove}/>
        <div style={{flex:1}}>
            {showEdit&&<Button type="primary" style={{position:'absolute',zIndex:100,right:10,bottom:10}} onClick={saveArticle}>保存</Button>}
            <Button type="primary" style={{position:'absolute',zIndex:100,right:90,bottom:10}} onClick={showEditHandler}>{showEdit?'收起':'展开'}</Button>
            {showEdit&&<MdEditor  value={content} style={{ height: `calc(100vh - 46px)`,width: '100%'}} renderHTML={(text) => <ReactMarkdown children={text} />}  onChange={handleEditorChange} />}
        </div>
    </div>
}