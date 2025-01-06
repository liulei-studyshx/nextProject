/* eslint-disable react/no-children-prop */
"use client";
import { useEffect,useRef,useState } from "react";
import * as THREE from "three";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import '../../style.css'
// 引入CSS2模型对象CSS2DObject
// import { CSS2DObject,CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
const tipsList= [ // 标签数据
  {
      position: { x: -200, y: -4, z: -147 }, // 标签位置
      content: { // 标签内容
          title: "进入厨房", // 标题
          text: "", // 文本内容
          image: 1, // 场景贴图的下标，对应dataList下标
          showTip: false, // 是否展示弹出框
          showTitle: true, // 是否展示提示标题
      },
  },
  {
      position: { x: -100, y: 0, z: -231 },
      content: {
          title: "信息点2",
          text: "77989",
          showTip: true,
          showTitle: false,
      },
  },
  {
      position: { x: 150, y: -50, z: -198 },
      content: {
          title: "信息点3",
          text: "qwdcz",
          showTip: true,
          showTitle: false,
      },
  },
  {
      position: { x: 210, y: 11, z: -140 },
      content: {
          title: "信息点4",
          text: "大豆食心虫侦察十大大苏打大大大大大大大",
          showTip: true,
          showTitle: false,
      },
  },
  {
      position: { x: 208, y: -12, z: 140 },
      content: {
          title: "信息点5",
          text: "eq",
          showTip: true,
          showTitle: false,
      },
  },
  {
      position: { x: 86, y: -9, z: 236 },
      content: {
          title: "进入房间",
          text: "",
          showTip: false,
          showTitle: true,
      },
  },
];
export default function Room() {
    const inliving = useRef(false)
    const tipsSpriteList = useRef([]);
    const [tooltopContent,setTooltopContent] = useState({})
    const [tooltipPosition,setTooltipPosition] = useState({top:'-100%',left:'-100%'})
    const box = useRef(null)
  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    const { scene, renderer, camera,controls } = await import(
      "../threeFactor"
    );
    const axesHelper = new THREE.AxesHelper(30);
    scene.add(axesHelper);


    // 正方形VR看房
    // // 添加立方体
    // const geometry = new THREE.BoxGeometry(10, 10, 10);
    // // 左右、上下、后前
    // const urls = ["4_l", "4_r", "4_u", "4_d", "4_b", "4_f"];
    // const boxMaterial = [];

    // urls.forEach((item,index) => {
    //   // 纹理加载
    //   const texture = new THREE.TextureLoader().load(`/imgs/living/${item}.jpg`);
    //   // 通过旋转修复天花板和地板
    //   if (index == 2 || index == 3) {
    //     texture.rotation = Math.PI;
    //     texture.center = new THREE.Vector2(0.5, 0.5);
    //   }
    //   // 创建材质
    //   boxMaterial.push(new THREE.MeshBasicMaterial({ map: texture }));
    // });
    // const house = new THREE.Mesh(geometry, boxMaterial);
    // // 局部坐标系检测缩放
    // const boxAxesHelper = new THREE.AxesHelper(40);
    // house.add(boxAxesHelper)

    // house.geometry.scale(1, 1, -1);
    // house.geometry.computeVertexNormals();
    // // house.position.set(0,5,0)
    // scene.add(house);
    // camera.position.z = 0.01;

    const texLoader= new THREE.TextureLoader();
    // 球形VR看房
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const rgbeloader = new RGBELoader()
    let sphere = null;
    texLoader.load(`/imgs/hdr/livingRoom.jpg`,texture=>{
      const material = new THREE.MeshBasicMaterial({map:texture})
      sphere = new THREE.Mesh(geometry, material);
      sphere.geometry.scale(1, 1, -1);
      scene.add(sphere);
    });
    camera.position.z = 0.1;
    controls.rotateSpeed = -1;
  
    const tipTexture = new THREE.TextureLoader().load('/imgs/tip.1fcbc2bb.png')
    const tipMaterial = new THREE.SpriteMaterial({map: tipTexture});
    tipsList.forEach(item => {
      const { position, content } = item;
      console.log('position: ', position);
      const { title, text, showTip, showTitle } = content;
      const sprite = new THREE.Sprite(tipMaterial);
      sprite.scale.set(0.06, 0.06, 0.06);
      sprite.position.set(position.x/100, position.y/100, position.z/100);
      sprite.content = content;
      tipsSpriteList.current.push(sprite);
      scene.add(sprite);
    })
    // const sprite = new THREE.Sprite(new THREE.SpriteMaterial({map: tipTexture}));
    // sprite.scale.set(0.06, 0.06, 0.06);
    // sprite.position.set(0, 0, -2);
    // scene.add(sprite);



   
    let plane = null;
    texLoader.load("/imgs/enter.png",texture => {
        const actualWidth = texture.image.width;
        const actualHeight = texture.image.height;
        const planeGeometry = new THREE.PlaneGeometry(actualWidth, actualHeight);
        const planeMaterial = new THREE.MeshBasicMaterial({
            map:texture,
            transparent: true,
            });
        plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(-3.5, 0, -2.5); // 设置平面位置
        plane.scale.set(0.007, 0.007, 0.007); // 设置平面大小
        plane.rotation.set(0, Math.PI / 2, 0); // 设置平面旋转
        scene.add(plane);
    })
    
    // 获取sprite的点击区域
    const raycaster = new THREE.Raycaster();
    raycaster.params.Line.threshold = 0.1;
    const pointer = new THREE.Vector2(); // 创建一个二维向量
   
    const dom = document.querySelector('#three-contain');
    const home = document.querySelector('.home');
    const onMouseDown = (event: MouseEvent<HTMLElement> ) => {
      // 计算鼠标位置
      pointer.x = (event.clientX / dom?.clientWidth) * 2 - 1;
      pointer.y = -((event.clientY - home?.offsetTop) / dom?.clientHeight) * 2 + 1;
      console.log('pointer: ', pointer);
      // 通过鼠标位置和相机计算射线
      raycaster.setFromCamera(pointer, camera);
      const objects = raycaster.intersectObject(plane,true);
      if (objects.length > 0) {
        texLoader.load(inliving.current?'/imgs/hdr/livingRoom.jpg':`/imgs/hdr/kitchen.jpg`,texture=>{
            inliving.current = !inliving.current;
            sphere.material.map = texture;
           if(inliving.current){
            plane.position.set(-3, 0, 2.5);
            plane.rotation.set(0, Math.PI, 0); // 设置平面旋转
            plane.scale.set(0.009, 0.009, 0.009); // 设置平面大小
            
           }else{
            plane.position.set(-3.5, 0, -2.5); // 设置平面位置
            plane.rotation.set(0, Math.PI / 2, 0); // 设置平面旋转
            plane.scale.set(0.007, 0.007, 0.007); // 设置平面大小
           
            }
        })
      }
    }
    document.addEventListener('mousedown',onMouseDown,false);
    renderer.domElement.addEventListener('mousemove',mouseMove,false);

    function mouseMove(event: MouseEvent<HTMLElement>) {
      event.preventDefault();
      // 计算鼠标位置
      pointer.x = (event.clientX / dom?.clientWidth) * 2 - 1;
      pointer.y = -((event.clientY - home?.offsetTop) / dom?.clientHeight) * 2 + 1;
      console.log('pointer: ', pointer);
      // 通过鼠标位置和相机计算射线
      raycaster.setFromCamera(pointer, camera);
      const objects = raycaster.intersectObjects(tipsSpriteList.current,true);
      if(objects.length > 0){
        // 将标签的空间坐标转为屏幕坐标，通过计算赋值给标签的top、left
        let elementWidth = dom.clientWidth / 2;
        let elementHeight = dom.clientHeight / 2;
        let worldVector = new THREE.Vector3(
          objects[0].object.position.x,
          objects[0].object.position.y,
          objects[0].object.position.z
        );
        //世界坐标转换为该相机下的屏幕坐标
        let vector = worldVector.project(camera);
        console.log('vector: ', vector);
        if(objects[0].object.content.showTitle||objects[0].object.content.showTip){
        // x、y的取值范围是【-1,1】而屏幕坐标是正值，标准化坐标是在屏幕中心即dom.clientWidth的一半和dom.clientHeight的一半处，所以需要乘以屏幕的一半
          let x = Math.round(vector.x * elementWidth + elementWidth -box.current?.clientWidth/2);
          let y = Math.round(-vector.y * elementHeight + elementHeight- box.current?.clientHeight/2);
          setTooltipPosition({ top: `${y}px`, left: `${x}px` });
          setTooltopContent(objects[0].object.content);
        }
      }else{
        event.preventDefault();
        setTooltipPosition({
          top: "-100%",
          left: "-100%",
        });
        setTooltopContent({});
      }
    }


    const animation = () => {
      renderer.render(scene, camera);
      window.requestAnimationFrame(animation);
        // 更新 OrbitControls
        controls.update();
        raycaster.setFromCamera(pointer, camera);
       
    };
    animation();
  };
  return (
    <div className="home" >
      <div
        id="three-contain"
        style={{ width: "100%", height: `calc(100vh - 46px)` }}
      ></div>
      <div className="tooltip-box" style={tooltipPosition} >
        <div className="container" ref={box}>
          <div className="title">标题：{ tooltopContent.title }</div>
          <div className="explain">说明：{tooltopContent.text }</div>
        </div>
      </div>
    </div>
  );
}
