import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


export class cityActions{
    model: THREE.Group
    mixer: THREE.AnimationMixer
    animationsMap: Map<string, THREE.AnimationAction> = new Map()

    walkDirection = new THREE.Vector3(-1,0,0)
    rotateAngle = new THREE.Vector3(0, 1, 0)
    rotateQuarternion: THREE.Quaternion = new THREE.Quaternion()

    walkVelocity = 1
    opt = 0
    timeOut = 0

    constructor(model: THREE.Group,
        mixer: THREE.AnimationMixer, animationsMap: Map<string, THREE.AnimationAction>,) {
        this.model = model
        this.mixer = mixer
        this.animationsMap = animationsMap
        this.animationsMap.forEach((value, key) => {
                value.play()
            }
        )
    }

    public update(delta: number) {
        this.mixer.update(delta)
    }

    public walkingUpdate(delta: number, requireDestination: THREE.Vector3, requireDestination_2: THREE.Vector3) {
        if (this.opt == 0 && requireDestination_2.x >= this.model.position.x){
            const initialRotation = new THREE.Quaternion().setFromAxisAngle(this.rotateAngle, Math.PI);
            this.model.quaternion.multiplyQuaternions(initialRotation, this.model.quaternion);
            this.model.quaternion.rotateTowards(this.rotateQuarternion, 0.2)
            
            this.walkVelocity = this.walkVelocity * -1
            this.timeOut = 50000
            this.opt = 1
            this.mixer.update(delta)
         
        }
        else if (this.opt == 1 && requireDestination.x <= this.model.position.x){
            const reverse = new THREE.Quaternion().setFromAxisAngle(this.rotateAngle, -Math.PI);
            this.model.quaternion.multiplyQuaternions(reverse, this.model.quaternion);
            this.model.quaternion.rotateTowards(this.rotateQuarternion, 0.2)

            this.walkVelocity = this.walkVelocity * -1
            this.timeOut = 50000
            this.opt = 0
            this.mixer.update(delta)
        }

        const moveX = this.walkDirection.x * this.walkVelocity * delta
        //const moveZ = this.walkDirection.z * this.walkVelocity * delta
        this.model.position.x += moveX
        //this.model.position.z += moveZ
        this.mixer.update(delta)
    }
}
