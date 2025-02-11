/* eslint-disable react/no-children-prop */
'use client'
import { useEffect } from "react"
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

export default function BlendingAnimation() {
    useEffect(() => {
       init()
    },[])
    const init = async() => {
        const factor = await import("../threeFactor");
        const {scene, camera, renderer,controls,directionalLight} = factor.threeFactor();
        const clock = new THREE.Clock();
        let model = null,stats = null,gui = null,skeleton=null,mixer;
        let currentBaseAction = 'idle';
        let numAnimations = 0;
        const allActions = [];
        const baseActions = {
            idle: { weight: 1 },
            walk: { weight: 0 },
            run: { weight: 0 }
        };
        const additiveActions = {
            sneak_pose: { weight: 0 },
            sad_pose: { weight: 0 },
            agree: { weight: 0 },
            headShake: { weight: 0 }
        };

        camera.position.set( - 1, 2, 3 );

        controls.enablePan = false;
		controls.enableZoom = false;
        controls.target.set( 0,1,0);
        controls.update();

        scene.background = new THREE.Color( 0xa0a0a0 );
        scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x8d8d8d, 3 );
        hemiLight.position.set( 0, 20, 0 );
        scene.add( hemiLight );

        directionalLight.position.set( 3, 10, 10 );
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.top = 2;
        directionalLight.shadow.camera.bottom = - 2;
        directionalLight.shadow.camera.left = - 2;
        directionalLight.shadow.camera.right = 2;
        directionalLight.shadow.camera.near = 0.1;
        directionalLight.shadow.camera.far = 40;
        scene.add( directionalLight );

        // ground

        const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0xcbcbcb, depthWrite: false } ) );
        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;
        scene.add( mesh );

        // const cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:0xff0000}));
        // cube.position.set(4.5,0,0);
        // scene.add(cube);

        // const axesHelper = new THREE.AxesHelper(4);
        // scene.add(axesHelper);

        const loader = new GLTFLoader();
        loader.load('/model/Xbot.glb',(gltf)=>{
            model = gltf.scene;
            scene.add( model );

            model.traverse( function ( object ) {
                if ( object.isMesh ) object.castShadow = true;
            });
            // 模型的骨骼
            skeleton = new THREE.SkeletonHelper( model );
            skeleton.visible = false;
            scene.add( skeleton );

            // 模型动画
            const animations = gltf.animations;
            mixer = new THREE.AnimationMixer( model );
            numAnimations = animations.length;
            for ( let i = 0; i < numAnimations; i ++ ) {
                let clip = animations[ i ];
                const name = clip.name;
                if(baseActions[name]){
                    const action = mixer.clipAction( clip );
                    activateAction(action);
                    baseActions[name].action = action;
                    allActions.push(action);
                }else if ( additiveActions[ name ] ) {

                    // Make the clip additive and remove the reference frame

                    THREE.AnimationUtils.makeClipAdditive( clip );

                    if ( clip.name.endsWith( '_pose' ) ) {

                        clip = THREE.AnimationUtils.subclip( clip, clip.name, 2, 3, 30 );

                    }

                    const action = mixer.clipAction( clip );
                    activateAction( action );
                    additiveActions[ name ].action = action;
                    allActions.push( action );

                }
            }
            // renderer.setAnimationLoop( animate );
        })
        function activateAction( action ) {
            const clip = action.getClip();
            const settings = baseActions[ clip.name ] || additiveActions[ clip.name ];
            setWeight(action, settings.weight);
            action.play();
        }
        function setWeight(action, weight){
            action.enabled = true;
            action.setEffectiveWeight(weight);
            action.setEffectiveTimeScale(1)
        }
        stats = new Stats();
        document.body.appendChild( stats.dom );
        const animation = () => {
            requestAnimationFrame(animation)
            stats.update();


            for ( let i = 0; i !== numAnimations; ++ i ) {

                const action = allActions[ i ];
                const clip = action.getClip();
                const settings = baseActions[ clip.name ] || additiveActions[ clip.name ];
                settings.weight = action.getEffectiveWeight();

            }

            // Get the time elapsed since the last frame, used for mixer update

            const mixerUpdateDelta = clock.getDelta();
            

            // Update the animation mixer, the stats panel, and render this frame
            if ( mixer ) {
                mixer.update( mixerUpdateDelta );
            }
            renderer.render(scene, camera)

        }
        renderer.setAnimationLoop(animation)
    }
    return <div
    id="three-contain"
    style={{ width: "100%", height: `calc(100vh - 46px)` }}
    />
}