'use client'

import { useEffect, useState,useLayoutEffect,useRef } from 'react'
import Tool from './Tool.jsx'
import '../../../../styles/mark.css'
import Mark from './mark'
import 'ol/ol.css'
import { Spin } from 'antd'

const imageArr = ['https://photokit.com/features/images/image-text.webp','https://neolix-dmp.eos-wuxi-5.cmecloud.cn/dmp/pro/dataset/upload/80590add5319b7e5515e2c6d5d18105d/yuncheng_X60096_20250205-124159-x3p_camera_11_front_left_dark_3_mm_YunChengShi-WanRongXian-20250120_0.11-1738730519.753000.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250312T073223Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Credential=CQOJPATV4PAYTD9J3I3K%2F20250312%2FUS_EAST_1%2Fs3%2Faws4_request&X-Amz-Signature=350eb56e2f4721ef013fa53c7e52392ff1d18f1e55a00c9da9745da551bf7d3b']
const Page = () => {
    const [imageScale,setImageScale] = useState(0);
    const imageSize = useRef({})
    const imageRatioWidthZoom = useRef(0);
    const imageSource = useRef(imageArr[0]);
    const showIndex = useRef(0)
    useLayoutEffect(() =>{
        initMap();
    },[])
  
    const loadImages=()=> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = imageSource.current;
            img.onload = ({path, target}) => {
                imageSize.current = {width:target.naturalWidth, height:target.naturalHeight};
                resolve({path, target});
            };
            img.onerror = () => {
                reject(new Error('Failed to load image'));
            };
        })
    }
    const initMap = async ()=>{
        const {path, target} = await loadImages();
        window.map  = new Mark({target: 'map',imgSource: imageSource.current,imgWidth:target.naturalWidth,imgHeight:target.naturalHeight});
        window.map.map.on('wheel', changeZoom)
        showIndex.current = 0;
        window.addEventListener("resize",resetView);
        resetZoomRate()
        window.map.initResultVectorLayer()
    }
    const resetView = ()=>{
        window.map.map.getView().fit(window.map.extent,{ duration: 200,callback: (e) => {
            // console.log(window.map.map.getView().getZoom(),'this.initZoom')
       }})
       resetZoomRate()
    }
    const changeZoom = (evt)=>{
        const zoom = window.map.map.getView().getZoom();
        const scale = imageRatioWidthZoom.current * zoom;
        if(scale < 0.1 ) {
            window.map.map.getView().setZoom(0.1 / imageRatioWidthZoom.current)
        };
        if(scale > 3){
            window.map.map.getView().setZoom(3 / imageRatioWidthZoom.current)
        }
        setImageScale(scale)
    }
    const resetZoomRate = ()=>{
        const container = document.getElementById('map')
        let imageScale = 1
        const {width, height} = imageSize.current;
        const containerW = container.clientWidth;
        const containerH = container.clientHeight;
        if(containerW / containerH >= width / height){
            imageScale = containerH / height
        }else{
            imageScale = containerW / width
        }
        setImageScale(imageScale);
        if(!imageRatioWidthZoom.current ){
            const zoom = window.map.map.getView().getZoom();
            // zoom 的1 对应的缩放比例 
            imageRatioWidthZoom.current = imageScale / zoom;
        }
    }
    // 更新图片
    const switchImage =async ()=>{
        showIndex.current += 1
        imageSource.current = imageArr[showIndex.current % imageArr.length];
        const { target } = await loadImages();
        window.map.switchImage({url: imageSource.current, width:target.naturalWidth, height:target.naturalHeight})
    }


    return <div className="main-view-viewer" >
        
        <div className="main-view">
            <div className="bar">
                <div>缩放(滚轮)：{parseInt(imageScale * 100) }%</div>
                <div style={{marginLeft: '10px'}} onClick={resetView}>重置</div>
                <div onClick={switchImage} style={{marginLeft: '10px'}}>切换图片</div>
            </div>
            <div
            className="map"
            id="map"
            onContextMenu={e => e.preventDefault()}
            >
            </div>
        </div>
        <Tool/>
     </div>
}
export default Page