
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import FullScreen from 'ol/control/FullScreen.js';
import MousePosition from 'ol/control/MousePosition.js';
import { getCenter } from 'ol/extent';
import Projection from 'ol/proj/Projection.js';
import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { defaults, DragPan, Draw, Modify, Translate, Select } from 'ol/interaction.js';
import {click} from 'ol/events/condition'
import { hexToRgba,pointInPolygon,getGeometryFunction,getPolygonCoor,getFeatures } from './common';
import {Style,Stroke,Fill,Circle as CircleStyle} from 'ol/style';
import {Circle} from 'ol/geom';
// import {Circle as CircleStyle} from 'ol/style';
import Feature from 'ol/Feature.js';
import IndexDB from '@common/indexDB'
import { Polygon,MultiPoint } from 'ol/geom.js';
import * as turf from '@turf/turf';
class Mark {
    constructor(props) {
        this.map = null;
        this.target = props.target;
        this.imgWidth = props.imgWidth;
        this.imgHeight = props.imgHeight;
        this.extent = [0,-props.imgHeight,props.imgWidth,0]
        this.imgSource = props.imgSource;
        this.initZoom = 1;
        this.init();
        this.dragFlag = true
        this.draw = null;
        this.select = null;
        this.modify = null;
        window.markSave = new IndexDB({name:'marker',storeNames:['result']});
    }
   
    initImageLayer(layerName, url) {
        const imageLayer = new ImageLayer({
            source: new Static({
                url: url,
                imageExtent: this.extent
              }),
            id: layerName,
            className: layerName,
        })

        return imageLayer;
    }
   async init() {
        //地图初始化
        const projection = new Projection({
            code: 'static-image',
            units: 'pixels',
            extent: this.extent,//图片左下角、右上角的坐标
          });
          const imageLayer = this.initImageLayer('imageLayer', this.imgSource);
          const vectorLayer = this.initVectorLayer('vectorLayer');
        // 加载静态图片
        this.map = new Map({
            layers: [imageLayer,vectorLayer],
            target: 'map',
            view: new View({
                projection: projection,
                center: getCenter(this.extent),
            }),
            controls:[new MousePosition()],
            interactions: defaults({ dragPan: false, doubleClickZoom: false }).extend([
                new DragPan({
                  condition: evt => {
                    console.log(evt.originalEvent,'evt.originalEvent.buttons')
                    return evt.originalEvent.buttons === 2 && this.dragFlag
                    }
                })
              ])
          });
          this.fitExtent();
          this.initInteraction();
          this.handleClick();
    }
    handleClick(){
        const _this = this;
        this.map.on('pointermove',function(e){
            if(_this.modifyFeatures && _this.modifyFeatures.length > 0) {
                _this.modifyFeatures.forEach(ele => {
                  const geoType = ele.get('geoType');
                  if(geoType && geoType == 'box') {
                    const modifyGeometry = ele.get('modifyGeometry');
                    const modifyIndex = ele.get('modifyIndex');
                    if(modifyGeometry) {
                      modifyGeometry.setCoordinates([_this.getBoxGeo(modifyGeometry.getCoordinates().flat(), e.coordinate, modifyIndex)]);
                      ele.setGeometry(modifyGeometry)
                      ele.changed();
                    }
                  }
                })
              }
        })
    }
   async initResultVectorLayer() {
        const vectorLayer = this.map.getLayers().getArray().find(layer => layer.className_ === 'vectorLayer');
        const source = vectorLayer.getSource();
        console.log(source,'====')
        const keys = await window.markSave.getKeys('result');
        const features =[];
        for(const key of keys){
            const item = JSON.parse(await window.markSave.get('result',key));
            const objItem = JSON.parse(item)
            const feature = new Feature({
                geometry: new Polygon(JSON.parse(objItem.coordinates)),
            });
            const style = new Style({
                fill: new Fill({
                    color: objItem.color,
                }),
                stroke: new Stroke({
                    color: objItem.color,
                    width: objItem.width,
                })
            });
            feature.setStyle(style);
            features.push(feature);
        }
       console.log(features)
       source.addFeatures(features);
       setTimeout(() => {
           console.log(vectorLayer.getSource(),'1111')
       },100)
    }
    /*
    *添加光标事件
    */
   initVectorLayer(className,color="#f4a460") {
        const fillColor = hexToRgba(color);
        const source = new VectorSource({
            overlaps:false
        });
        const layer = new VectorLayer({
            id: 'vectorLayer',
            className: className || 'vectorLayer',
            source: source,
            style: {
              'fill-color': fillColor,
              'stroke-color': color,
              'stroke-width': 1,
              'circle-radius': 7,
              'circle-fill-color': color
            }
        })
        return layer;
   }

