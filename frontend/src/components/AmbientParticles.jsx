import { useEffect } from 'react';

const AmbientParticles = () => {
    useEffect(() => {
        const createFloatingParticle = () => {
            const particle = document.createElement('div');
            const size = Math.random() * 4 + 2;
            const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: ${randomColor};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        opacity: 0;
        box-shadow: 0 0 ${size * 3}px ${randomColor};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;

            document.body.appendChild(particle);

            const duration = 5000 + Math.random() * 10000;
            const moveX = (Math.random() - 0.5) * 500;
            const moveY = (Math.random() - 0.5) * 500;

            particle.animate([
                { opacity: 0, transform: 'translate(0, 0) scale(0.5)' },
                { opacity: 0.6, transform: `translate(${moveX * 0.5}px, ${moveY * 0.5}px) scale(1)`, offset: 0.5 },
                { opacity: 0, transform: `translate(${moveX}px, ${moveY}px) scale(0.5)` }
            ], {
                duration: duration,
                easing: 'ease-in-out'
            }).onfinish = () => {
                particle.remove();
                setTimeout(createFloatingParticle, Math.random() * 2000);
            };
        };

        // Create initial particles
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => createFloatingParticle(), i * 100);
        }
    }, []);

    return null;
};

export default AmbientParticles;
