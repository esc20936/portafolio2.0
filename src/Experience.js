import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from 'lil-gui'
import faceModel from './assets/models/face.glb?url'

export default class Experience {

    constructor(canvas) {
        // console.log(canvas);
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        const gui = new dat.GUI()

        const parameters = {
            materialColor: '#ffeded'
        }

        gui.addColor(parameters, 'materialColor').onChange(() => {
                material.color.set(parameters.materialColor)
            })

            this.textureLoader = new THREE.TextureLoader();
            let gradientTexture = this.textureLoader.load('/gradients/3.jpg');
            // gradientTexture.magFilter = THREE.NearestFilter;
            
            
            const material = new THREE.MeshToonMaterial({ color: "#ffffff",
                gradientMap: gradientTexture })

        let sectionMesh = null;
        let tempObj = this;
        const loader = new GLTFLoader();
        loader.load(
            // resource URL
            faceModel,
            // called when the resource is loaded
            function (gltf) {
                gltf.scene.traverse(function (child) {
                    if (child.isMesh) {
                        child.material = material
                        child.castShadow = true
                        child.receiveShadow = true
                    }
                });
                sectionMesh = gltf.scene
                sectionMesh.position.y = -1
                sectionMesh.position.x = 1
                sectionMesh.position.z = 0
                sectionMesh.rotation.y = - 0.25
                sectionMesh.scale.set(0.1, 0.1, 0.1)
                tempObj.scene.add(sectionMesh);
                // mesh1 = sectionMesh
                
            }
        );
            


        this.objectsDistance = 6;

        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        this.cameraGroup = new THREE.Group();
        this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100);
        this.camera.position.z = 3;
        this.cameraGroup.add(this.camera);
        this.scene.add(this.cameraGroup);
        this.clock = new THREE.Clock();


        let ambientLight = new THREE.AmbientLight('#090418', 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight('#4AC7FA',0.7)
        directionalLight.position.set(-2, -1, 1)
        directionalLight.lookAt(new THREE.Vector3())
        this.scene.add(directionalLight)
        const directionalLight2 = new THREE.DirectionalLight('#E649F5',0.7)
        directionalLight2.position.set(2, 1, 0)
        directionalLight2.lookAt(new THREE.Vector3())
        this.scene.add(directionalLight2)



        

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
        });

        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        
        this.cursor = {}
        this.cursor.x = 0
        this.cursor.y = 0

        this.scrollPercent = 0
        this.animationScripts = []


        this.animationScripts.push({
            start: 0,
            end: 99,
            func: () => {
                
                if(sectionMesh){

                    sectionMesh.position.x = this.lerp(1,-2,this.scalePercent(0,100))
                    sectionMesh.rotation.y = this.lerp(-0.25,0.8,this.scalePercent(0,100))
                }
                    // console.log(this.sectionMesh.position)
                
            }
        })


        document.body.onscroll = () => {
            //calculate the current scroll progress as a percentage
            this.scrollPercent =
                ((document.documentElement.scrollTop || document.body.scrollTop) /
                    ((document.documentElement.scrollHeight ||
                        document.body.scrollHeight) -
                        document.documentElement.clientHeight)) *
                100
            ;
            // console.log(this.scrollPercent);
        }


        window.addEventListener('mousemove', (event) => {
            this.mouseMove(event)
            
        })
        

        
        
        
        
        this.addParticles('#E649F5');
        this.addParticles('#4AC7FA');




        let previousTime = 0;
        const tick = () => {
            const elapsedTime = this.clock.getElapsedTime();
            const deltaTime = elapsedTime - previousTime;
            previousTime = elapsedTime;

            const parallaxX = this.cursor.x * 0.5
            const parallaxY = this.cursor.y * 0.5

            this.cameraGroup.position.x += (parallaxX - this.cameraGroup.position.x) * 5 * deltaTime
            this.cameraGroup.position.y += (parallaxY - this.cameraGroup.position.y) * 5 * deltaTime

            this.playScrollAnimation()

            this.renderer.render(this.scene, this.camera);
            window.requestAnimationFrame(tick);
        };

        tick();


        

        window.addEventListener('resize', () => {
            this.resize();
        }); 

    }

    resize() {
        this.sizes.width = window.innerWidth;
        this.sizes.height = window.innerHeight;

        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


    }

    mouseMove(event) {
        this.cursor.x = event.clientX / this.sizes.width - 0.5
        this.cursor.y = -(event.clientY / this.sizes.height - 0.5)
    }

    addParticles(Tcolor) {
        const particlesCount = 100
        const positions = new Float32Array(particlesCount * 3)
        for(let i = 0; i < particlesCount; i++) {
            positions[i*3+0] = (Math.random()-0.5) * 10
            positions[i*3+1] = this.objectsDistance *0.5  - Math.random() * this.objectsDistance * 3
            positions[i*3+2] = (Math.random()-0.7 ) * 10
        }

        const particlesGeometry = new THREE.BufferGeometry()
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        const particlesMaterial = new THREE.PointsMaterial({ size: 0.03, sizeAttenuation: true, color: Tcolor })
        const particles = new THREE.Points(particlesGeometry, particlesMaterial)
        this.scene.add(particles)


    }

    lerp(x,y,a) {
        return (1 - a) * x + a * y
    }

    scalePercent(start, end) {
        return (this.scrollPercent - start) / (end - start)
    }


    playScrollAnimation() {
        // console.log(this.animationScripts);
        this.animationScripts.forEach((a) => {
            // console.log(a);
            if (this.scrollPercent >= a.start && this.scrollPercent < a.end) {
                // console.log('play');
                a.func()
            }
        })
    }

    


}