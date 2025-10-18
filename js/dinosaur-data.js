// Dinosaur Database with information and characteristics
window.DinosaurDatabase = {
    'triceratops': {
        name: 'Triceratops',
        description: 'A large herbivorous dinosaur with three horns on its head and a large bony frill. Triceratops was one of the last dinosaurs to exist before the mass extinction.',
        size: '8-9 meters long',
        period: 'Late Cretaceous (68-66 million years ago)',
        diet: 'Herbivore (plants)',
        characteristics: [
            'Three horns on the head',
            'Large bony frill',
            'Four-legged walker',
            'Herbivorous diet'
        ],
        modelPath: 'models/triceratops.glb',
        color: '#8B4513'
    },
    
    'tyrannosaurus': {
        name: 'Tyrannosaurus Rex',
        description: 'One of the largest land predators ever known. T-Rex had powerful jaws and tiny arms. It was the king of the dinosaurs!',
        size: '12-13 meters long',
        period: 'Late Cretaceous (68-66 million years ago)',
        diet: 'Carnivore (meat)',
        characteristics: [
            'Massive head with powerful jaws',
            'Tiny arms with two fingers',
            'Bipedal (walked on two legs)',
            'Sharp teeth for hunting'
        ],
        modelPath: 'models/T-Rex.glb',
        color: '#8B0000'
    },
    
    'stegosaurus': {
        name: 'Stegosaurus',
        description: 'A plant-eating dinosaur with distinctive plates along its back and spikes on its tail. It had a very small brain!',
        size: '9 meters long',
        period: 'Late Jurassic (155-150 million years ago)',
        diet: 'Herbivore (plants)',
        characteristics: [
            'Bony plates along the back',
            'Spikes on the tail',
            'Four-legged walker',
            'Small head with tiny brain'
        ],
        modelPath: 'models/stegosaurus.glb',
        color: '#228B22'
    },
    
    'brontosaurus': {
        name: 'Brontosaurus',
        description: 'A massive long-necked dinosaur that was one of the largest animals to ever walk the Earth. It spent most of its time eating plants.',
        size: '22 meters long',
        period: 'Late Jurassic (155-150 million years ago)',
        diet: 'Herbivore (plants)',
        characteristics: [
            'Very long neck',
            'Long tail',
            'Four thick legs',
            'Small head'
        ],
        modelPath: 'models/brontosaurus.glb',
        color: '#2F4F4F'
    },
    
    'spinosaurus': {
        name: 'Spinosaurus',
        description: 'A massive carnivorous dinosaur with a distinctive sail on its back. It was one of the largest predators ever known!',
        size: '15-18 meters long',
        period: 'Cretaceous (112-93 million years ago)',
        diet: 'Carnivore (fish and meat)',
        characteristics: [
            'Large sail on the back',
            'Crocodile-like snout',
            'Semi-aquatic lifestyle',
            'Fish-eating specialist'
        ],
        modelPath: 'models/spinosaurus.glb',
        color: '#8B4513'
    },
    
    'raptor': {
        name: 'Velociraptor',
        description: 'A small but intelligent predator with sharp claws. It was fast and agile, hunting in packs with other raptors.',
        size: '2 meters long',
        period: 'Late Cretaceous (75-71 million years ago)',
        diet: 'Carnivore (meat)',
        characteristics: [
            'Sharp claws on feet',
            'Intelligent hunter',
            'Fast runner',
            'Hunted in packs'
        ],
        modelPath: 'models/raptor.glb',
        color: '#FF6347'
    },
    
    'ankylosaurus': {
        name: 'Ankylosaurus',
        description: 'A heavily armored dinosaur with a club-like tail. It was like a living tank, protected by thick bony plates.',
        size: '6-8 meters long',
        period: 'Late Cretaceous (68-66 million years ago)',
        diet: 'Herbivore (plants)',
        characteristics: [
            'Heavy armor plating',
            'Club-like tail',
            'Low, wide body',
            'Herbivorous diet'
        ],
        modelPath: 'models/ankylosaurus.glb',
        color: '#8B4513'
    },
    
    'gallimimus': {
        name: 'Gallimimus',
        description: 'A fast-running dinosaur that looked like a large ostrich. It was one of the fastest dinosaurs ever known.',
        size: '6 meters long',
        period: 'Late Cretaceous (70 million years ago)',
        diet: 'Omnivore (plants and small animals)',
        characteristics: [
            'Very fast runner',
            'Ostrich-like appearance',
            'Long legs for speed',
            'Omnivorous diet'
        ],
        modelPath: 'models/gallimimus.glb',
        color: '#FFD700'
    },
    
    'pachycephalosaurus': {
        name: 'Pachycephalosaurus',
        description: 'A dinosaur with an incredibly thick skull dome. It may have used its head for head-butting contests.',
        size: '4-5 meters long',
        period: 'Late Cretaceous (70-66 million years ago)',
        diet: 'Herbivore (plants)',
        characteristics: [
            'Thick skull dome',
            'Head-butting behavior',
            'Bipedal walker',
            'Herbivorous diet'
        ],
        modelPath: 'models/pachycephalosaurus.glb',
        color: '#FF8C00'
    },
    
    'plesiosaurus': {
        name: 'Plesiosaurus',
        description: 'A marine reptile with a long neck and flippers. It lived in the ocean and was not actually a dinosaur.',
        size: '3-5 meters long',
        period: 'Early Jurassic (200 million years ago)',
        diet: 'Carnivore (fish)',
        characteristics: [
            'Long neck',
            'Flipper-like limbs',
            'Marine lifestyle',
            'Fish-eating specialist'
        ],
        modelPath: 'models/plesiasaurus.glb',
        color: '#20B2AA'
    },
    
    'ichthyosaur': {
        name: 'Ichthyosaur',
        description: 'A dolphin-like marine reptile that lived in the oceans. It was perfectly adapted for swimming.',
        size: '2-4 meters long',
        period: 'Triassic to Cretaceous (250-90 million years ago)',
        diet: 'Carnivore (fish)',
        characteristics: [
            'Dolphin-like body',
            'Flipper-like limbs',
            'Marine lifestyle',
            'Fish-eating specialist'
        ],
        modelPath: 'models/ichthyosaur.glb',
        color: '#4682B4'
    },
    
    'mozazaur': {
        name: 'Mosasaurus',
        description: 'A massive marine reptile that ruled the oceans. It was one of the largest sea predators ever known.',
        size: '15-18 meters long',
        period: 'Late Cretaceous (70-66 million years ago)',
        diet: 'Carnivore (fish and marine animals)',
        characteristics: [
            'Massive size',
            'Powerful jaws',
            'Marine lifestyle',
            'Top ocean predator'
        ],
        modelPath: 'models/mozazaur.glb',
        color: '#2E8B57'
    }
};

