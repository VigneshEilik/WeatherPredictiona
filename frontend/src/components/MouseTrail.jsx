import { useEffect } from 'react';

const MouseTrail = () => {
    useEffect(() => {
        const handleMouseMove = (e) => {
            const trail = document.createElement('div');
            const size = Math.random() * 8 + 4;
            const colors = ['#667eea80', '#764ba280', '#f093fb80', '#4facfe80'];

            trail.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        transform: translate(-50%, -50%);
      `;

            document.body.appendChild(trail);

            trail.animate([
                { opacity: 0.8, transform: 'translate(-50%, -50%) scale(1)' },
                { opacity: 0, transform: 'translate(-50%, -50%) scale(0)' }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => trail.remove();
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return null;
};

export default MouseTrail;
