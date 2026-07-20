document.addEventListener('DOMContentLoaded', () => {
    // Parallax effect
    const wrapper = document.querySelector('.parallax-wrapper');
    const layers = document.querySelectorAll('.layer');

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2);
        const y = (e.clientY - window.innerHeight / 2);

        layers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed'));
            const xOffset = -(x * speed);
            const yOffset = -(y * speed);
            layer.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // AI Worker Logic
    const workersContainer = document.getElementById('workers-container');
    const robotTemplate = document.getElementById('robot-template');
    const unitCountSpan = document.getElementById('unit-count');
    
    const numWorkers = 8;
    const workers = [];

    // Initialize Workers
    for (let i = 0; i < numWorkers; i++) {
        spawnWorker(i);
    }
    
    function spawnWorker(index) {
        // Clone the SVG template
        const svgClone = robotTemplate.cloneNode(true);
        svgClone.removeAttribute('id');
        svgClone.style.display = 'block';
        
        const workerDiv = document.createElement('div');
        workerDiv.classList.add('ai-worker', 'walking');
        workerDiv.appendChild(svgClone);
        
        // Random starting position
        const startX = Math.random() * window.innerWidth;
        workerDiv.style.left = `${startX}px`;
        
        // Give them a slightly random scale for depth perception
        const scale = 0.6 + (Math.random() * 0.4);
        workerDiv.style.transform = `scale(${scale})`;
        workerDiv.dataset.scale = scale;
        
        workersContainer.appendChild(workerDiv);
        
        const workerData = {
            element: workerDiv,
            x: startX,
            speed: (Math.random() * 1.5 + 0.5) * (Math.random() > 0.5 ? 1 : -1), // Random direction
            state: 'walking', // 'walking' or 'working'
            timer: 0
        };
        
        workers.push(workerData);
        unitCountSpan.innerText = workers.length;
    }

    // Animation Loop
    function updateWorkers() {
        workers.forEach(w => {
            if (w.state === 'walking') {
                w.x += w.speed;
                w.element.style.left = `${w.x}px`;
                
                // Keep the scale intact while flipping if going left
                const flip = w.speed < 0 ? -1 : 1;
                w.element.style.transform = `scaleX(${flip * w.dataset.scale}) scaleY(${w.dataset.scale})`;
                
                // Screen wrapping
                if (w.x > window.innerWidth + 100) w.x = -100;
                if (w.x < -100) w.x = window.innerWidth + 100;

                // Randomly stop to work
                if (Math.random() < 0.005) {
                    w.state = 'working';
                    w.timer = Math.floor(Math.random() * 150) + 50; // 50-200 frames of work
                    w.element.classList.remove('walking');
                }
            } else if (w.state === 'working') {
                w.timer--;
                if (w.timer <= 0) {
                    w.state = 'walking';
                    w.element.classList.add('walking');
                    // Maybe change direction
                    if (Math.random() > 0.5) w.speed *= -1;
                }
            }
        });
        
        requestAnimationFrame(updateWorkers);
    }
    
    updateWorkers();
});
