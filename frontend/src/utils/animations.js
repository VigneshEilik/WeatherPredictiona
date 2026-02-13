// Sparkle Burst Effect
export const createSparkleBurst = (count, colors) => {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            const size = Math.random() * 8 + 4;
            const color = colors[Math.floor(Math.random() * colors.length)];

            sparkle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        top: 50%;
        left: 50%;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9997;
        box-shadow: 0 0 ${size * 6}px ${color};
      `;

            document.body.appendChild(sparkle);

            const angle = (Math.PI * 2 * i) / count;
            const distance = 100 + Math.random() * 200;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            sparkle.animate([
                { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: 1 },
                { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1) rotate(360deg)`, opacity: 1, offset: 0.7 },
                { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0) rotate(720deg)`, opacity: 0 }
            ], {
                duration: 1500,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => sparkle.remove();
        }, i * 20);
    }
};

// Confetti Celebration
export const createConfettiCelebration = () => {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#ff9a56', '#a8edea'];

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            createEnhancedConfetti(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 15);
    }
};

// Enhanced Confetti
const createEnhancedConfetti = (color) => {
    const confetti = document.createElement('div');
    const size = Math.random() * 12 + 6;
    const shapes = ['circle', 'square'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    confetti.style.cssText = `
    position: fixed;
    width: ${size}px;
    height: ${size}px;
    background: ${color};
    border-radius: ${shape === 'circle' ? '50%' : '0'};
    top: -20px;
    left: ${Math.random() * 100}%;
    opacity: 1;
    pointer-events: none;
    z-index: 9996;
    box-shadow: 0 0 ${size * 2}px ${color};
  `;

    document.body.appendChild(confetti);

    const duration = 2500 + Math.random() * 1500;
    const startX = parseFloat(confetti.style.left);
    const endX = startX + (Math.random() - 0.5) * 300;
    const rotation = Math.random() * 720;
    const wobble = Math.sin(Math.random() * Math.PI * 2) * 100;

    confetti.animate([
        { transform: `translate(0, 0) rotate(0deg) scale(1)`, opacity: 1 },
        { transform: `translate(${wobble}px, ${window.innerHeight / 2}px) rotate(${rotation / 2}deg) scale(1.2)`, opacity: 1, offset: 0.5 },
        { transform: `translate(${endX - startX}px, ${window.innerHeight + 50}px) rotate(${rotation}deg) scale(0.8)`, opacity: 0 }
    ], {
        duration: duration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => confetti.remove();
};

// Fireworks Effect
export const createFireworks = () => {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const colors = ['#667eea', '#f093fb', '#4facfe', '#ff9a56'];
            const x = 20 + Math.random() * 60;
            const y = 20 + Math.random() * 40;
            createFireworkBurst(x, y, colors[Math.floor(Math.random() * colors.length)]);
        }, i * 400);
    }
};

const createFireworkBurst = (x, y, color) => {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;

        particle.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      top: ${y}%;
      left: ${x}%;
      pointer-events: none;
      z-index: 9995;
      box-shadow: 0 0 ${size * 5}px ${color};
    `;

        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = 80 + Math.random() * 120;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;

        particle.animate([
            { transform: 'translate(0, 0) scale(0)', opacity: 1 },
            { transform: `translate(${endX}px, ${endY}px) scale(1)`, opacity: 1, offset: 0.6 },
            { transform: `translate(${endX}px, ${endY + 100}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1200,
            easing: 'cubic-bezier(0.4, 0, 0.6, 1)'
        }).onfinish = () => particle.remove();
    }
};
