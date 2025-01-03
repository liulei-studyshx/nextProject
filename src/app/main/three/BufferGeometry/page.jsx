
'use client'
import { useEffect } from 'react'
import * as THREE from 'three'

export default function Page() {
  useEffect(() => {
    init()
  }, [])
  const init = async() => {
     const {renderer, scene, camera, controls} = await import('../threeFactor');
     const geometry = new THREE.BufferGeometry();
     camera.position.z = 5;
    // 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
    // 因为在两个三角面片里，这两个顶点都需要被用到。
    const vertices = new Float32Array( [
        -1.0, -1.0,  1.0,
        1.0, -1.0,  1.0,
        1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
    ] );

    // itemSize = 3 因为每个顶点都是一个三元组。
    const colors = new Float32Array([
        0, 1, 0,  // 点 1 初始颜色（绿色）
        0, 1, 0,  // 点 2 初始颜色（绿色）
        0, 1, 0,  // 点 3 初始颜色（绿色）
        0, 1, 0,  // 点 4 初始颜色（绿色）
    ]);
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial( { size: 0.10, vertexColors: true,} );
    const mesh = new THREE.Points( geometry, material );
    const box = new THREE.BoxHelper( mesh, 0xffff00 );
    scene.add( box );
    scene.add( mesh );

    geometry.getAttribute('color').setXYZ(3, 0, 0, 1);
    geometry.getAttribute('color').needsUpdate = true;
    const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    scene.add(cube);
    // 点选
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const onPointerMove = ( event ) => {
        const dom = document.getElementById('three-contain')
      // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
      mouse.x = ( event.clientX / dom.clientWidth ) * 2 - 1;
      mouse.y = - ( (event.clientY - dom.offsetTop) / dom.clientHeight ) * 2 + 1;
      raycaster.setFromCamera( mouse, camera );
      const intersects = raycaster.intersectObjects( [mesh,cube ]);
      console.log('intersects: ', intersects);
      if ( intersects.length == 0 ) {
          return;
      }
      //只有bufferGeometry 存在index  
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      geometry.getAttribute('color').setXYZ(intersects[0].index, 0, 0, 1);
      geometry.getAttribute('color').needsUpdate = true;
    }
    window.addEventListener( 'mousedown', onPointerMove );
    const animation = () => {
      requestAnimationFrame(animation)
      renderer.render(scene, camera)
      raycaster.setFromCamera( mouse, camera );
      controls.update()
    }
    animation()
  }
  return  <div
    id="three-contain"
    style={{ width: "100%", height: `calc(100vh - 46px)` }}
    />
}