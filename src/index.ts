
import { KeyDisplay } from './utils';
import { CharacterControls } from './characterControls';
import * as THREE from 'three'
import { CameraHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
import { cityActions } from './cityActions';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass'

// Use the `sandImage` in your code as needed


// SCENE
const textureLoader = new THREE.TextureLoader();
const scene = new THREE.Scene();
scene.background = textureLoader.load("textures/background-texture/gray_yellow.jpg");

// CAMERA
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 5;
camera.position.z = 5;
camera.position.x = 0;

// RENDERER

const renderer = new THREE.WebGLRenderer({ antialias: true ,});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true
const composer = new EffectComposer(renderer);
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.6,
    0.1,
    0.1
);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(bloomPass)

// CONTROLS
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true
orbitControls.minDistance = 5
orbitControls.maxDistance = 15
orbitControls.enablePan = false
orbitControls.maxPolarAngle = Math.PI / 2 - 0.05
orbitControls.update();

// LIGHTS
light()

function light() {
    //scene.add(new THREE.AmbientLight(0xffffff, 4))
    //const light = new THREE.HemisphereLight('#EFF4F7', '#EFF4F7', 3);
    //scene.add( light );

    //scene.add( lightx );
    const dirLight = new THREE.DirectionalLight('#e9e9e9', 0.8)


    dirLight.position.set(40, 30, 55);
    dirLight.castShadow = true;
    dirLight.shadow.bias = -0.001
    dirLight.shadow.camera.top = 50;
    dirLight.shadow.camera.bottom = - 50;
    dirLight.shadow.camera.left = - 50;
    dirLight.shadow.camera.right = 50;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 200;
    dirLight.shadow.mapSize.width = 4096;
    dirLight.shadow.mapSize.height = 4096;
    scene.add(dirLight);
    //scene.add(dirLight_2);
    //scene.add(dirLight_3);
    //scene.add(dirLight_4);
    // scene.add( new THREE.CameraHelper(dirLight.shadow.camera))
}

// FLOOR
// generateFloor()
generateCity()
generateCitizen()

