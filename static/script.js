// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// DOM Elements
const form = document.getElementById('predictionForm');
const loadingState = document.getElementById('loadingState');
const results = document.getElementById('results');
const resultIcon = document.getElementById('resultIcon');
const resultText = document.getElementById('resultText');
const confidenceValue = document.getElementById('confidenceValue');
const confidenceProgress = document.getElementById('confidenceProgress');
const indoorProb = document.getElementById('indoorProb');
const outdoorProb = document.getElementById('outdoorProb');
const indoorProgress = document.getElementById('indoorProgress');
const outdoorProgress = document.getElementById('outdoorProgress');

// Create ambient particles on load
function createAmbientParticles() {
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            createFloatingParticle();
        }, i * 100);
    }
}

// Create floating particle
function createFloatingParticle() {
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
    `;

    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    document.body.appendChild(particle);

    const duration = 5000 + Math.random() * 10000;
    const moveX = (Math.random() - 0.5) * 500;
    const moveY = (Math.random() - 0.5) * 500;

    particle.animate([
        {
            opacity: 0,
            transform: 'translate(0, 0) scale(0.5)'
        },
        {
            opacity: 0.6,
            transform: `translate(${moveX * 0.5}px, ${moveY * 0.5}px) scale(1)`,
            offset: 0.5
        },
        {
            opacity: 0,
            transform: `translate(${moveX}px, ${moveY}px) scale(0.5)`
        }
    ], {
        duration: duration,
        easing: 'ease-in-out'
    }).onfinish = () => {
        particle.remove();
        // Create a new one to maintain count
        setTimeout(createFloatingParticle, Math.random() * 2000);
    };
}

// Mouse trail effect
let mouseTrailEnabled = true;
document.addEventListener('mousemove', (e) => {
    if (!mouseTrailEnabled) return;

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
});

// Form submission handler with enhanced effects
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Shake animation on submit
    form.style.animation = 'formSubmit 0.5s ease';

    // Get form data
    const formData = new FormData(form);
    const data = {
        outlook: formData.get('outlook'),
        temp: parseFloat(formData.get('temp')),
        humidity: parseFloat(formData.get('humidity')),
        windy: formData.get('windy')
    };

    // Validate inputs
    if (!data.outlook || isNaN(data.temp) || isNaN(data.humidity) || !data.windy) {
        showNotification('⚠️ Please fill in all fields correctly', 'error');
        form.style.animation = 'shake 0.5s ease';
        setTimeout(() => form.style.animation = '', 500);
        return;
    }

    // Show loading state with ripple effect
    createRippleEffect();
    form.style.display = 'none';
    loadingState.style.display = 'block';
    results.style.display = 'none';

    try {
        // Make API request
        const response = await fetch(`${API_BASE_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Prediction failed');
        }

        const result = await response.json();

        // Simulate processing with loading particles
        createLoadingParticles();

        setTimeout(() => {
            displayResults(result);
        }, 1200);

    } catch (error) {
        console.error('Error:', error);
        showNotification('❌ Failed to get prediction. Please try again.', 'error');
        form.style.display = 'flex';
        loadingState.style.display = 'none';
    }
});

// Create ripple effect
function createRippleEffect() {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.6), transparent);
        pointer-events: none;
        z-index: 999;
        transform: translate(-50%, -50%);
    `;

    document.body.appendChild(ripple);

    ripple.animate([
        { width: '20px', height: '20px', opacity: 0.8 },
        { width: '1000px', height: '1000px', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    }).onfinish = () => ripple.remove();
}

// Create loading particles
function createLoadingParticles() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            const size = Math.random() * 6 + 3;

            particle.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                top: 50%;
                left: 50%;
                pointer-events: none;
                z-index: 998;
                box-shadow: 0 0 ${size * 4}px ${colors[Math.floor(Math.random() * colors.length)]};
            `;

            document.body.appendChild(particle);

            const angle = (Math.PI * 2 * i) / 20;
            const distance = 150;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            particle.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
                { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`, opacity: 1, offset: 0.5 },
                { transform: `translate(calc(-50% + ${x * 2}px), calc(-50% + ${y * 2}px)) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }, i * 50);
    }
}

