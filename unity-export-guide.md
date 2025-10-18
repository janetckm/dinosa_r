# Unity Danosaurus Pack Export Guide

## Method 1: Unity GLTF Exporter (Recommended)

### Step 1: Install GLTF Exporter
1. Open Unity
2. Go to **Window > Package Manager**
3. Search for "GLTF Exporter"
4. Install the package

### Step 2: Export Your Dinosaurs
1. Import your Danosaurus Pack into Unity
2. Find the dinosaur prefabs in your project
3. For each dinosaur:
   - Select the prefab in the scene
   - Go to **GameObject > Export GLTF**
   - Choose export location
   - Export as GLB format (binary GLTF)

### Step 3: Organize Files
Create this folder structure in your web project:
```
models/
├── triceratops.glb
├── tyrannosaurus.glb
├── stegosaurus.glb
├── brontosaurus.glb
├── pterodactyl.glb
└── velociraptor.glb
```

## Method 2: FBX Export + Conversion

### Step 1: Export as FBX
1. Select dinosaur prefabs in Unity
2. Right-click > **Export Package**
3. Or use **Assets > Export Package**

### Step 2: Convert to GLTF
Use one of these tools:
- **Blender**: Import FBX → Export as GLTF
- **Online Converter**: Use gltf.report or similar
- **Command Line**: Use FBX2glTF tool

## Method 3: Unity WebGL Integration

### Step 1: Create Unity WebGL Build
1. Set build target to **WebGL**
2. Build your dinosaur scene
3. Get the generated files

### Step 2: Integrate with Web AR
```javascript
// Load Unity WebGL build
const unityInstance = UnityLoader.instantiate("unityContainer", "Build/YourBuild.json");
```

## Recommended File Structure
```
your-web-ar-project/
├── index.html
├── styles.css
├── js/
│   ├── app.js
│   ├── camera.js
│   ├── detection.js
│   ├── ar-renderer.js
│   └── dinosaur-data.js
├── models/          # GLTF/GLB files here
│   ├── triceratops.glb
│   ├── tyrannosaurus.glb
│   └── ...
└── README.md
```

## GLTF Export Settings
- **Format**: GLB (binary) for smaller file sizes
- **Materials**: Include materials and textures
- **Animations**: ✅ **Export animations** for walking, idle, roaring
- **Scale**: Adjust scale for web AR (usually 0.1 to 1.0)
- **Optimization**: Enable compression for web delivery

### Animation Export Settings:
- **Include Animations**: ✅ Check this box
- **Animation Clips**: Select all dinosaur animations
- **Compression**: Use for smaller file sizes
- **Bake Animations**: Recommended for complex rigs
