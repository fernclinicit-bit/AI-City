document.addEventListener('DOMContentLoaded', () => {
    // We want to dynamically draw the lines from each platform to the central brain
    const brain = document.querySelector('.central-brain');
    const platforms = document.querySelectorAll('.platform:not(.central-brain)');
    const lines = document.querySelectorAll('.data-lines .line');
    const packets = document.querySelectorAll('.data-lines .packet');

    function updateLines() {
        const brainRect = brain.getBoundingClientRect();
        const brainX = brainRect.left + brainRect.width / 2;
        const brainY = brainRect.top + brainRect.height / 2;

        platforms.forEach((p, index) => {
            if(index >= lines.length) return;

            const pRect = p.getBoundingClientRect();
            // Start line from the center bottom of the platform
            const pX = pRect.left + pRect.width / 2;
            const pY = pRect.top + pRect.height / 2;

            // Draw line
            const path = `M ${pX},${pY} L ${brainX},${brainY}`;
            lines[index].setAttribute('d', path);

            // Animate packet
            animatePacket(packets[index], pX, pY, brainX, brainY);
        });
    }

    function animatePacket(packet, startX, startY, endX, endY) {
        // Simple linear interpolation animation using requestAnimationFrame
        let progress = Math.random(); // Start at random point
        const speed = 0.005 + (Math.random() * 0.005); // Random speed

        function step() {
            progress += speed;
            if (progress >= 1) progress = 0;

            const currentX = startX + (endX - startX) * progress;
            const currentY = startY + (endY - startY) * progress;

            packet.setAttribute('cx', currentX);
            packet.setAttribute('cy', currentY);

            requestAnimationFrame(step);
        }
        step();
    }

    // Small delay to ensure CSS positions are applied before calculating rects
    setTimeout(updateLines, 100);

    window.addEventListener('resize', () => {
        // When window resizes, lines should recalculate (though isometric container is fixed 1000x800, 
        // bounding client rect changes based on center positioning).
        location.reload(); // simple brute force for resize on static infographic
    });

    // Simple car animation on the road
    const cars = document.querySelectorAll('.car');
    cars.forEach(car => {
        let x = parseInt(getComputedStyle(car).left);
        let direction = 1;
        setInterval(() => {
            x += direction * 2;
            if (x > 140 || x < 10) {
                direction *= -1; // reverse
                // Swap lanes visually by changing top (which is left in rotated space)
                car.style.bottom = direction === 1 ? '50%' : '30%';
            }
            car.style.left = `${x}px`;
        }, 50);
    });
});
