document.addEventListener('DOMContentLoaded', () => {
    // Initialize Building Faces
    const buildings = document.querySelectorAll('.building');
    const unit = 20; // Matches var(--unit) in CSS

    buildings.forEach(b => {
        // Skip central tower since it's hardcoded for special look
        if (b.classList.contains('central-tower')) return;

        const h = parseInt(b.getAttribute('data-height') || 5);
        const heightPx = h * unit;
        // Randomize width and depth slightly for variety
        const w = (Math.floor(Math.random() * 2) + 1) * unit; 
        const d = (Math.floor(Math.random() * 2) + 1) * unit;

        const front = b.querySelector('.front');
        const back = b.querySelector('.back');
        const right = b.querySelector('.right');
        const left = b.querySelector('.left');
        const top = b.querySelector('.top');

        if (front && back && right && left && top) {
            // Set dimensions
            [front, back].forEach(face => {
                face.style.width = `${w}px`;
                face.style.height = `${heightPx}px`;
            });
            [right, left].forEach(face => {
                face.style.width = `${d}px`;
                face.style.height = `${heightPx}px`;
            });
            top.style.width = `${w}px`;
            top.style.height = `${d}px`;

            // Position faces in 3D
            front.style.transform = `rotateY(0deg) translateZ(${d/2}px)`;
            back.style.transform = `rotateY(180deg) translateZ(${d/2}px)`;
            right.style.transform = `rotateY(90deg) translateZ(${w/2}px)`;
            left.style.transform = `rotateY(-90deg) translateZ(${w/2}px)`;
            top.style.transform = `rotateX(90deg) translateZ(${heightPx/2}px)`;

            // Adjust building center base
            // To make the building stand up from the grid, we elevate it by height/2
            b.style.transform += ` translateZ(${heightPx/2}px)`;
            
            // Randomly add a glow effect to some buildings
            if (Math.random() > 0.5) {
                top.style.background = 'rgba(0, 240, 255, 0.6)';
                top.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.8)';
            }
        }
    });

    // Create Data Streams
    const streamsContainer = document.querySelector('.data-streams');
    function createStream() {
        const stream = document.createElement('div');
        stream.classList.add('stream');
        
        const isHorizontal = Math.random() > 0.5;
        
        if (isHorizontal) {
            stream.style.width = '60px';
            stream.style.height = '2px';
            stream.style.top = `${(Math.floor(Math.random() * 20) - 10) * 40}px`; // align to grid
            stream.style.left = '0';
            stream.style.animation = `stream-x ${Math.random() * 2 + 2}s linear forwards`;
        } else {
            stream.style.width = '2px';
            stream.style.height = '60px';
            stream.style.left = `${(Math.floor(Math.random() * 10) - 5) * 40}px`;
            stream.style.top = '0';
            stream.style.animation = `stream-y ${Math.random() * 2 + 2}s linear forwards`;
        }

        streamsContainer.appendChild(stream);

        // Remove after animation completes
        setTimeout(() => {
            stream.remove();
        }, 4000);
    }

    // Generate streams periodically
    setInterval(createStream, 400);

    // Create Glowing Spots on Grid Intersections
    for(let i = 0; i < 5; i++) {
        const spot = document.createElement('div');
        spot.classList.add('glow-spot');
        spot.style.left = `${(Math.floor(Math.random() * 10) - 5) * 40 - 20}px`;
        spot.style.top = `${(Math.floor(Math.random() * 20) - 10) * 40 - 20}px`;
        spot.style.animationDelay = `${Math.random() * 2}s`;
        streamsContainer.appendChild(spot);
    }

    // --- AI Workers Logic ---
    const cityContainer = document.querySelector('.city-container');
    const numWorkers = 15;
    
    for (let i = 0; i < numWorkers; i++) {
        createWorker();
    }

    function createWorker() {
        const worker = document.createElement('div');
        worker.classList.add('worker');
        
        // Start position on the grid
        let currentX = (Math.floor(Math.random() * 10) - 5) * 40;
        let currentY = (Math.floor(Math.random() * 10) - 5) * 40;
        
        worker.style.left = `${currentX}px`;
        worker.style.top = `${currentY}px`;
        
        cityContainer.appendChild(worker);
        
        // Movement loop
        setInterval(() => {
            // Move by 1 grid cell (40px) randomly in X or Y
            if (Math.random() > 0.5) {
                currentX += (Math.random() > 0.5 ? 40 : -40);
            } else {
                currentY += (Math.random() > 0.5 ? 40 : -40);
            }
            
            // Keep within bounds roughly
            currentX = Math.max(-200, Math.min(200, currentX));
            currentY = Math.max(-300, Math.min(300, currentY));
            
            worker.style.left = `${currentX}px`;
            worker.style.top = `${currentY}px`;
        }, 3000 + Math.random() * 2000); // Move every 3-5 seconds
    }

    // Parallax Interaction
    const phone = document.querySelector('.phone');
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        
        // Base phone tilt is rotateX(60deg) rotateZ(-30deg)
        // Add mouse offset
        phone.style.transform = `rotateX(${60 + yAxis}deg) rotateZ(${-30 + xAxis}deg) translateZ(0px)`;
    });

    // Reset rotation on mouse leave
    document.addEventListener('mouseleave', () => {
        phone.style.transform = `rotateX(60deg) rotateZ(-30deg) translateZ(0px)`;
    });
});
