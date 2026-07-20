document.addEventListener('DOMContentLoaded', () => {
    // 1. Orthogonal Isometric Data Lines Animation
    const packets = document.querySelectorAll('.data-lines-iso .packet');
    
    // Each packet follows a path from its starting platform coordinate to the center (500,500)
    // The paths are defined in the SVG. We'll use getPointAtLength.
    const lines = document.querySelectorAll('.data-lines-iso .line');
    
    lines.forEach((line, index) => {
        if (!packets[index]) return;
        const packet = packets[index];
        const length = line.getTotalLength();
        let progress = Math.random() * length;
        const speed = 2 + Math.random() * 2;

        function animatePacket() {
            progress += speed;
            if (progress > length) progress = 0;
            
            const point = line.getPointAtLength(progress);
            packet.setAttribute('cx', point.x);
            packet.setAttribute('cy', point.y);
            
            requestAnimationFrame(animatePacket);
        }
        animatePacket();
    });

    // 2. Traffic Car Animation
    const cars = document.querySelectorAll('.car');
    cars.forEach(car => {
        let y = parseInt(getComputedStyle(car).bottom) || 50;
        let direction = 1;
        setInterval(() => {
            y += direction * 2;
            if (y > 90 || y < 10) {
                direction *= -1;
                car.style.left = direction === 1 ? '10%' : '30%'; // swap lanes
            }
            car.style.bottom = `${y}%`;
        }, 50);
    });

    // 3. Robot Workers Animation (Isometric)
    const robotsContainer = document.getElementById('robots-container');
    const template = document.getElementById('robot-template');
    const numRobots = 5;
    
    for (let i = 0; i < numRobots; i++) {
        spawnRobot();
    }

    function spawnRobot() {
        const svgClone = template.cloneNode(true);
        svgClone.removeAttribute('id');
        svgClone.style.display = 'block';

        const bot = document.createElement('div');
        bot.classList.add('ai-worker', 'walking');
        bot.appendChild(svgClone);

        // Randomly place near center brain
        let currentX = 400 + Math.random() * 200;
        let currentY = 400 + Math.random() * 200;
        bot.style.left = `${currentX}px`;
        bot.style.top = `${currentY}px`;

        robotsContainer.appendChild(bot);

        // Movement logic
        let targetX = currentX;
        let targetY = currentY;

        function pickNewTarget() {
            // Walk to a random platform area (between 200 and 800)
            targetX = 200 + Math.random() * 600;
            targetY = 200 + Math.random() * 600;
        }
        pickNewTarget();

        function moveRobot() {
            const dx = targetX - currentX;
            const dy = targetY - currentY;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < 5) {
                // Arrived at target, wait then pick new
                bot.classList.remove('walking');
                setTimeout(() => {
                    pickNewTarget();
                    bot.classList.add('walking');
                    requestAnimationFrame(moveRobot);
                }, 2000 + Math.random() * 3000);
            } else {
                // Move towards target
                const speed = 1;
                currentX += (dx/dist) * speed;
                currentY += (dy/dist) * speed;
                
                bot.style.left = `${currentX}px`;
                bot.style.top = `${currentY}px`;
                
                // Flip SVG depending on X direction
                const scaleX = dx < 0 ? -1 : 1;
                // Keep the base transform but add the flip
                bot.style.transform = `rotateZ(45deg) rotateX(-90deg) translateY(-30px) scaleX(${scaleX})`;
                
                requestAnimationFrame(moveRobot);
            }
        }
        moveRobot();
    }
});
