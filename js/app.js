// Main Application Controller
class DinoARApp {
    constructor() {
        this.currentScreen = 'loading';
        this.camera = null;
        this.detector = null;
        this.arRenderer = null;
        this.detectedDinosaur = null;
        this.isInitialized = false;
        
        this.init();
    }

    async init() {
        try {
            // Initialize components
            this.camera = new CameraController();
            this.detector = new DinosaurDetector();
            this.arRenderer = new ARRenderer();
            
            // Load dinosaur data
            await this.loadDinosaurData();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Initialize camera
            await this.camera.init();
            
            // Initialize AR renderer
            await this.arRenderer.init();
            
            // Initialize detection model
            await this.detector.init();
            
            this.isInitialized = true;
            this.showScreen('camera');
            
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showError('Failed to initialize the application. Please refresh and try again.');
        }
    }

    async loadDinosaurData() {
        // This will be populated by dinosaur-data.js
        this.dinosaurDatabase = window.DinosaurDatabase || {};
    }

    setupEventListeners() {
        // Capture button
        document.getElementById('capture-btn').addEventListener('click', () => {
            this.captureDrawing();
        });

        // Random dinosaur button
        document.getElementById('random-dino-btn').addEventListener('click', () => {
            this.showRandomDinosaur();
        });

        // Control buttons
        document.getElementById('move-btn').addEventListener('click', () => {
            this.toggleMovementMode();
        });

        document.getElementById('rotate-btn').addEventListener('click', () => {
            this.rotateDinosaur();
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetDinosaur();
        });

        document.getElementById('animate-btn').addEventListener('click', () => {
            this.animateDinosaur();
        });

        document.getElementById('try-again-btn').addEventListener('click', () => {
            this.tryAgain();
        });

        // Retry button
        document.getElementById('retry-btn').addEventListener('click', () => {
            this.retry();
        });

        // Touch controls for mobile
        this.setupTouchControls();
    }

    setupTouchControls() {
        const arCanvas = document.getElementById('ar-canvas');
        let isMoving = false;
        let lastTouch = null;

        arCanvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (this.detectedDinosaur) {
                isMoving = true;
                lastTouch = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                };
            }
        });

        arCanvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (isMoving && lastTouch && this.detectedDinosaur) {
                const touch = e.touches[0];
                const deltaX = touch.clientX - lastTouch.x;
                const deltaY = touch.clientY - lastTouch.y;
                
                this.moveDinosaur(deltaX, deltaY);
                
                lastTouch = {
                    x: touch.clientX,
                    y: touch.clientY
                };
            }
        });

        arCanvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            isMoving = false;
            lastTouch = null;
        });
    }

    async captureDrawing() {
        try {
            this.showLoading('Analyzing your drawing...');
            
            // Capture image from camera
            const imageData = await this.camera.captureImage();
            
            // Detect dinosaur in the image
            const detection = await this.detector.detectDinosaur(imageData);
            
            if (detection) {
                this.detectedDinosaur = detection;
                this.showDinosaurInfo(detection);
                this.showScreen('ar');
                
                // Load and display 3D model
                await this.arRenderer.loadDinosaurModel(detection.modelPath);
                this.arRenderer.startAR();
            } else {
                // Show random dinosaur even if no detection
                this.showRandomDinosaur();
                this.showScreen('ar');
            }
            
        } catch (error) {
            console.error('Capture failed:', error);
            this.showError('Failed to analyze your drawing. Please try again.');
        }
    }

    showDinosaurInfo(detection) {
        const dinosaur = this.dinosaurDatabase[detection.type];
        if (dinosaur) {
            document.getElementById('dino-name').textContent = dinosaur.name;
            document.getElementById('dino-description').textContent = dinosaur.description;
            document.getElementById('dino-size').textContent = dinosaur.size;
            document.getElementById('dino-period').textContent = dinosaur.period;
            document.getElementById('dino-diet').textContent = dinosaur.diet;
        }
    }

    async showRandomDinosaur() {
        // Get all available dinosaur types
        const dinosaurTypes = Object.keys(this.dinosaurDatabase);
        const randomType = dinosaurTypes[Math.floor(Math.random() * dinosaurTypes.length)];
        const randomDinosaur = this.dinosaurDatabase[randomType];
        
        // Create a fake detection object for the random dinosaur
        this.detectedDinosaur = {
            type: randomType,
            confidence: 0.5, // Medium confidence for random selection
            modelPath: randomDinosaur.modelPath,
            isRandom: true // Flag to indicate this is a random selection
        };
        
        // Show the random dinosaur info
        this.showDinosaurInfo(this.detectedDinosaur);
        
        // Load and display the random 3D model
        await this.arRenderer.loadDinosaurModel(randomDinosaur.modelPath);
        this.arRenderer.startAR();
        
        // Show a helpful message about the random selection
        this.showRandomDinosaurMessage();
    }

    showRandomDinosaurMessage() {
        // Create a temporary message overlay
        const messageOverlay = document.createElement('div');
        messageOverlay.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            z-index: 1000;
            max-width: 300px;
            font-family: 'Comic Sans MS', cursive, sans-serif;
        `;
        
        messageOverlay.innerHTML = `
            <h3 style="margin: 0 0 10px 0; color: #ff6b6b;">🎨 No Dinosaur Detected!</h3>
            <p style="margin: 0 0 15px 0;">But here's a random dinosaur to explore!</p>
            <p style="margin: 0 0 15px 0; font-size: 0.9em; color: #ccc;">Try drawing a clearer dinosaur next time!</p>
            <button onclick="this.parentElement.remove()" style="
                background: #ff6b6b;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: bold;
            ">Got it!</button>
        `;
        
        document.body.appendChild(messageOverlay);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageOverlay.parentElement) {
                messageOverlay.remove();
            }
        }, 5000);
    }

    toggleMovementMode() {
        if (this.arRenderer) {
            this.arRenderer.toggleMovementMode();
        }
    }

    moveDinosaur(deltaX, deltaY) {
        if (this.arRenderer) {
            this.arRenderer.moveDinosaur(deltaX, deltaY);
        }
    }

    rotateDinosaur() {
        if (this.arRenderer) {
            this.arRenderer.rotateDinosaur();
        }
    }

    resetDinosaur() {
        if (this.arRenderer) {
            this.arRenderer.resetDinosaur();
        }
    }

    animateDinosaur() {
        if (this.arRenderer) {
            this.arRenderer.nextAnimation();
        }
    }

    tryAgain() {
        // Go back to camera screen to try drawing again
        this.showScreen('camera');
    }

    showScreen(screenName) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        const targetScreen = document.getElementById(`${screenName}-screen`);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenName;
        }
    }

    showLoading(message = 'Loading...') {
        const loadingScreen = document.getElementById('loading-screen');
        const loadingText = loadingScreen.querySelector('p');
        loadingText.textContent = message;
        this.showScreen('loading');
    }

    showError(message) {
        document.getElementById('error-message').textContent = message;
        this.showScreen('error');
    }

    retry() {
        this.showScreen('camera');
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dinoARApp = new DinoARApp();
});