// Display results with spectacular animations
function displayResults(result) {
    loadingState.style.display = 'none';
    results.style.display = 'block';

    // Screen flash effect
    createScreenFlash();

    // Set result icon and text with animation
    if (result.prediction === 1) {
        resultIcon.textContent = '🌞';
        resultText.textContent = result.result;
        resultText.style.background = 'linear-gradient(135deg, #4facfe, #00f2fe, #a8edea)';
        resultText.style.webkitBackgroundClip = 'text';
        resultText.style.webkitTextFillColor = 'transparent';
        resultText.style.backgroundClip = 'text';
        resultText.style.backgroundSize = '200% auto';

        // Create sparkle burst
        createSparkleBurst(50, ['#4facfe', '#00f2fe', '#a8edea']);
    } else {
        resultIcon.textContent = '🏠';
        resultText.textContent = result.result;
        resultText.style.background = 'linear-gradient(135deg, #f093fb, #f5576c, #ff9a56)';
        resultText.style.webkitBackgroundClip = 'text';
        resultText.style.webkitTextFillColor = 'transparent';
        resultText.style.backgroundClip = 'text';
        resultText.style.backgroundSize = '200% auto';

        // Create sparkle burst
        createSparkleBurst(50, ['#f093fb', '#f5576c', '#ff9a56']);
    }

    // Animate confidence with counter
    animateValue(confidenceValue, 0, result.confidence, 1500, '%');
    setTimeout(() => {
        confidenceProgress.style.width = `${result.confidence}%`;
    }, 100);

    // Animate probabilities with counter
    setTimeout(() => {
        animateValue(indoorProb, 0, result.probabilities.stay_indoors, 1500, '%');
        animateValue(outdoorProb, 0, result.probabilities.go_outdoors, 1500, '%');

        setTimeout(() => {
            indoorProgress.style.width = `${result.probabilities.stay_indoors}%`;
            outdoorProgress.style.width = `${result.probabilities.go_outdoors}%`;
        }, 100);
    }, 300);

    // Massive confetti celebration
    setTimeout(() => {
        addMassiveCelebration();
    }, 500);

    // Fireworks effect
    setTimeout(() => {
        createFireworks();
    }, 800);
}

// Animate number counter
function animateValue(element, start, end, duration, suffix = '') {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (end - start) * easeOutQuart;

        element.textContent = Math.round(current) + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Screen flash effect
function createScreenFlash() {
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
        pointer-events: none;
        z-index: 9998;
    `;

    document.body.appendChild(flash);

    flash.animate([
        { opacity: 0 },
        { opacity: 1 },
        { opacity: 0 }
    ], {
        duration: 400,
        easing: 'ease-in-out'
    }).onfinish = () => flash.remove();
}

// Sparkle burst effect
function createSparkleBurst(count, colors) {
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
}

// Massive confetti celebration
function addMassiveCelebration() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#ff9a56', '#a8edea'];

    // Create 100 confetti pieces
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            createEnhancedConfetti(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 15);
    }
}

// Enhanced confetti
function createEnhancedConfetti(color) {
    const confetti = document.createElement('div');
    const size = Math.random() * 12 + 6;
    const shapes = ['circle', 'square', 'triangle'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    let shapeStyle = '';
    if (shape === 'circle') {
        shapeStyle = 'border-radius: 50%;';
    } else if (shape === 'triangle') {
        shapeStyle = `
            width: 0;
            height: 0;
            border-left: ${size / 2}px solid transparent;
            border-right: ${size / 2}px solid transparent;
            border-bottom: ${size}px solid ${color};
            background: transparent;
        `;
    }

    confetti.style.cssText = `
        position: fixed;
        width: ${shape === 'triangle' ? '0' : size + 'px'};
        height: ${shape === 'triangle' ? '0' : size + 'px'};
        background: ${shape === 'triangle' ? 'transparent' : color};
        ${shapeStyle}
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
        {
            transform: `translate(0, 0) rotate(0deg) scale(1)`,
            opacity: 1
        },
        {
            transform: `translate(${wobble}px, ${window.innerHeight / 2}px) rotate(${rotation / 2}deg) scale(1.2)`,
            opacity: 1,
            offset: 0.5
        },
        {
            transform: `translate(${endX - startX}px, ${window.innerHeight + 50}px) rotate(${rotation}deg) scale(0.8)`,
            opacity: 0
        }
    ], {
        duration: duration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => confetti.remove();
}

// Fireworks effect
function createFireworks() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const colors = ['#667eea', '#f093fb', '#4facfe', '#ff9a56'];
            const x = 20 + Math.random() * 60;
            const y = 20 + Math.random() * 40;
            createFireworkBurst(x, y, colors[Math.floor(Math.random() * colors.length)]);
        }, i * 400);
    }
}

