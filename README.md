""

# Dino AR Explorer 🦕

A web-based Augmented Reality application for children to discover dinosaurs by drawing them! This app uses computer vision to detect dinosaur drawings and displays 3D dinosaur models in AR.

## How to Use

1.**Draw a Dinosaur**: Parents and children draw a dinosaur on paper card
2. **Open the Web**: Load `index.html` in a mobile browser
3. **Allow Camera Access**: Grant permission when prompted
5. **Capture**: Point the camera at the drawing and tap "Capture Drawing"
6. **Explore**: Watch as the app identifies the dinosaur and show the relevant knowledge
7. **Interact**: Use touch controls to move and rotate the dinosaur; build trees for dinosaurs!

## Technical Requirements

- Modern mobile browser with camera support
- HTTPS connection (required for camera access)
- WebGL support for 3D rendering
- Touch screen mobile

## Browser Compatibility

- ✅ Chrome Mobile (Android/iOS)
- ✅ Safari Mobile (iOS)
- ✅ Firefox Mobile
- ✅ Edge Mobile

## Setup Instructions

1. **Host the files**: Upload all files to a web server with HTTPS
2. **Access via mobile**: Open the URL on a mobile device
3. **Grant permissions**: Allow camera access when prompted
4. **Start drawing**: Have children draw dinosaurs and capture them

## File Structure

```
dino-ar/
├── index.html          # Main HTML file
├── styles.css          # Styling and responsive design
├── js/
│   ├── app.js          # Main application controller
│   ├── camera.js       # Camera capture functionality
│   ├── detection.js    # Dinosaur detection using AI
│   ├── ar-renderer.js  # 3D AR rendering with Three.js
│   └── dinosaur-data.js # Dinosaur database and information
└── README.md           # This file
```

## Development Notes

- Uses TensorFlow.js for computer vision
- Three.js for 3D rendering and AR
- MobileNet for image classification
- Responsive design for mobile devices
- Touch controls for dinosaur interaction

## Future Enhancements

- Integration with Unity Danosaurus Pack 3D models
- Improved dinosaur detection accuracy
- More dinosaur species
- Sound effects and animations
- Multiplayer AR experiences

## Troubleshooting

**Camera not working?**
- Ensure you're using HTTPS
- Check browser permissions
- Try refreshing the page

**Detection not working?**
- Make sure the drawing is clear and well-lit
- Try drawing a simpler dinosaur shape
- Ensure good contrast between drawing and background

**3D model not showing?**
- Check WebGL support in your browser
- Try a different browser
- Ensure good lighting conditions

## Educational Value

This app helps children:
- Learn about different dinosaur species
- Understand dinosaur characteristics
- Develop drawing skills
- Experience augmented reality technology
- Engage with interactive 3D content

Perfect for classrooms, museums, and home learning!
