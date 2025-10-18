// AR Renderer using Three.js for 3D dinosaur display
class ARRenderer {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.dinosaurModel = null;
        this.controls = null;
        this.isInitialized = false;
        this.isMovementMode = false;
        this.originalPosition = { x: 0, y: 0, z: 0 };
        this.currentPosition = { x: 0, y: 0, z: 0 };
        this.rotation = 0;
        this.animations = null;
        this.mixer = null;
        this.currentAnimation = null;
    }

    async init() {
        try {
            const canvas = document.getElementById('ar-canvas');
            
            // Initialize Three.js scene
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x000000);
            
            // Setup camera
            this.camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            this.camera.position.set(0, 0, 5);
            
            // Setup renderer
            this.renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true,
                alpha: true
            });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            
            // Add lighting
            this.setupLighting();
            
            // Setup controls
            this.setupControls();
            
            // Handle window resize
            window.addEventListener('resize', () => this.onWindowResize());
            
            this.isInitialized = true;
            console.log('AR Renderer initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize AR renderer:', error);
            throw new Error('Failed to initialize 3D rendering');
        }
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        
        // Point light for better illumination
        const pointLight = new THREE.PointLight(0xff6b6b, 0.5, 100);
        pointLight.position.set(0, 5, 0);
        this.scene.add(pointLight);
    }

    setupControls() {
        // Simple orbit controls for desktop (optional)
        // For mobile, we'll use touch controls
    }

    async loadDinosaurModel(modelPath) {
        try {
            // Try to load GLTF model first
            if (modelPath.endsWith('.glb') || modelPath.endsWith('.gltf')) {
                await this.loadGLTFModel(modelPath);
            } else {
                // Fallback to placeholder
                this.createPlaceholderDinosaur();
            }
            console.log(`Loaded dinosaur model: ${modelPath}`);
        } catch (error) {
            console.error('Failed to load dinosaur model:', error);
            this.createPlaceholderDinosaur();
        }
    }

    createPlaceholderDinosaur() {
        // Create a simple dinosaur-like shape as placeholder
        const group = new THREE.Group();
        
        // Body
        const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.8, 1.5, 8);
        const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0;
        body.castShadow = true;
        group.add(body);
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.4, 8, 6);
        const headMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.set(0, 1.2, 0.8);
        head.castShadow = true;
        group.add(head);
        
        // Tail
        const tailGeometry = new THREE.CylinderGeometry(0.1, 0.3, 1.2, 6);
        const tailMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const tail = new THREE.Mesh(tailGeometry, tailMaterial);
        tail.position.set(0, 0.5, -1.2);
        tail.rotation.x = Math.PI / 4;
        tail.castShadow = true;
        group.add(tail);
        
        // Legs
        const legGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.8, 6);
        const legMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
        
        const positions = [
            { x: -0.3, z: 0.3 },
            { x: 0.3, z: 0.3 },
            { x: -0.3, z: -0.3 },
            { x: 0.3, z: -0.3 }
        ];
        
        positions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(pos.x, -0.6, pos.z);
            leg.castShadow = true;
            group.add(leg);
        });
        
        // Scale and position
        group.scale.set(1.5, 1.5, 1.5);
        group.position.set(0, -1, 0);
        
        this.dinosaurModel = group;
        this.scene.add(this.dinosaurModel);
        
        // Store original position
        this.originalPosition = {
            x: this.dinosaurModel.position.x,
            y: this.dinosaurModel.position.y,
            z: this.dinosaurModel.position.z
        };
        this.currentPosition = { ...this.originalPosition };
    }

    startAR() {
        if (!this.isInitialized) {
            console.error('AR Renderer not initialized');
            return;
        }
        
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Update animation mixer
        if (this.mixer) {
            this.mixer.update(0.016); // 60fps
        }
        
        if (this.dinosaurModel) {
            // Gentle floating animation (only if no skeletal animation)
            if (!this.mixer || !this.currentAnimation) {
                this.dinosaurModel.position.y = this.currentPosition.y + Math.sin(Date.now() * 0.001) * 0.1;
            }
            
            // Gentle rotation
            this.dinosaurModel.rotation.y += 0.005;
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    toggleMovementMode() {
        this.isMovementMode = !this.isMovementMode;
        const moveBtn = document.getElementById('move-btn');
        moveBtn.textContent = this.isMovementMode ? '🎮 Moving' : '🎮 Move Dino';
        moveBtn.style.background = this.isMovementMode ? 
            'rgba(76, 175, 80, 0.9)' : 'rgba(255, 107, 107, 0.9)';
    }

    moveDinosaur(deltaX, deltaY) {
        if (!this.dinosaurModel || !this.isMovementMode) return;
        
        // Convert screen coordinates to world coordinates
        const sensitivity = 0.01;
        this.currentPosition.x += deltaX * sensitivity;
        this.currentPosition.z -= deltaY * sensitivity;
        
        // Apply movement
        this.dinosaurModel.position.x = this.currentPosition.x;
        this.dinosaurModel.position.z = this.currentPosition.z;
    }

    rotateDinosaur() {
        if (!this.dinosaurModel) return;
        
        this.rotation += Math.PI / 4; // 45 degrees
        this.dinosaurModel.rotation.y = this.rotation;
    }

    resetDinosaur() {
        if (!this.dinosaurModel) return;
        
        this.currentPosition = { ...this.originalPosition };
        this.dinosaurModel.position.set(
            this.originalPosition.x,
            this.originalPosition.y,
            this.originalPosition.z
        );
        this.dinosaurModel.rotation.set(0, 0, 0);
        this.rotation = 0;
        this.isMovementMode = false;
        
        const moveBtn = document.getElementById('move-btn');
        moveBtn.textContent = '🎮 Move Dino';
        moveBtn.style.background = 'rgba(255, 107, 107, 0.9)';
    }

    onWindowResize() {
        if (!this.camera || !this.renderer) return;
        
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Method to load actual 3D models (GLTF/GLB)
    async loadGLTFModel(modelPath) {
        try {
            // Load GLTFLoader dynamically
            const { GLTFLoader } = await import('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js');
            
            const loader = new GLTFLoader();
            
            return new Promise((resolve, reject) => {
                loader.load(
                    modelPath,
                    (gltf) => {
                        // Remove existing dinosaur model
                        if (this.dinosaurModel) {
                            this.scene.remove(this.dinosaurModel);
                        }
                        
                        // Add new model
                        this.dinosaurModel = gltf.scene;
                        
                        // Scale and position the model
                        this.dinosaurModel.scale.set(1, 1, 1);
                        this.dinosaurModel.position.set(0, -1, 0);
                        
                        // Enable shadows
                        this.dinosaurModel.traverse((child) => {
                            if (child.isMesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;
                            }
                        });
                        
                        // Setup animations if available
                        if (gltf.animations && gltf.animations.length > 0) {
                            this.setupAnimations(gltf.animations);
                        }
                        
                        this.scene.add(this.dinosaurModel);
                        
                        // Store original position
                        this.originalPosition = {
                            x: this.dinosaurModel.position.x,
                            y: this.dinosaurModel.position.y,
                            z: this.dinosaurModel.position.z
                        };
                        this.currentPosition = { ...this.originalPosition };
                        
                        resolve(gltf);
                    },
                    (progress) => {
                        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
                    },
                    (error) => {
                        console.error('GLTF loading error:', error);
                        this.createPlaceholderDinosaur();
                        reject(error);
                    }
                );
            });
            
        } catch (error) {
            console.error('Failed to load GLTF model:', error);
            this.createPlaceholderDinosaur();
        }
    }

    setupAnimations(animations) {
        try {
            // Create animation mixer
            this.mixer = new THREE.AnimationMixer(this.dinosaurModel);
            this.animations = animations;
            
            // Play the first animation by default
            if (animations.length > 0) {
                this.playAnimation(0);
            }
            
            console.log(`Loaded ${animations.length} animations`);
        } catch (error) {
            console.error('Failed to setup animations:', error);
        }
    }

    playAnimation(animationIndex) {
        if (!this.mixer || !this.animations || animationIndex >= this.animations.length) {
            return;
        }
        
        // Stop current animation
        if (this.currentAnimation) {
            this.currentAnimation.stop();
        }
        
        // Play new animation
        const clip = this.animations[animationIndex];
        this.currentAnimation = this.mixer.clipAction(clip);
        this.currentAnimation.reset();
        this.currentAnimation.play();
        
        console.log(`Playing animation: ${clip.name}`);
    }

    playAnimationByName(name) {
        if (!this.animations) return;
        
        const index = this.animations.findIndex(clip => 
            clip.name.toLowerCase().includes(name.toLowerCase())
        );
        
        if (index !== -1) {
            this.playAnimation(index);
        }
    }

    // Animation controls for different dinosaur behaviors
    playIdleAnimation() {
        this.playAnimationByName('idle');
    }

    playWalkAnimation() {
        this.playAnimationByName('walk');
    }

    playRoarAnimation() {
        this.playAnimationByName('roar');
    }

    // Cycle through available animations
    nextAnimation() {
        if (!this.animations) return;
        
        const currentIndex = this.animations.findIndex(clip => clip === this.currentAnimation?.getClip());
        const nextIndex = (currentIndex + 1) % this.animations.length;
        this.playAnimation(nextIndex);
    }
}
