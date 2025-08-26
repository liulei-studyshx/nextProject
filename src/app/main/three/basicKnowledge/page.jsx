"use client";

import React,{useEffect} from "react";
import * as THREE from "three";
import { Octree } from 'three/examples/jsm/math/Octree.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OctreeHelper } from 'three/addons/helpers/OctreeHelper.js';
import { Capsule } from 'three/addons/math/Capsule.js';
import * as TWEEN from '@tweenjs/tween.js';

// import { PointOctree } from "sparse-octree";
export default function Page() {
  useEffect(() => {
      init()
  })
  const init = async() => {
    const factor = await import("../threeFactor");
    const {scene, camera, renderer,controls,directionalLight} = factor.threeFactor();
    camera.position.set(20,20,20);
    camera.lookAt(0,0,0);
    const axisHelper = new THREE.AxesHelper(50);
    scene.add(axisHelper);
    /**
     * 向量和标量
     * 向量：有方向的量
     *     例：描述一个人的速度，要知道速度的方向和大小，分别沿x、y、z轴的速度分量
     * 标量：只有大小没有方向的量
    */
    // 1、copy 浅拷贝
    const vector1 = new THREE.Vector3(1, 0, 0);
    const vector1Copy = new THREE.Vector3();
    vector1Copy.copy(vector1);
    console.log(vector1Copy);
    vector1.set(0, 1, 0);
    console.log(vector1Copy,vector1);
    // 2、clone 深拷贝
    const vector2 = new THREE.Vector3(1, 0, 0);
    const vector2Clone = vector2.clone();
    console.log(vector2Clone);

    // 3、add
    const vector3 = new THREE.Vector3(1, 0, 0);
    const vector4 = new THREE.Vector3(0, 1, 0);
    const vector5 = vector3.clone().add(vector4);
    console.log(vector3,vector5);

    // 4、.multiplyScalar() 向量方法.multiplyScalar(50)表示向量x、y、z三个分量和参数分别相乘。
    const start = new THREE.Vector3(1, 1, 0);//起始点
    const v = new THREE.Vector3(1, 1, 0);//x,y,z方向的速度分量
    const walk = v.clone().multiplyScalar(50);//位移量
    const end = start.clone().add(walk);//终点
    console.log('end: ', end);

    // 5、距离
    const vector6 = new THREE.Vector3(1, 1, 0);
    const vector7 = new THREE.Vector3(2, 2, 0);
    const distance = vector6.clone().distanceTo(vector7);
    const length = vector6.clone().sub(vector7).length();
    console.log('length: ', length);
    console.log('distance: ', distance);

    // 6、normalize() 归一化，将向量长度变为1
    const vector8 = new THREE.Vector3(1, 1, 0);
    const vector9 = new THREE.Vector3(0, 0, 0);
    const AB = vector8.clone().sub(vector9);
    AB.normalize();// AB归一化表示向量方向

    // 7、沿着xyz轴方向分表移动100的距离
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);
    //通过add的方式移动cube
    // cube.position.add(AB.normalize().clone().multiplyScalar(10));
    // 通过translateOnAxis移动cube 沿着AB的方向移动10的距离
    cube.translateOnAxis(AB.normalize().clone(), 10);
    // scene.add(cube);

    // 8、相机的方向
    const cameraDir = new THREE.Vector3();
    camera.getWorldDirection(cameraDir)
    console.log(cameraDir);


    // 9、物体运动
    const sp = new THREE.SphereGeometry(1, 32, 32);
    const sm = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const sphere = new THREE.Mesh(sp, sm);
    sphere.position.set(0, 0, 0);
    // scene.add(sphere);

    const clock = new THREE.Clock();
    // const speed =  new THREE.Vector3(1, 1, 0);
    // let t = 0;
    // const pos0 = sphere.position.clone();
    let angle = 0;


    // 10、判断点是否在扇形内
    /*
    请参考以下扇形范围图：
     /public/点是否在扇形内.png
    */
    const inSector = (point)=>{
        const a = new THREE.Vector3(0, 2, 0);
        const b = new THREE.Vector3(2, 2, 0);
        const person = new THREE.Vector3(1, 0, 0);
        // 计算abMid的中点
        const abMid = a.clone().add(b).multiplyScalar(0.5);
        // abMid到person的方向向量
        const abMidToPersonDir = abMid.clone().sub(person).normalize();
        // person到a和b的夹角
        const apersonangle = a.clone().sub(person).normalize().dot(abMidToPersonDir);
        // 点到人的向量
        const pointPerson = point.clone().sub(person);
        let ins = false;
        // 半径长度
        const r = abMid.clone().sub(person).length();
        // 点到人的长度
        const pointlength = pointPerson.length();
        // 如果点到人的长度大于半径长度，则不在扇形内
        if(pointlength > r){
            ins = false;
        }else{
            // 点乘返回的是cos，cos的特性扇形夹角小于180是
            const angle = pointPerson.clone().normalize().dot(abMidToPersonDir);
            if(angle > apersonangle){
                ins = true;
            }else{
                ins = false;
            }
        }
        return ins;
    }
    console.log(inSector(new THREE.Vector3(1,3,0)))


    // 11、箭头 ArrowHelper
    const vectorArrow1 = new THREE.Vector3(50, 0, 0);
    const vectorArrow2 = new THREE.Vector3(30, 0, 30);
    const origin = new THREE.Vector3(0,0,0)

    const arrowa = new THREE.ArrowHelper(vectorArrow1.clone().normalize(), origin, vectorArrow1.length(), 0xffff00);
    const arrowb = new THREE.ArrowHelper(vectorArrow2.clone().normalize(), origin, vectorArrow2.length(), 0x00ff00);
    // scene.add(arrowa);
    // scene.add(arrowb);
    let arrowc = new THREE.Vector3();
    arrowc.crossVectors(vectorArrow1, vectorArrow2);
    const arrowd = new THREE.Vector3();
    arrowd.crossVectors(vectorArrow2, vectorArrow1);
    console.log('arrowc: ', arrowc);
    console.log('arrowd: ', arrowd);
    const arrowHelperC = new THREE.ArrowHelper(arrowc.clone().normalize(), origin, arrowc.length(), 0xff0000);
    // scene.add(arrowHelperC)
    


    // 12、判断两个点是否在线段同一侧
    // 已知条件
    // 一条线段两点坐标A、B
    const A = new THREE.Vector3(0, 0, 10);
    const B = new THREE.Vector3(100, 0, 10);

    // 判断p1、p2两点位于线段AB同一侧，还是异侧
    const p1 = new THREE.Vector3(20, 0, 40);
    // const p2 = new THREE.Vector3(80, 0, 40);//与p1同侧
    const p2 = new THREE.Vector3(80, 0, -30);//与p1异侧

    const a1 = p1.clone().sub(A);
    const b1 = p1.clone().sub(B);
    const a2 = p2.clone().sub(A);
    const b2 = p2.clone().sub(B);
    const c1 = a1.clone().cross(b1);
    const c2 = a2.clone().cross(b2);

    const cos = c1.normalize().dot(c2.normalize());
    // p2 为new THREE.Vector3(80, 0, 40) cos的值为1，说明p1、p2两点位于线段AB同一侧
    console.log('cos: ', cos);


    // 13、矩阵
    // 13.1、矩阵平移
    const matrix = new THREE.Matrix4();
    matrix.elements = [
        1,0,0,0, 
        0,1,0,0, 
        0,0,1,0, 
        50, 0, 0, 1];
    const vectorM = new THREE.Vector3(50, 0, 0);
    console.log(vectorM);
    vectorM.applyMatrix4(matrix);//vectorM向右移动了50个单位
    console.log(vectorM);
    const positionM = new THREE.Vector3(), quaternionM = new THREE.Quaternion(), scaleM = new THREE.Vector3();
    matrix.decompose(positionM, quaternionM, scaleM);
    console.log(positionM, quaternionM, scaleM);

    // 13.2、矩阵缩放
    const vectorMS = new THREE.Vector3(50, 0, 0);
    const matrix2 = new THREE.Matrix4();
    console.log(matrix2.elements,'matrix2.elements) before');
    matrix2.makeScale(3, 3, 3);
    console.log(matrix2.elements,'matrix2.elements) after');
    vectorMS.applyMatrix4(matrix2);
    console.log(vectorMS,'vectorMS');

    // 13.3、矩阵旋转
    const vectorRotate = new THREE.Vector3(50, 0, 0);
    const matrix3 = new THREE.Matrix4();
    matrix3.makeRotationZ(Math.PI/2);
    vectorRotate.applyMatrix4(matrix3);
    console.log(vectorRotate,'vectorRotate');
    // 13.4、矩阵乘法 （矩阵相乘的顺序很重要）旋转后平移和平移后旋转的结果不一样
    const vectorM4 = new THREE.Vector3(50, 0, 0);
    const T = new THREE.Matrix4();
    T.makeTranslation(50, 0, 0);
    const R = new THREE.Matrix4();
    R.makeRotationZ(Math.PI/2);
    // const multiMatrix = T.multiply(R);//复合矩阵，先旋转后平移
    // vectorM4.applyMatrix4(multiMatrix);
    vectorM4.applyMatrix4(R);
    vectorM4.applyMatrix4(T);
    console.log(vectorM4,'vectorM4');

    // const vectorM5 = new THREE.Vector3(100, 0, 0);
    // vectorM5.applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI/2);
    // console.log(vectorM5,'vectorM5');
    // 14 合并 近乎平行、点数不同、相距一定距离的两条线
    function getAngle(v1, v2) {
      let dot = v1[0] * v2[0] + v1[1] * v2[1]; // 点积
      let mag1 = Math.hypot(v1[0], v1[1]); // 向量 1 模长
      let mag2 = Math.hypot(v2[0], v2[1]); // 向量 2 模长
      return Math.acos(dot / (mag1 * mag2)) * (180 / Math.PI); // 计算角度（单位：度）
  }
  
  // 判断两条线是否近乎平行
  function isParallel(line1, line2, threshold = 5) {
      let v1 = [line1[line1.length - 1][0] - line1[0][0], line1[line1.length - 1][1] - line1[0][1]];
      let v2 = [line2[line2.length - 1][0] - line2[0][0], line2[line2.length - 1][1] - line2[0][1]];
      return getAngle(v1, v2) < threshold;
  }
  
  // 线性插值：让两条线的点数相等（取最长的点数）
  function resampleLine(line, targetCount) {
      let curve = new THREE.CatmullRomCurve3(line.map(p => new THREE.Vector3(p[0], p[1], 0)));
      return curve.getPoints(targetCount - 1).map(p => [p.x, p.y]);
  }
  
  // 计算合并线
  function mergeParallelLines(line1, line2) {
      if (!isParallel(line1, line2)) {
          console.warn("两条线段不是近乎平行的，无法合并！");
          return null;
      }
  
      let maxLength = Math.max(line1.length, line2.length);
      let resampled1 = resampleLine(line1, maxLength);
      let resampled2 = resampleLine(line2, maxLength);
  
      let mergedLine = [];
      for (let i = 0; i < maxLength; i++) {
          let midX = (resampled1[i][0] + resampled2[i][0]) / 2;
          let midY = (resampled1[i][1] + resampled2[i][1]) / 2;
          mergedLine.push([midX, midY]);
      }
      return mergedLine;
  }
  

    
    // 示例数据：两条近似平行的线
    let lineA = [[0, 0], [2, 1], [15, 20], [30, 30]];
    let lineB = [[2, 1], [7, 11], [18, 21], [28, 29], [35, 35]];
    const lineAGeometry = new THREE.BufferGeometry().setFromPoints(lineA.map(p => new THREE.Vector3(p[0], p[1], 0)));
    const lineAMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const lineAObject = new THREE.Line(lineAGeometry, lineAMaterial);
    scene.add(lineAObject);

    const lineBGeometry = new THREE.BufferGeometry().setFromPoints(lineB.map(p => new THREE.Vector3(p[0], p[1], 0)));
    const lineBMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    const lineBObject = new THREE.Line(lineBGeometry, lineBMaterial);
    scene.add(lineBObject);
    // 1️⃣ 先合并平行线
    let mergedLine = mergeParallelLines(lineA, lineB);
  console.log("合并后的线1:", mergedLine);
    
    

    const lineMergerGeometry = new THREE.BufferGeometry().setFromPoints(mergedLine.map(p => new THREE.Vector3(p[0], p[1], 0)));
    const lineMergerMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const lineMergerObject = new THREE.Line(lineMergerGeometry, lineMergerMaterial);
    scene.add(lineMergerObject);

    // 15八叉树
    const worldOctree = new Octree();
    const loaderGlb = new GLTFLoader();
    loaderGlb.load('/model/Xbot.glb', (gltf) => {
      worldOctree.fromGraphNode(gltf.scene);
      console.log(worldOctree,'worldOctree');
      scene.add(gltf.scene);
        const octreeHelper = new OctreeHelper(worldOctree);
        scene.add(octreeHelper);
       
    })

    // 胶囊几何体
    const r = 0.4;//胶囊半径
    const H = 1.7;//胶囊总高度
    const startc = new THREE.Vector3(0, r, 0);//底部半球球心坐标
    const endc = new THREE.Vector3(0, H - r, 0);//顶部半球球心坐标
    const capsule = new Capsule(startc, endc, r);
    console.log('capsule', capsule);
    // scene.add(capsule);


    const boxGeometry = new THREE.BoxGeometry(2,3,4);
    const boxMaterial = new THREE.MeshBasicMaterial({
      color: 0x0000ff, 
      transparent: true,
      opacity: 0.2,
    });

    const mesh = new THREE.Mesh(boxGeometry, boxMaterial);
    const edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    mesh.add(edges);
    // mesh.scale.set(2,3,4);
    mesh.position.set(0,0,10);
    scene.add(mesh);
    // 使用设置动画
    // new TWEEN.Tween(mesh.position)
    //   .to({x:2,y:3,z:4}, 2000)
    //   .repeat(Infinity)
    //   .yoyo(true)
    //   .start();

    const rotation = new THREE.AnimationClip('rotate', -1, [
      new THREE.KeyframeTrack('.rotation[z]', [0, 1, 2], [0, Math.PI, Math.PI * 2]),
    ]);
    
    // 创建 AnimationMixer 控制动画
    const mixer = new THREE.AnimationMixer(mesh);
    mixer.clipAction(rotation).play();
    console.log('mesh.animations', mesh.animations);

    //将世界坐标转为局部坐标
    const worldToLocalOne = () => {
      const vec = new THREE.Vector3(4,2,6);
      console.log('局部坐标系', mesh.worldToLocal(vec));
    }
    const worldToLocalTwo = () => {
      const vec = new THREE.Vector3(4,2,6);
      const inverseMatrix = new THREE.Matrix4();
      inverseMatrix.copy(mesh.matrixWorld).invert(); 
      const localVec = vec.clone().applyMatrix4(inverseMatrix);
      console.log('局部坐标系', localVec);
            // {
            //   "x": 2,
            //   "y": 0.6666666666666666,
            //   "z": -1
            // }
    }
    worldToLocalOne()
    worldToLocalTwo()


    const geometryPoint = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      0, 0, 0, // 点 1
      1, 1, 1, // 点 2
      -1, -1, -1, // 点 3
      2, 2, 2, // 点 4
    ]);
    // const vertices = new Float32Array([10, 0, 0]); // 定义点的坐标
    geometryPoint.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    // 创建一个点的材质（设置颜色为红色）
    const materialPoint = new THREE.PointsMaterial({ color: 0xff0000, size: 5 });

    // 创建点对象
    const point = new THREE.Points(geometryPoint, materialPoint);
    scene.add(point);

    const box33 = new THREE.Box3();
    box33.setFromObject(point);
    const boxHelper = new THREE.Box3Helper(box33, 0xffff00);
    scene.add(boxHelper);






















    const animate = () => {
        // angle+= 0.00005;
        // // 绕z轴旋转
        // const y = 10 * Math.sin(angle);
        // const x = 10 * Math.cos(angle);
        // sphere.position.set(x,y,0);


        // 相机绕着圆心旋转
        // angle+= 0.00005;
        // const R = 10;
        // camera.position.x = R * Math.cos(angle);
        // camera.position.z = R * Math.sin(angle);
        // camera.lookAt(0,0,0);



    //   const time = clock.getDelta();
    //   t += time;
    //   console.log('t: ', t);
    //   const dis = speed.clone().multiplyScalar(t);
    //   sphere.position.copy(pos0.clone().add(dis));

      // 添加边框的box
     
      // TWEEN.update();
      
      // 更新动画器
      // mixer.update(0.01);
      
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update();
    }
    renderer.setAnimationLoop(animate)

  }
  return (
    <div
      id="three-contain"
      style={{ width: "100%", height: `calc(100vh - 46px)` }}
    />
  );
}
