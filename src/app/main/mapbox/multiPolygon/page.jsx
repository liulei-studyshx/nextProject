'use client'
import React, { useEffect, useRef } from 'react';
import  geojson from '../geojson.js'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';;

mapboxgl.accessToken = 'pk.eyJ1IjoibHVrYXNtYXJ0aW5lbGxpIiwiYSI6ImNpem85dmhwazAyajIyd284dGxhN2VxYnYifQ.HQCmyhEXZUTz3S98FMrVAQ'; // 必填，如果只使用自定义瓦片也可以用空串
var svgXML =
`<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"> 
    <path d="M529.6128 512L239.9232 222.4128 384.7168 77.5168 819.2 512 384.7168 946.4832 239.9232 801.5872z" p-id="9085" fill="#ff0000"></path> 
</svg>
`

var svgBase64 = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgXML)));
const App = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // 防止重复初始化

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [ 120.22750854492188, 36.31431251367803],
      zoom: 12
    });
    map.current.on('zoom',()=>{console.log(map.current.getZoom())})
 let arrowIcon = new Image(20, 20)
    arrowIcon.src = svgBase64
    arrowIcon.onload = function() {
        map.current.addImage('arrowIcon', arrowIcon)
    }
    map.current.on('load', () => {
      // 添加矢量瓦片数据源（必须符合 MVT 格式，包含 MultiPolygon）
    //   map.current.addSource('multipolygon-source', {
    //     type: 'vector',
    //     tiles: [
    //       'https://ct01.data.neolix.cn/neolixtu/prod/layer/ndp/3654/27054/roadConcaveHull/{z}/{x}/{y}.pbf'  // 你自己的瓦片服务地址
    //     ],
    //     type: 'vector',
    //     tileSize: 512,
    //     minzoom: 9,
    //     maxzoom: 10
    //   });

    //   // 添加 MultiPolygon 填充图层
    //   map.current.addLayer({
    //     id: 'multipolygon-fill',
    //     type: 'fill',
    //     source: 'multipolygon-source',
    //     'source-layer': 'roadConcaveHull', // 替换为你的 tippecanoe 中指定的图层名
    //     paint: {
    //       'fill-color': '#00cc99',
    //       'fill-opacity': 0.6
    //     }
    //   });

    //   // 添加边界线
    //   map.current.addLayer({
    //     id: 'multipolygon-outline',
    //     type: 'line',
    //     source: 'multipolygon-source',
    //     'source-layer': 'roadConcaveHull',
    //     paint: {
    //       'line-color': '#003300',
    //       'line-width': 1
    //     }
    //   });


    //   map.current.addLayer({
    //     'id': `arrow`,
    //     'type': 'symbol',
    //      source: 'multipolygon-source',
    //     'source-layer': 'roadConcaveHull',
    //     'layout': {
    //       'symbol-placement': 'line',
    //       'symbol-spacing':10, // 图标间隔，默认为250
    //       'icon-image': 'arrowIcon', //箭头图标
    //       'icon-size': 0.5,
    //       "icon-allow-overlap": true,
    //     }
    // });
    const polygonWithHole = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: geojson,
      properties: {}
    }]
  };
    map.current.addSource('polygon-source', {
      type: 'geojson',
      data: polygonWithHole
    });

    map.current.addLayer({
      id: 'polygon-fill',
      type: 'fill',
      source: 'polygon-source',
      paint: {
        'fill-color': '#00cc88',
        'fill-opacity': 0.6
      }
    });
    });
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default App;