function createFireworkBurst(x, y, color) {
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
}

// Reset form
function resetForm() {
    form.reset();
    form.style.display = 'flex';
    results.style.display = 'none';
    confidenceProgress.style.width = '0';
    indoorProgress.style.width = '0';
    outdoorProgress.style.width = '0';

    // Reset animation
    form.style.animation = 'popIn 0.5s ease';
}

// Enhanced notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        padding: 1.2rem 1.8rem;
        background: ${type === 'error' ? 'linear-gradient(135deg, #f093fb, #f5576c)' : 'linear-gradient(135deg, #4facfe, #00f2fe)'};
        color: white;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px ${type === 'error' ? 'rgba(240, 147, 251, 0.5)' : 'rgba(79, 172, 254, 0.5)'};
        z-index: 10000;
        font-weight: 700;
        font-size: 1.05rem;
        backdrop-filter: blur(10px);
    `;

    document.body.appendChild(notification);

    notification.animate([
        { transform: 'translateX(500px) scale(0.8)', opacity: 0 },
        { transform: 'translateX(0) scale(1)', opacity: 1 }
    ], {
        duration: 400,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
    });

    setTimeout(() => {
        notification.animate([
            { transform: 'translateX(0) scale(1)', opacity: 1 },
            { transform: 'translateX(500px) scale(0.8)', opacity: 0 }
        ], {
            duration: 300,
            easing: 'cubic-bezier(0.4, 0, 0.6, 1)'
        }).onfinish = () => notification.remove();
    }, 3500);
}

// Add shake animation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
    
    @keyframes formSubmit {
        0% { transform: scale(1); }
        50% { transform: scale(0.98); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(shakeStyle);

// Input validation with glow effect
const inputs = document.querySelectorAll('input[type="number"]');
inputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        const min = parseFloat(e.target.min);
        const max = parseFloat(e.target.max);

        if (value < min || value > max) {
            e.target.style.borderColor = '#f5576c';
            e.target.style.boxShadow = '0 0 20px rgba(245, 87, 108, 0.5)';
        } else {
            e.target.style.borderColor = '';
            e.target.style.boxShadow = '';
        }
    });

    // Pulse effect on focus
    input.addEventListener('focus', (e) => {
        e.target.style.animation = 'inputPulse 0.6s ease';
    });
});

const inputPulseStyle = document.createElement('style');
inputPulseStyle.textContent = `
    @keyframes inputPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
`;
document.head.appendChild(inputPulseStyle);

// Feature card mouse tracking
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    });
});

// Initialize on page load
window.addEventListener('load', () => {
    console.log('🎨 Climate Predictor AI - Ultra Edition');
    console.log('✨ Stunning animations activated');
    console.log('🚀 Ready to predict!');

    // Start ambient particles
    setTimeout(createAmbientParticles, 1000);

    // Welcome pulse effect
    const mainCard = document.querySelector('.main-card');
    if (mainCard) {
        mainCard.style.animation = 'cardFloat 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), welcomePulse 2s ease-in-out 1';
    }
});

const welcomePulseStyle = document.createElement('style');
welcomePulseStyle.textContent = `
    @keyframes welcomePulse {
        0%, 100% { box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4); }
        50% { box-shadow: 0 10px 60px rgba(102, 126, 234, 0.6), 0 0 80px rgba(102, 126, 234, 0.4); }
    }
`;
document.head.appendChild(welcomePulseStyle);
