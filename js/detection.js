// Dinosaur Detection using Computer Vision
class DinosaurDetector {
    constructor() {
        this.model = null;
        this.isInitialized = false;
        this.dinosaurTypes = [
            'triceratops',
            'tyrannosaurus',
            'stegosaurus',
            'brontosaurus',
            'spinosaurus',
            'raptor',
            'ankylosaurus',
            'gallimimus',
            'pachycephalosaurus',
            'plesiosaurus',
            'ichthyosaur',
            'mozazaur'
        ];
    }

    async init() {
        try {
            // Load MobileNet for feature extraction
            this.model = await mobilenet.load();
            this.isInitialized = true;
            console.log('Dinosaur detection model loaded successfully');
        } catch (error) {
            console.error('Failed to load detection model:', error);
            throw new Error('Failed to initialize dinosaur detection');
        }
    }

    async detectDinosaur(imageData) {
        if (!this.isInitialized) {
            throw new Error('Detection model not initialized');
        }

        try {
            // Create image element from data URL
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            return new Promise((resolve, reject) => {
                img.onload = async () => {
                    try {
                        // Get predictions from MobileNet
                        const predictions = await this.model.classify(img);
                        
                        // Analyze predictions for dinosaur-like features
                        const dinosaurScore = this.analyzeDinosaurFeatures(predictions);
                        
                        if (dinosaurScore > 0.3) {
                            // Determine dinosaur type based on image analysis
                            const dinosaurType = await this.determineDinosaurType(img);
                            
                            resolve({
                                type: dinosaurType,
                                confidence: dinosaurScore,
                                modelPath: this.getModelPath(dinosaurType),
                                features: this.extractFeatures(predictions)
                            });
                        } else {
                            resolve(null);
                        }
                    } catch (error) {
                        console.error('Detection error:', error);
                        reject(error);
                    }
                };
                
                img.onerror = () => reject(new Error('Failed to load image'));
                img.src = imageData;
            });
            
        } catch (error) {
            console.error('Detection failed:', error);
            return null;
        }
    }

    analyzeDinosaurFeatures(predictions) {
        // Keywords that might indicate dinosaur-like features
        const dinosaurKeywords = [
            'reptile', 'lizard', 'dinosaur', 'dragon', 'creature',
            'animal', 'beast', 'monster', 'predator'
        ];
        
        let totalScore = 0;
        let keywordMatches = 0;
        
        predictions.forEach(prediction => {
            const className = prediction.className.toLowerCase();
            const confidence = prediction.probability;
            
            // Check for dinosaur-related keywords
            dinosaurKeywords.forEach(keyword => {
                if (className.includes(keyword)) {
                    keywordMatches++;
                    totalScore += confidence * 0.5;
                }
            });
            
            // General animal detection
            if (className.includes('animal') || className.includes('creature')) {
                totalScore += confidence * 0.3;
            }
        });
        
        // Bonus for multiple keyword matches
        if (keywordMatches > 1) {
            totalScore += 0.2;
        }
        
        return Math.min(totalScore, 1.0);
    }

    async determineDinosaurType(img) {
        // Simple heuristic-based dinosaur type determination
        // In a real implementation, you would use a more sophisticated model
        
        const features = await this.extractImageFeatures(img);
        
        // Determine type based on features
        if (features.hasLongNeck) {
            return 'brontosaurus';
        } else if (features.hasHorns) {
            return 'triceratops';
        } else if (features.hasPlates) {
            return 'stegosaurus';
        } else if (features.hasWings) {
            return 'pterodactyl';
        } else if (features.isLarge) {
            return 'tyrannosaurus';
        } else {
            return 'velociraptor';
        }
    }

    async extractImageFeatures(img) {
        // Create a canvas to analyze the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Simple feature detection based on image analysis
        const features = {
            hasLongNeck: this.detectLongNeck(imageData),
            hasHorns: this.detectHorns(imageData),
            hasPlates: this.detectPlates(imageData),
            hasWings: this.detectWings(imageData),
            isLarge: this.detectSize(imageData)
        };
        
        return features;
    }

    detectLongNeck(imageData) {
        // Simple vertical line detection for long neck
        const data = imageData.data;
        const width = imageData.width;
        const height = imageData.height;
        
        let verticalLines = 0;
        for (let x = width * 0.3; x < width * 0.7; x++) {
            let consecutivePixels = 0;
            for (let y = 0; y < height; y++) {
                const idx = (y * width + x) * 4;
                const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
                if (brightness < 128) { // Dark pixel (likely drawing)
                    consecutivePixels++;
                } else {
                    if (consecutivePixels > height * 0.3) {
                        verticalLines++;
                    }
                    consecutivePixels = 0;
                }
            }
        }
        
        return verticalLines > 2;
    }