var warrior_robot: cityActions
var home_robot: cityActions
var rocket_robot:cityActions
var engineer_robot:cityActions
var engineer_robot_b:cityActions
var engery_cube:cityActions
var playground_2:cityActions
var engineer_robot_c: cityActions
var engineer_robot_d: cityActions
var walking_engineer: cityActions
var walking_engineer_2: cityActions
var walking_engineer_3: cityActions
var walking_engineer_4: cityActions
function generateCitizen(){
    // Citizen 1
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('models/robot_warrior_lowpoly.glb', function(gltf) {
        const model = gltf.scene;
        model.traverse(function (object: any) {
            if (object.isMesh) {
                object.castShadow = true;
                //object.material.wireframe = true;
            }
        });
        model.scale.set(0.001,0.001,0.001)
        model.position.set(11, 0, 11)
        scene.add(model);

        const gltfAnimations: THREE.AnimationClip[] = gltf.animations;
        const mixer = new THREE.AnimationMixer(model);
        const animationsMap: Map<string, THREE.AnimationAction> = new Map()

        gltfAnimations.forEach((a: THREE.AnimationClip) => {
            animationsMap.set(a.name, mixer.clipAction(a))
        })

        animationsMap.forEach((value, key) => {
            value.play()
        })
        
        warrior_robot = new cityActions(model, mixer, animationsMap)
    });

    // Citizen 2
    gltfLoader.load('models/cute_home_robot.glb', function(gltf) {
        const model = gltf.scene;
        model.traverse(function (object: any) {
            if (object.isMesh) {
                object.castShadow = true;
                //object.material.wireframe = true;
            }
        });
        model.scale.set(1,1,1);
        model.position.set(8, -0.1, -14);
        scene.add(model);

        const gltfAnimations: THREE.AnimationClip[] = gltf.animations;
        const mixer = new THREE.AnimationMixer(model);
        const animationsMap: Map<string, THREE.AnimationAction> = new Map()

        gltfAnimations.forEach((a: THREE.AnimationClip) => {
            animationsMap.set(a.name, mixer.clipAction(a))
        })

        animationsMap.forEach((value, key) => {
            value.play()
        })
        
        home_robot = new cityActions(model, mixer, animationsMap)
    });

    // Citizen 3
    gltfLoader.load('models/robot_rocket.glb', function(gltf) {
        const model = gltf.scene;
        model.traverse(function (object: any) {
            if (object.isMesh) {
                object.castShadow = true;
                //object.material.wireframe = true;
            }
        });
        model.scale.set(0.5,0.5,0.5);
        model.position.set(11, 0.7, -14);
        scene.add(model);

        const gltfAnimations: THREE.AnimationClip[] = gltf.animations;
        const mixer = new THREE.AnimationMixer(model);
        const animationsMap: Map<string, THREE.AnimationAction> = new Map()

        gltfAnimations.forEach((a: THREE.AnimationClip) => {
            animationsMap.set(a.name, mixer.clipAction(a))
        })

        animationsMap.forEach((value, key) => {
            value.play()
        })
        
        rocket_robot = new cityActions(model, mixer, animationsMap)
    });

        // Citizen 4
        gltfLoader.load('models/obot_-_cute_robot_challenge.glb', function(gltf) {
            const model = gltf.scene;
            model.traverse(function (object: any) {
                if (object.isMesh) {
                    object.castShadow = true;
                    //object.material.wireframe = true;
                }
            });
            model.scale.set(3,3,3);
            model.position.set(3, 2, -10);
            model.rotation.y = Math.PI / 2;
            scene.add(model);
    
            const gltfAnimations: THREE.AnimationClip[] = gltf.animations;
            const mixer = new THREE.AnimationMixer(model);
            const animationsMap: Map<string, THREE.AnimationAction> = new Map()
    
            gltfAnimations.forEach((a: THREE.AnimationClip) => {
                animationsMap.set(a.name, mixer.clipAction(a))
            })
    
            animationsMap.forEach((value, key) => {
                value.play()
            })
            
            engineer_robot = new cityActions(model, mixer, animationsMap)
        });    

        //Citizen 4.a engineer
        gltfLoader.load('models/obot_-_cute_robot_challenge.glb', function(gltf) {
            const model = gltf.scene;
            model.traverse(function (object: any) {
                if (object.isMesh) {
                    object.castShadow = true;
                    //object.material.wireframe = true;
                }
            });
            model.scale.set(3,3,3);
            model.position.set(0.8, 2, -10);
            model.rotation.y = Math.PI / 2;
            scene.add(model);
    
            const gltfAnimations: THREE.AnimationClip[] = gltf.animations;
            const mixer = new THREE.AnimationMixer(model);
            const animationsMap: Map<string, THREE.AnimationAction> = new Map()
    
            gltfAnimations.forEach((a: THREE.AnimationClip) => {
                animationsMap.set(a.name, mixer.clipAction(a))
            })
    
            animationsMap.forEach((value, key) => {
                value.play()
            })
            
            engineer_robot_b = new cityActions(model, mixer, animationsMap)
        });    

        //robot_playground  
        gltfLoader.load('models/robot_playground.glb', function(gltf) {
            const model = gltf.scene;
            model.traverse(function (object: any) {
                if (object.isMesh) {
                    object.castShadow = true;
                    //object.material.wireframe = true;
                }
            });
            model.scale.set(3,3,3);
            model.position.set(-5, 3, 0);
            //model.rotation.y = Math.PI / 2;
            scene.add(model);
    
            const gltfAnimations: THREE.AnimationClip[] = gltf.animations;
            const mixer = new THREE.AnimationMixer(model);
            const animationsMap: Map<string, THREE.AnimationAction> = new Map()
    
            gltfAnimations.forEach((a: THREE.AnimationClip) => {
                animationsMap.set(a.name, mixer.clipAction(a))
            })
    
            animationsMap.forEach((value, key) => {
                value.play()
            })
            
            engery_cube = new cityActions(model, mixer, animationsMap)
        });    

        gltfLoader.load('models/run_hedgehog_run.glb', function(gltf) {
            const model = gltf.scene;

            var wireframeMaterial = new THREE.MeshBasicMaterial({
                color: '#0CBABA', // Specify the wireframe color
                wireframe: true,
                wireframeLinewidth: 3,
              });
              

            model.traverse(function (object: any) {
                if (object.isMesh) {
                    object.castShadow = true;
                    object.material.wireframe = true;
                    object.material = wireframeMaterial
                }
            });
            model.scale.set(0.01,0.01, 0.01);
            model.position.set(-17.5, 3, -3);
            //model.rotation.y = Math.PI / 2;
            scene.add(model);
    
            const gltfAnimations: THREE.AnimationClip[] = gltf.animations;
            const mixer = new THREE.AnimationMixer(model);
            const animationsMap: Map<string, THREE.AnimationAction> = new Map()
    
            gltfAnimations.forEach((a: THREE.AnimationClip) => {
                animationsMap.set(a.name, mixer.clipAction(a))
            })
    
            animationsMap.forEach((value, key) => {
                value.play()
            })
            
            playground_2 = new cityActions(model, mixer, animationsMap)
        });  
        
        //  engineer robot c

        gltfLoader.load('models/obot_-_cute_robot_challenge.glb', function(gltf) {
            const model = gltf.scene;
            model.traverse(function (object: any) {
                if (object.isMesh) {
                    object.castShadow = true;
                    //object.material.wireframe = true;
                }
            });
            model.scale.set(3,3,3);
            model.position.set(0.8, 2, 9);
            model.rotation.y = -Math.PI / 2;
            scene.add(model);
    
            const gltfAnimations: THREE.AnimationClip[] = gltf.animations;
            const mixer = new THREE.AnimationMixer(model);
            const animationsMap: Map<string, THREE.AnimationAction> = new Map()
    
            gltfAnimations.forEach((a: THREE.AnimationClip) => {
                animationsMap.set(a.name, mixer.clipAction(a))
            })
    
            animationsMap.forEach((value, key) => {
                value.play()
            })
            
            engineer_robot_c = new cityActions(model, mixer, animationsMap)
        });  

        // engineer_robot_4d
        gltfLoader.load('models/obot_-_cute_robot_challenge.glb', function(gltf) {
            const model = gltf.scene;
            model.traverse(function (object: any) {
                if (object.isMesh) {
                    object.castShadow = true;
                    //object.material.wireframe = true;
                }
            });
            model.scale.set(3,3,3);
            model.position.set(3, 2, 9);
            model.rotation.y = -Math.PI / 2;
            scene.add(model);
    
            const gltfAnimations: THREE.AnimationClip[] = gltf.animations;
            const mixer = new THREE.AnimationMixer(model);
            const animationsMap: Map<string, THREE.AnimationAction> = new Map()
    
            gltfAnimations.forEach((a: THREE.AnimationClip) => {
                animationsMap.set(a.name, mixer.clipAction(a))
            })
    
            animationsMap.forEach((value, key) => {
                value.play()
            })
            
            engineer_robot_d = new cityActions(model, mixer, animationsMap)
        });  

        // Walking Engineer 
        gltfLoader.load('models/obot_-_cute_robot_challenge.glb', function(gltf) {
            const model = gltf.scene;
            model.traverse(function (object: any) {
                if (object.isMesh) {
                    object.castShadow = true;
                    //object.material.wireframe = true;
                }
            });
            model.scale.set(3,3,3);
            model.position.set(12, 6, 12);
            //model.rotation.y = -Math.PI / 2;
            scene.add(model);
    
            const gltfAnimations: THREE.AnimationClip[] = gltf.animations;
            const mixer = new THREE.AnimationMixer(model);
            const animationsMap: Map<string, THREE.AnimationAction> = new Map()
    
            gltfAnimations.forEach((a: THREE.AnimationClip) => {
                animationsMap.set(a.name, mixer.clipAction(a))
            })
    
            animationsMap.forEach((value, key) => {
                value.play()
            })
            
            walking_engineer = new cityActions(model, mixer, animationsMap)
        }); 

        // Walking engineer _2
        gltfLoader.load('models/obot_-_cute_robot_challenge.glb', function(gltf) {
            const model = gltf.scene;
            model.traverse(function (object: any) {
                if (object.isMesh) {
                    object.castShadow = true;
                    //object.material.wireframe = true;
                }
            });
            model.scale.set(3,3,3);
            model.position.set(10, 4.5, 10);
            //model.rotation.y = -Math.PI / 2;
            scene.add(model);
    
            const gltfAnimations: THREE.AnimationClip[] = gltf.animations;
            const mixer = new THREE.AnimationMixer(model);
            const animationsMap: Map<string, THREE.AnimationAction> = new Map()
    
            gltfAnimations.forEach((a: THREE.AnimationClip) => {
                animationsMap.set(a.name, mixer.clipAction(a))
            })
    
            animationsMap.forEach((value, key) => {
                value.play()
            })
            
            walking_engineer_2 = new cityActions(model, mixer, animationsMap)
        }); 
            //  engineer 5
            gltfLoader.load('models/obot_-_cute_robot_challenge.glb', function(gltf) {
                const model = gltf.scene;
                model.traverse(function (object: any) {
                    if (object.isMesh) {
                            object.castShadow = true;
                            //object.material.wireframe = true;
                        }
                    });
                model.scale.set(3,3,3);
                model.position.set(-21, 6, -10);
                model.rotation.y = Math.PI / 2;
                scene.add(model);
            
                const gltfAnimations: THREE.AnimationClip[] = gltf.animations;
                const mixer = new THREE.AnimationMixer(model);
                const animationsMap: Map<string, THREE.AnimationAction> = new Map()
            
                gltfAnimations.forEach((a: THREE.AnimationClip) => {
                    animationsMap.set(a.name, mixer.clipAction(a))
                })
            
                animationsMap.forEach((value, key) => {
                    value.play()
                })
                    
            walking_engineer_3 = new cityActions(model, mixer, animationsMap)
            }); 
            // engineer 6
            gltfLoader.load('models/obot_-_cute_robot_challenge.glb', function(gltf) {
                const model = gltf.scene;
                model.traverse(function (object: any) {
                    if (object.isMesh) {
                        object.castShadow = true;
                        //object.material.wireframe = true;
                    }
                });
                model.scale.set(3,3,3);
                model.position.set(-19, 7.5, -12);
                model.rotation.y = Math.PI / 2;
                scene.add(model);
        
                const gltfAnimations: THREE.AnimationClip[] = gltf.animations;
                const mixer = new THREE.AnimationMixer(model);
                const animationsMap: Map<string, THREE.AnimationAction> = new Map()
        
                gltfAnimations.forEach((a: THREE.AnimationClip) => {
                    animationsMap.set(a.name, mixer.clipAction(a))
                })
        
                animationsMap.forEach((value, key) => {
                    value.play()
                })
                
                walking_engineer_4 = new cityActions(model, mixer, animationsMap)
            }); 
            
}
// MODEL WITH ANIMATIONS
var characterControls: CharacterControls
new GLTFLoader().load('models/robot_expressive.glb', function (gltf) {
    const model = gltf.scene;
    model.traverse(function (object: any) {
        if (object.isMesh) {
            object.castShadow = true;
        }
    });
    model.scale.set(0.5,0.5,0.5)
    model.position.set(-5, 0, 7)
    model.rotation.y = Math.PI;
    scene.add(model);

    const gltfAnimations: THREE.AnimationClip[] = gltf.animations;
    const mixer = new THREE.AnimationMixer(model);
    const animationsMap: Map<string, THREE.AnimationAction> = new Map()
    gltfAnimations.filter(a => a.name != 'Static Pose').forEach((a: THREE.AnimationClip) => {
        animationsMap.set(a.name, mixer.clipAction(a))
    })

    characterControls = new CharacterControls(model, mixer, animationsMap, orbitControls, camera,  'Idle')
});

