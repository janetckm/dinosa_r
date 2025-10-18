// Camera Controller for capturing children's drawings
class CameraController {
    constructor() {
        this.video = null;
        this.canvas = null;
        this.ctx = null;
        this.stream = null;
        this.isInitialized = false;
    }

    async init() {
        try {
            this.video = document.getElementById('camera-video');
            this.canvas = document.getElementById('capture-canvas');
            this.ctx = this.canvas.getContext('2d');
            
            // Request camera access
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment', // Use back camera on mobile
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });
            
            this.video.srcObject = this.stream;
            this.isInitialized = true;
            
            return new Promise((resolve, reject) => {
                this.video.onloadedmetadata = () => {
                    this.video.play();
                    resolve();
                };
                this.video.onerror = reject;
            });
            
        } catch (error) {
            console.error('Camera initialization failed:', error);
            throw new Error('Camera access denied or not available. Please allow camera access and try again.');
        }
    }

    async captureImage() {
        if (!this.isInitialized) {
            throw new Error('Camera not initialized');
        }

        // Set canvas dimensions to match video
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;
        
        // Draw current video frame to canvas
        this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        
        // Return image data
        return this.canvas.toDataURL('image/jpeg', 0.8);
    }

    getImageData() {
        if (!this.isInitialized) {
            throw new Error('Camera not initialized');
        }
        
        return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }

    stop() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        this.isInitialized = false;
    }

    // Get the center area of the image (where children are likely to draw)
    getCenterImageData() {
        const imageData = this.getImageData();
        const centerX = Math.floor(imageData.width * 0.5);
        const centerY = Math.floor(imageData.height * 0.5);
        const cropSize = Math.min(imageData.width, imageData.height) * 0.6; // 60% of the smaller dimension
        
        const startX = Math.floor(centerX - cropSize / 2);
        const startY = Math.floor(centerY - cropSize / 2);
        
        // Create a new canvas for the cropped area
        const cropCanvas = document.createElement('canvas');
        const cropCtx = cropCanvas.getContext('2d');
        cropCanvas.width = cropSize;
        cropCanvas.height = cropSize;
        
        // Draw the cropped area
        cropCtx.drawImage(
            this.canvas,
            startX, startY, cropSize, cropSize,
            0, 0, cropSize, cropSize
        );
        
        return cropCanvas.toDataURL('image/jpeg', 0.8);
    }
}
