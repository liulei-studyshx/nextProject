'use client'
import {useEffect} from 'react'
import * as Cesium from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
export default function Page() {
  useEffect(()=>{
    init()
  },[])
  const init =()=>{
    const cartesian = Cesium.Cartesian3.fromDegrees(116.3913, 39.9075, 100);
    console.log(cartesian,'cartesian')
    console.log(Cesium.Cartesian3.fromDegrees(116.3913, 39.9075, 0),'cartesian');
    console.log(Cesium.Cartesian3.fromDegrees(0, 0, 0),'cartesian')
    console.log(Cesium.Cartesian3.fromDegrees(90, 0, 0),'cartesian')
  }
  return (
    <div>cesium</div>
  )
}