// CONTROL KEYS
const keysPressed = {  }
const keyDisplayQueue = new KeyDisplay();
document.addEventListener('keydown', (event) => {
    keyDisplayQueue.down(event.key)
    if (event.shiftKey && characterControls) {
        characterControls.switchRunToggle()
    } else {
        (keysPressed as any)[event.key.toLowerCase()] = true
    }
}, false);
document.addEventListener('keyup', (event) => {
    keyDisplayQueue.up(event.key);
    (keysPressed as any)[event.key.toLowerCase()] = false
}, false);

const clock = new THREE.Clock();
// ANIMATE
function animate() {
    let mixerUpdateDelta = clock.getDelta();
    if (characterControls) {
        characterControls.update(mixerUpdateDelta, keysPressed);
    }
    if (cityControls && warrior_robot && home_robot && rocket_robot && engineer_robot && engineer_robot_b && walking_engineer &&playground_2 && engery_cube && engineer_robot_c && engineer_robot_d){
        cityControls.update(mixerUpdateDelta);
        warrior_robot.update(mixerUpdateDelta);
        home_robot.update(mixerUpdateDelta);
        rocket_robot.update(mixerUpdateDelta);
        engineer_robot.update(mixerUpdateDelta);
        engineer_robot_b.update(mixerUpdateDelta);
        engery_cube.update(mixerUpdateDelta);
        engineer_robot_c.update(mixerUpdateDelta);
        engineer_robot_d.update(mixerUpdateDelta);
        playground_2.update(mixerUpdateDelta);
        walking_engineer_3.update(mixerUpdateDelta);
        walking_engineer_4.update(mixerUpdateDelta);
        walking_engineer.walkingUpdate(mixerUpdateDelta, new THREE.Vector3(12,2,12), new THREE.Vector3(-19, 2, 12));
        walking_engineer_2.walkingUpdate(mixerUpdateDelta, new THREE.Vector3(10,2,12), new THREE.Vector3(-21, 2, 12));
        //walking_engineer_3.walkingUpdate(mixerUpdateDelta, new THREE.Vector3(-21,2,12), new THREE.Vector3(10, 2, 12));
        //walking_engineer_4.walkingUpdate(mixerUpdateDelta, new THREE.Vector3(-19,2,12), new THREE.Vector3(12, 2, 12));
    }
    orbitControls.update();
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}
function generateSong(){
// instantiate a listener
const audioListener = new THREE.AudioListener();

// add the listener to the camera
camera.add( audioListener );

// instantiate audio object
const oceanAmbientSound = new THREE.Audio( audioListener );

// add the audio object to the scene
scene.add( oceanAmbientSound );

// instantiate a loaderj
const loader = new THREE.AudioLoader();

// load a resource
    
    loader.load(
        // resource URL
        'Ghostrifter-Official-City-Lights.mp3',

        // onLoad callback
        function ( audioBuffer ) {
            // set the audio object buffer to the loaded object
            // play the audio
            oceanAmbientSound.setBuffer( audioBuffer );
            oceanAmbientSound.play();
            
        },
    );
}

document.body.appendChild(renderer.domElement);
//generateSong();
animate();

// RESIZE HANDLER
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    keyDisplayQueue.updatePosition()
}
window.addEventListener('resize', onWindowResize);

var cityControls: cityActions
function generateCity(){
    const rgbeLoader = new RGBELoader();
    const gltfLoader = new GLTFLoader();
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    let city;

    rgbeLoader.load('HDR/MR_INT-006_LoftIndustrialWindow_Griffintown.hdr', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;

    gltfLoader.load('models/city.glb', function(gltf) {
        const model = gltf.scene;
        model.traverse(function (object: any) {
            if (object.isMesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                //object.material.wireframe = true;
            }
        });

        scene.add(model);
        city = model;

        const gltfAnimations: THREE.AnimationClip[] = gltf.animations;
        const mixer = new THREE.AnimationMixer(model);
        const animationsMap: Map<string, THREE.AnimationAction> = new Map()

        gltfAnimations.forEach((a: THREE.AnimationClip) => {
            animationsMap.set(a.name, mixer.clipAction(a))
        })

        animationsMap.forEach((value, key) => {
            value.play()
        })
        
        cityControls = new cityActions(model, mixer, animationsMap)
    });


});
}