    detectHorns(imageData) {
        // Detect triangular or horn-like shapes
        const data = imageData.data;
        const width = imageData.width;
        const height = imageData.height;
        
        // Look for triangular patterns in the top portion of the image
        let triangularShapes = 0;
        for (let y = 0; y < height * 0.4; y++) {
            for (let x = width * 0.2; x < width * 0.8; x++) {
                if (this.isTriangularPattern(data, x, y, width, height)) {
                    triangularShapes++;
                }
            }
        }
        
        return triangularShapes > 5;
    }

    detectPlates(imageData) {
        // Detect back plates (vertical lines on the back)
        const data = imageData.data;
        const width = imageData.width;
        const height = imageData.height;
        
        let backPlates = 0;
        for (let x = width * 0.4; x < width * 0.6; x++) {
            let verticalLineLength = 0;
            for (let y = height * 0.2; y < height * 0.8; y++) {
                const idx = (y * width + x) * 4;
                const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
                if (brightness < 128) {
                    verticalLineLength++;
                }
            }
            if (verticalLineLength > height * 0.3) {
                backPlates++;
            }
        }
        
        return backPlates > 3;
    }

    detectWings(imageData) {
        // Detect wing-like shapes (horizontal extensions)
        const data = imageData.data;
        const width = imageData.width;
        const height = imageData.height;
        
        let horizontalExtensions = 0;
        for (let y = height * 0.3; y < height * 0.7; y++) {
            for (let x = 0; x < width * 0.2; x++) {
                if (this.isHorizontalLine(data, x, y, width, height, 20)) {
                    horizontalExtensions++;
                }
            }
            for (let x = width * 0.8; x < width; x++) {
                if (this.isHorizontalLine(data, x, y, width, height, 20)) {
                    horizontalExtensions++;
                }
            }
        }
        
        return horizontalExtensions > 10;
    }

    detectSize(imageData) {
        // Detect if the drawing takes up a large portion of the image
        const data = imageData.data;
        const width = imageData.width;
        const height = imageData.height;
        
        let darkPixels = 0;
        let totalPixels = width * height;
        
        for (let i = 0; i < data.length; i += 4) {
            const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
            if (brightness < 128) {
                darkPixels++;
            }
        }
        
        return (darkPixels / totalPixels) > 0.3;
    }

    isTriangularPattern(data, x, y, width, height) {
        // Simple triangular pattern detection
        if (x < 2 || x >= width - 2 || y < 2 || y >= height - 2) return false;
        
        const centerIdx = (y * width + x) * 4;
        const centerBrightness = (data[centerIdx] + data[centerIdx + 1] + data[centerIdx + 2]) / 3;
        
        if (centerBrightness > 128) return false; // Not a dark pixel
        
        // Check for triangular shape
        let darkPixels = 0;
        for (let dy = -2; dy <= 2; dy++) {
            for (let dx = -2; dx <= 2; dx++) {
                const idx = ((y + dy) * width + (x + dx)) * 4;
                const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
                if (brightness < 128) darkPixels++;
            }
        }
        
        return darkPixels > 8; // Triangular pattern
    }

    isHorizontalLine(data, x, y, width, height, minLength) {
        let consecutiveDark = 0;
        for (let i = 0; i < minLength && x + i < width; i++) {
            const idx = (y * width + (x + i)) * 4;
            const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
            if (brightness < 128) {
                consecutiveDark++;
            } else {
                consecutiveDark = 0;
            }
        }
        return consecutiveDark >= minLength;
    }

    extractFeatures(predictions) {
        return predictions.map(prediction => ({
            className: prediction.className,
            probability: prediction.probability
        }));
    }

    getModelPath(dinosaurType) {
        // Return the path to the 3D model for the detected dinosaur type
        const modelPaths = {
            'triceratops': 'models/triceratops.glb',
            'tyrannosaurus': 'models/T-Rex.glb',
            'stegosaurus': 'models/stegosaurus.glb',
            'brontosaurus': 'models/brontosaurus.glb',
            'spinosaurus': 'models/spinosaurus.glb',
            'raptor': 'models/raptor.glb',
            'ankylosaurus': 'models/ankylosaurus.glb',
            'gallimimus': 'models/gallimimus.glb',
            'pachycephalosaurus': 'models/pachycephalosaurus.glb',
            'plesiosaurus': 'models/plesiasaurus.glb',
            'ichthyosaur': 'models/ichthyosaur.glb',
            'mozazaur': 'models/mozazaur.glb'
        };
        
        return modelPaths[dinosaurType] || 'models/triceratops.glb';
    }
}