// Helper functions for dinosaur data
window.DinosaurUtils = {
    // Get random dinosaur fact
    getRandomFact: function(dinosaurType) {
        const dino = window.DinosaurDatabase[dinosaurType];
        if (!dino) return 'This is a mysterious dinosaur!';
        
        const facts = [
            `The ${dino.name} lived during the ${dino.period}`,
            `${dino.name} was ${dino.size} and ate ${dino.diet}`,
            `Did you know? ${dino.characteristics[0]}`,
            `The ${dino.name} was a ${dino.diet}`
        ];
        
        return facts[Math.floor(Math.random() * facts.length)];
    },
    
    // Get dinosaur by characteristics
    getDinosaurByCharacteristics: function(characteristics) {
        const matches = [];
        
        Object.keys(window.DinosaurDatabase).forEach(type => {
            const dino = window.DinosaurDatabase[type];
            let score = 0;
            
            characteristics.forEach(char => {
                if (dino.characteristics.some(c => c.toLowerCase().includes(char.toLowerCase()))) {
                    score++;
                }
            });
            
            if (score > 0) {
                matches.push({ type, score, dinosaur: dino });
            }
        });
        
        return matches.sort((a, b) => b.score - a.score);
    },
    
    // Get all dinosaur names
    getAllNames: function() {
        return Object.values(window.DinosaurDatabase).map(dino => dino.name);
    },
    
    // Get dinosaur by name
    getByName: function(name) {
        return Object.values(window.DinosaurDatabase).find(dino => 
            dino.name.toLowerCase() === name.toLowerCase()
        );
    }
};
