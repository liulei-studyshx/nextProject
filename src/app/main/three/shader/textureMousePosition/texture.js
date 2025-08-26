import * as THREE from 'three'

export default class Textures{
    constructor(props){
      this.scene = null;
      this.renderer = null;
      this.camera = null;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas = props.canvas;
      this.light = null;
      this.init();

    }
    init(){
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.canvas.appendChild(this.renderer.domElement);
        this.camera = new THREE.OrthographicCamera(this.width / -2, this.width / 2, this.height / 2, this.height / -2, 0.1, 10);
        this.camera.position.z = 1;
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(ambientLight);
        this.addPlane();
        this.animation();
    }
    addPlane(){
        const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xff0000
        });
        const plane = new THREE.Mesh(geometry, material);
        this.scene.add(plane);
    }
    animation(){
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animation.bind(this));
    }
  
}
