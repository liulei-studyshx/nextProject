'use client'
import React, { useEffect, useRef } from 'react';

const AMapBasic = () => {
  const mapRef = useRef(null);

  useEffect(() => {
   
    const script = document.createElement('script');
    script.src = 'https://webapi.amap.com/maps?v=2.0&key=fb855a2dd37224feb9b41b1bbe04e0db&plugin=AMap.MapboxVectorTileLayer'
    script.async = true;
    script.onload = () => {
      const map = new window.AMap.Map(mapRef.current, {
        center: [120.40585256670397,36.24971040266945], 
        zoom: 13
      });
       var mvtLayer = new window.AMap.MapboxVectorTileLayer({
        zIndex: 129,
        // opacity: 1,
        visible:true,
        url: 'https://ctn.data.neolix.cn/ndp/data/ctt/977/1255/roadConcaveHull/[z]/[x]/[y].pbf?key=h4$.OREhInwG',
        dataZooms: [9, 10],
        zooms:[2,24],
        styles: {
          polygon: {
            sourceLayer: 'roadConcaveHull',
            color: 'rgba(62,110,255,0.7)',
            borderColor: '#3E6EFF',
            borderWidth: 2,
            visible: 1
          }
        }
      });
    map.add(mvtLayer);
   
    };
        
 
    document.head.appendChild(script);
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default AMapBasic;