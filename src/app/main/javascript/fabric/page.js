'use client'
import { useEffect, useState } from 'react'
import * as fabric from 'fabric';
import Cube from './Cube'

export default function Fabric() {
    useEffect(()=>{
        initCanvas()
    },[])
    const initCanvas = ()=>{
        const canvas = new fabric.Canvas('fabric-canvas', {
            width: 800,
            height: 600,
            backgroundColor: '#ff0000'
        })
        const rect = new fabric.Rect({
            left:50,
            tip:100,
            width:100,
            height:100,
            fill:'blue',
            angle:45
        })
        rect.set('id','rect_red')
        rect.animate({ angle:405  }, {
            onChange: ()=> canvas.requestRenderAll(),
            duration: 3000,
            easing: fabric.util.ease.easeOutBounce
          });
        canvas.add(rect)
        
        // canvas.renderAll()
        // const frontFace = [
        //     { x: 150, y: 150 },
        //     { x: 350, y: 150 },
        //     { x: 350, y: 350 },
        //     { x: 150, y: 350 }
        //   ];
      
        //   const topFace = [
        //     { x: 150, y: 150 },
        //     { x: 200, y: 100 },
        //     { x: 400, y: 100 },
        //     { x: 350, y: 150 }
        //   ];
      
        //   const sideFace = [
        //     { x: 350, y: 150 },
        //     { x: 400, y: 100 },
        //     { x: 400, y: 300 },
        //     { x: 350, y: 350 }
        //   ];
      
        //   // 绘制立方体的前面
        //   const front = new fabric.Polygon(frontFace, {
        //     stroke: 'blue',
        //     selectable: false
        //   });
        //   canvas.add(front);
      
        //   // 绘制立方体的顶部
        //   const top = new fabric.Polygon(topFace, {
        //     stroke: 'green',
        //     selectable: false
        //   });
        //   canvas.add(top);
      
        //   // 绘制立方体的侧面
        //   const side = new fabric.Polygon(sideFace, {
        //     stroke: '#ffff00',
        //     selectable: false,
        //   });
        //   canvas.add(side);
        // //   const polygonLines = [
        // //     {
        // //         "x": -136.56597872954254,
        // //         "y": 90.72431770653255,
        // //         "num": 0
        // //     },
        // //     {
        // //         "x": 21.697444832711067,
        // //         "y": 70.94229085499761,
        // //         "num": 1
        // //     },
        // //     {
        // //         "x": 55.1439257052275,
        // //         "y": 70.61039682919497,
        // //         "num": 2
        // //     },
        // //     {
        // //         "x": -31.200897261503766,
        // //         "y": 90.05333361299043,
        // //         "num": 3
        // //     },
        // //     {
        // //         "x": -136.56597872954254,
        // //         "y": 90.72431770653255,
        // //         "num": 4
        // //     },
        // //     {
        // //         "x": -259.8490607854798,
        // //         "y": -5.736561612790838,
        // //         "num": 5
        // //     },
        // //     {
        // //         "x": 12.732188562225923,
        // //         "y": 46.47693014582344,
        // //         "num": 6
        // //     },
        // //     {
        // //         "x": 50.207973129699184,
        // //         "y": 45.930514873354475,
        // //         "num": 7
        // //     },
        // //     {
        // //         "x": -100.64760699297777,
        // //         "y": -9.846983657245039,
        // //         "num": 8
        // //     },
        // //     {
        // //         "x": -259.8490607854798,
        // //         "y": -5.736561612790838,
        // //         "num": 9
        // //     },
        // //     {
        // //         "x": -100.64760699297777,
        // //         "y": -9.846983657245039,
        // //         "num": 10
        // //     },
        // //     {
        // //         "x": -31.200897261503766,
        // //         "y": 90.05333361299043,
        // //         "num": 11
        // //     },
        // //     {
        // //         "x": 55.1439257052275,
        // //         "y": 70.61039682919497,
        // //         "num": 12
        // //     },
        // //     {
        // //         "x": 50.207973129699184,
        // //         "y": 45.930514873354475,
        // //         "num": 13
        // //     },
        // //     {
        // //         "x": 12.732188562225923,
        // //         "y": 46.47693014582344,
        // //         "num": 14
        // //     },
        // //     {
        // //         "x": 21.697444832711067,
        // //         "y": 70.94229085499761,
        // //         "num": 15
        // //     }
        // // ];
        // // const dashLineMaterial = {
        // //     fill: '',
        // //     strokeWidth: 1,
        // //     selectable: false,
        // //     hasBorders: false,
        // //     hasControls: false,
        // //     originX: 'center', //水平剧中
        // //     originY: 'center' //垂直居中
        // //   }
        // // const polyline = new fabric.Polyline(polygonLines, { ...dashLineMaterial });
        // // canvas.add(polyline);
        const demoImg = 'https://cdn.pixabay.com/photo/2017/08/30/17/26/please-2697951_1280.jpg';
        const img = new Image();
        img.src = demoImg;
        img.onload = () => {
            const oImg = new fabric.Image(img);
            // oImg.scale(0.1) // 缩放
            oImg.set({
                left: 100,
                top: 100,
                opacity: 0.85,
                scaleX: 0.1,
                scaleY: 0.1
            })
            oImg.set({ selectable: true });
            oImg.set('id','image_demoImg')
            canvas.add(oImg) // 将图片加入到画布
            canvas.renderAll(); 
            const obj = canvas.getObjects().find(o => o.id === 'triangle_demo');
            canvas.bringObjectForward(obj)
            canvas.renderAll();
        }
        // 三角形
        const triangle = new fabric.Triangle({
            left: 100,
            top: 100,
            width: 80,
            height: 40,
            fill: "blue",
          });
          triangle.id = 'triangle_demo';
        canvas.add(triangle);
        canvas.renderAll();
       //
       const cubePoints = [
        { x: 50, y: 50 },  // 前面左上 (P0)
        { x: 150, y: 50 }, // 前面右上 (P1)
        { x: 150, y: 150 },// 前面右下 (P2)
        { x: 50, y: 150 }, // 前面左下 (P3)
        { x: 80, y: 80 },  // 后面左上 (P4)
        { x: 180, y: 80 }, // 后面右上 (P5)
        { x: 180, y: 180 },// 后面右下 (P6)
        { x: 80, y: 180 }  // 后面左下 (P7)
    ];
       const cuber = new Cube({canvas})
       console.log(cuber)
       cuber.initPoints(cubePoints)
       cuber.drawCube()
       console.log(canvas.getObjects(),canvas.getObjects().find(i=>i.id ==='cube_group'))
       const cubeObjects = canvas.getObjects().find(i=>i.id ==='cube_group');
       console.log(cubeObjects.getBoundingRect())

    }
    return <canvas id='fabric-canvas' />
}