    fitExtent(){
        this.map.getView().fit(this.extent, { duration: 200,callback: (e) => {
            this.initZoom = this.map.getView().getZoom();
            console.log(this.initZoom,'this.initZoom')
       }});
    }
    switchImage({url, width, height}) {
        this.extent = [0, -height, width, 0];
        this.imgWidth = width;
        this.imgHeight = height;
        const projection = new Projection({
            code: 'static-image',
            units: 'pixels',
            extent: this.extent,//图片左下角、右上角的坐标
          });
        const source = new Static({
            url: url,
            projection: projection,
            imageExtent: this.extent
          })
       const layer = this.map.getLayers().getArray().find(layer => layer.className_ === 'imageLayer');
        layer.setSource(source);
        layer.changed()
        return new Promise((resolve, reject) => {
            source.on('imageloadend', res => {
                this.fitExtent();
                resolve(res);
            })
            source.on('imageloaderror', err => {
                reject(err);
            })
        })
    }

    /**
     * @author:liulei
     * @description:清空绘制
     */
    clearDraw(){
        this.draw && this.map.removeInteraction(this.draw);
        this.draw = null;
    }

    // 在图片上绘制
    drawOnImage(type,color){
        // 清除之前的绘制
        this.clearDraw();
        const geometryFunction = getGeometryFunction(this.map,type)
        const source = this.map.getLayers().getArray().find(layer => layer.className_ === 'vectorLayer').getSource();
        
        const draw = new Draw({
            source: source,
            type:'Circle',
            geometryFunction: geometryFunction,
            style: new Style({
                stroke: new Stroke({ color: color, width: 2, lineDash:[10] }),
                fill: new Fill({ color: hexToRgba(color, 0.2) })
              }),
            condition:e=>{
                if(e.originalEvent.buttons == 1){
                    if(e.originalEvent.ctrlKey){
                        return false;
                    }
                    const inImage = pointInPolygon(this.map,e.coordinate);
                    return inImage;
                }else if(e.originalEvent.buttons === 2){
                    return false;
                }
            }
        })
        this.draw = draw;
        this.draw.on('drawend', function (event) {
            const randomColor = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}, 0.7)`;
            const feature = event.feature; // 获取绘制的图形
            const geometry = feature.getGeometry(); // 获取几何对象
            const coordinates = geometry.getCoordinates(); // 获取坐标点数据
            console.log(coordinates,'coordinates')
            // feature.setStyle(new Style({
            //     stroke: new Stroke({ color: randomColor, width: 2 }),
            //     fill: new Fill({ color: randomColor })
            // }));
            const styles = getFeatures({color: randomColor,coordinates:coordinates,text:'水电费是的就发了开始的'})
            feature.setStyle(styles);
            feature.changed();
            const style = feature.getStyle();
            console.log(style,'style')
            console.log(feature,'feature')
            const item = {
                coordinates:JSON.stringify(coordinates),
                color: randomColor,
                width: 1
            }
            window.markSave.set('result',coordinates,JSON.stringify(item));
        });
        this.map.addInteraction(draw);
    }

    initInteraction(){
        this.select = new Select({
            condition: click,
            style: [
                new Style({
                    stroke: new Stroke({ color: 'rgba(0,255,0,1)', width: 2 }),
                    fill: new Fill({ color: 'rgba(0,255,0,0.5)' })
                }), 
                new Style({
                    image: new CircleStyle({
                        radius: 8,
                        stroke: new Stroke({
                          color: 'orange',
                          width: 2
                        })
                      }),
                      geometry: function (feature) {
                        const coordinates = feature.getGeometry().getCoordinates();
                        const geoType = feature.getGeometry().getType();
                        return new MultiPoint(geoType === 'Polygon' ? coordinates[ 0 ] : coordinates);
                      }
                })
            ],
            stopClick: true,
            layers: function (layer) {
                return layer.get('id') == 'vectorLayer';
              },
            hitTolerance: 6,
        });

        this.modify = new Modify({
            // source:
            features: this.select.getFeatures(),
            insertVertexCondition: () => false,//设置为false时，禁止添加节点
        })
       this.modify.on('modifystart', e => {
        let _this = this;
        this.modifyFeatures = [];
            e.features.forEach(feature => {
                feature.set('modifyGeometry', feature.getGeometry().clone(), true);
                feature.set('geoType', 'box', true);
                const modifyIndex = _this.getModifyIndex(feature.getGeometry().getCoordinates().flat(), e.mapBrowserEvent.coordinate);
                feature.set('modifyIndex', modifyIndex, true);
                this.modifyFeatures.push(feature);
            })
       });
       this.modify.on('modifyend', e => {
            let _this = this
            e.features.forEach(function (feature) {
                const geoType = feature.get('geoType');
                // const geo = feature.getGeometry();
                // let coors = geo.getCoordinates();
                if(geoType && geoType == 'box') {
                  feature.unset('modifyGeometry', true);
                }
                // const newCoor = _this.bboxClip(_this.map, coors);
                // geo.setCoordinates(newCoor);
                // feature.setGeometry(geo)
            })
       })
        this.map.getInteractions().extend([ this.select,this.modify ]);
    }
    hightLightFeatures(feature){
        this.select.features_.clear();
        this.select.features_.push(feature);
    }
    getDistance(x1, y1, x2, y2) {
        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      }
    getModifyIndex (featureGeo, point) {
        let minIndex = 0;
        let minDis = 10000;
        for (let index = 0; index < featureGeo.length; index++) {
          const element = featureGeo[ index ];
          if(minDis > this.getDistance(element[ 0 ], element[ 1 ], point[ 0 ], point[ 1 ])) {
            minDis = this.getDistance(element[ 0 ], element[ 1 ], point[ 0 ], point[ 1 ]);
            minIndex = index;
          }
        }
        return minIndex;
      }
      bboxClip = (map, coors) => {
        const layer = map.getLayers().getArray().find(l => l.className_ === 'imageLayer');
        const extent = layer.getSource().getImageExtent();
        const x = extent[ 2 ];
        const y = extent[ 1 ];
        const bbox = [0, 0, Math.abs(x), Math.abs(y)];
        const coor = getPolygonCoor(coors)[ 0 ].map(item => [item[ 0 ], -item[ 1 ]]);
        const poly = turf.polygon([coor]);
        const clipped = turf.bboxClip(poly, bbox);
        const resultCoor = clipped.geometry.coordinates[ 0 ] || [];
        const result = resultCoor.map(item => [item[ 0 ], -item[ 1 ]]);
        return [result];
      }
      getBoxGeo(featureGeo, point, editIndex) {
        // 后续优化为clone方法
        const newGeo = featureGeo.map(coord => [...coord]);
        const indexPoint = [...featureGeo[ editIndex ]];
        for (let index = 0; index < featureGeo.length; index++) {
          const element = featureGeo[ index ];
          if(element[ 0 ] === indexPoint[ 0 ]) {
            element[ 0 ] = point[ 0 ];
          }
          if(element[ 1 ] === indexPoint[ 1 ]) {
            element[ 1 ] = point[ 1 ];
          }
        }
        return featureGeo;
      }
}
export default Mark
