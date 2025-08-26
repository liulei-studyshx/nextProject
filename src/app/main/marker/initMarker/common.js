import * as turf from '@turf/turf';
import { createBox } from 'ol/interaction/Draw';
import {Style,Stroke,Fill,Circle as CircleStyle,Text} from 'ol/style';
/**
 * @author:liulei
 * @description: 判断点是否在多边形内
 * @param {*} map 
 * @param {*} point 
 * @returns boolean
 */
export const pointInPolygon = (map, point)=>{
    const layer = map.getLayers().getArray().find(l => l.className_ == 'imageLayer');
    const extent = layer.getSource().getImageExtent();//[minX,minY,maxX,maxY]
    // console.log(extent)//[0, -3240, 3840, 0],[0, -1536, 1920, 0]
    const x = extent[2];
    const y = extent[1];
    const bounds = [[0,0],[x,0],[x,y],[0,y],[0,0]];
    const pt = turf.point(point)
    const polygon = turf.polygon([bounds])
    return turf.booleanPointInPolygon(pt, polygon)
}

/**
 * @author:liulei
 * @description: hex转rgba
 * @param {*} hex hex颜色
 * @param {*} alpha 透明度
 * @returns rgba
 */
export const hexToRgba = (hex, alpha=1) => {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        hex =hex.split('').map(c=>c+c).join('');
    }
    const bigint = parseInt(hex, 16);
    return `rgba(${(bigint >> 16) & 255},${(bigint >> 8) & 255},${bigint & 255},${alpha})`;
}

/**
 * @author:liulei
 * @description: 获取绘制图形的函数
 * @param {*} map 
 * @param {*} type 绘制图形的类型
 * @returns 
 */
export const getGeometryFunction = (map,type) => {
    let geometryFunction;
    switch (type) {
        case 'box':
            geometryFunction = createBox();
            break;
        case 'line':  
            geometryFunction = LineGeometryFunction(map);
            break;
    }
    return geometryFunction
}
/**
 * @author:liulei
 * @description: 线的绘制函数
 * @param {*} map 
 * @returns 
 */
export const LineGeometryFunction = (map) => {

}

export const getPolygonCoor = (coors) => {
    let result = [...coors[ 0 ]];
    const _first = result[ 0 ];
    const _last = result[ result.length - 1 ];
    if(_first.toLocaleString() !== _last.toLocaleString()) {
      result.push(_first);
    }
    return [result];
  }

  export const getFeatures = ({color,coordinates,text,textDirection="column"})=>{
    return [
        new Style({
            image: new CircleStyle({
              fill: new Fill({ color: color }),
              radius: 7
            }),
            renderer(coordinates, state) {
              const coor = coordinates[ 0 ]
              const ctx = state.context;
              ctx.beginPath();
              ctx.moveTo(coor[ 0 ][ 0 ], coor[ 0 ][ 1 ]);
              coor.forEach(element => {
                ctx.lineTo(element[ 0 ], element[ 1 ]);
              });
      
              ctx.setLineDash([10, 0, 10])
      
              ctx.lineWidth = 2.5;
              ctx.fillStyle = color;
              ctx.fill();
              ctx.strokeStyle = color;
              ctx.stroke();
            }
          }),
          new Style({
            text: new Text({
              text: text,
              overflow: true,
              textAlign: 'left',
              justify: 'left',
              font: '12px sans-serif',
              padding: [0, 10, 0, 10],
              scale: 1,
              backgroundFill: textDirection === 'column' ? new Fill({  color: color }) : null,
              fill: new Fill({  color: '#fff' })
            }),
            zIndex: 100
          })
    ]
  }