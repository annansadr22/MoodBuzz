// Mood Player JavaScript - Universal for all mood pages

class MoodPlayer {
    constructor() {
        this.playButton = document.getElementById('playButton');
        this.volumeBars = document.querySelectorAll('.volume-bars .bar');
        this.progressFill = document.querySelector('.progress-fill');
        this.isPlaying = false;
        this.currentVolume = 3;
        
        this.init();
    }

    init() {
        this.playButton.addEventListener('click', () => this.togglePlayPause());
        this.animateVolumeDisplay();
        this.animateProgressBar();
        this.addInteractiveEffects();
    }

    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        
        if (this.isPlaying) {
            this.playButton.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
            `;
            this.startVolumeAnimation();
        } else {
            this.playButton.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            `;
            this.stopVolumeAnimation();
        }
        
        this.addButtonPulse();
    }

    startVolumeAnimation() {
        this.volumeInterval = setInterval(() => {
            this.volumeBars.forEach((bar, index) => {
                const shouldBeActive = Math.random() > 0.3 && index <= this.currentVolume;
                bar.classList.toggle('active', shouldBeActive);
            });
        }, 200);
    }

    stopVolumeAnimation() {
        clearInterval(this.volumeInterval);
        this.volumeBars.forEach((bar, index) => {
            bar.classList.toggle('active', index <= this.currentVolume);
        });
    }

    animateVolumeDisplay() {
        // Initial volume display
        this.volumeBars.forEach((bar, index) => {
            bar.classList.toggle('active', index <= this.currentVolume);
        });
    }

    animateProgressBar() {
        // Progress bar animation is handled via CSS
        // This could be extended for actual audio integration
    }

    addButtonPulse() {
        this.playButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.playButton.style.transform = 'scale(1)';
        }, 150);
    }

    addInteractiveEffects() {
        // Add hover effects to activity cards
        const activityCards = document.querySelectorAll('.activity-card');
        
        activityCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(-3px) scale(1)';
            });
            
            card.addEventListener('click', () => {
                this.addCardClickEffect(card);
            });
        });
        
        // Add floating animation to mood icons
        const moodIcon = document.querySelector('.mood-icon');
        if (moodIcon) {
            setInterval(() => {
                moodIcon.style.transform = 'translateY(-5px)';
                setTimeout(() => {
                    moodIcon.style.transform = 'translateY(0px)';
                }, 500);
            }, 3000);
        }
    }

    addCardClickEffect(card) {
        card.style.transform = 'translateY(-3px) scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        }, 100);
    }
}

// Mood-specific enhancements
class MoodEnhancer {
    constructor() {
        this.moodType = this.detectMoodType();
        this.init();
    }

    detectMoodType() {
        const body = document.body;
        if (body.classList.contains('happy-mood')) return 'happy';
        if (body.classList.contains('sad-mood')) return 'sad';
        if (body.classList.contains('angry-mood')) return 'angry';
        if (body.classList.contains('neutral-mood')) return 'neutral';
        if (body.classList.contains('fear-mood')) return 'fear';
        if (body.classList.contains('disgust-mood')) return 'disgust';
        if (body.classList.contains('surprise-mood')) return 'surprise';
        return 'neutral';
    }

    init() {
        this.addMoodSpecificEffects();
        this.enhanceBackgroundAnimations();
    }

    addMoodSpecificEffects() {
        switch (this.moodType) {
            case 'happy':
                this.addHappyEffects();
                break;
            case 'sad':
                this.addSadEffects();
                break;
            case 'angry':
                this.addAngryEffects();
                break;
            case 'fear':
                this.addFearEffects();
                break;
            case 'disgust':
                this.addDisgustEffects();
                break;
            case 'surprise':
                this.addSurpriseEffects();
                break;
            default:
                this.addNeutralEffects();
        }
    }

    addHappyEffects() {
        // Add sparkle effect on click
        document.addEventListener('click', (e) => {
            this.createSparkle(e.clientX, e.clientY, '#ffcc02');
        });
    }

    addSadEffects() {
        // Add gentle ripple effect
        document.addEventListener('click', (e) => {
            this.createRipple(e.clientX, e.clientY, '#4a90e2');
        });
    }

    addAngryEffects() {
        // Add fire particle effect
        document.addEventListener('click', (e) => {
            this.createFireParticle(e.clientX, e.clientY);
        });
    }

    addFearEffects() {
        // Add glitch effect on hover
        const elements = document.querySelectorAll('.mood-card, .activity-card');
        elements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.animation = 'glitch 0.5s ease-in-out';
            });
            el.addEventListener('mouseleave', () => {
                el.style.animation = '';
            });
        });
    }

    addDisgustEffects() {
        // Add bubble effect
        document.addEventListener('click', (e) => {
            this.createBubble(e.clientX, e.clientY, '#4caf50');
        });
    }

    addSurpriseEffects() {
        // Add electric spark effect
        document.addEventListener('click', (e) => {
            this.createElectricSpark(e.clientX, e.clientY);
        });
    }

    addNeutralEffects() {
        // Add calm wave effect
        document.addEventListener('click', (e) => {
            this.createCalmWave(e.clientX, e.clientY);
        });
    }

    createSparkle(x, y, color) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 8px;
            height: 8px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: sparkleAnimation 1s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }

    createRipple(x, y, color) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border: 2px solid ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: rippleAnimation 1s ease-out forwards;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 1000);
    }

    createFireParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 6px;
            height: 6px;
            background: radial-gradient(circle, #ff4500, #dc143c);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: fireParticleAnimation 1.5s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1500);
    }

    createBubble(x, y, color) {
        const bubble = document.createElement('div');
        bubble.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, ${color}33, transparent);
            border: 2px solid ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: bubbleAnimation 2s ease-out forwards;
        `;
        
        document.body.appendChild(bubble);
        
        setTimeout(() => bubble.remove(), 2000);
    }

    createElectricSpark(x, y) {
        const spark = document.createElement('div');
        spark.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 20px;
            background: linear-gradient(to bottom, #ff1744, #ff4081);
            pointer-events: none;
            z-index: 1000;
            animation: sparkAnimation 0.5s ease-out forwards;
        `;
        
        document.body.appendChild(spark);
        
        setTimeout(() => spark.remove(), 500);
    }

    createCalmWave(x, y) {
        const wave = document.createElement('div');
        wave.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border: 1px solid rgba(149, 165, 166, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: waveAnimation 2s ease-out forwards;
        `;
        
        document.body.appendChild(wave);
        
        setTimeout(() => wave.remove(), 2000);
    }

    enhanceBackgroundAnimations() {
        // Add dynamic background interactions
        const animatedBg = document.querySelector('.animated-bg');
        if (animatedBg) {
            animatedBg.addEventListener('mousemove', (e) => {
                const rect = animatedBg.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                
                // Modify animation speeds based on mouse position
                const children = animatedBg.children;
                for (let i = 0; i < children.length; i++) {
                    const child = children[i];
                    const speed = 0.5 + (x + y) * 0.5;
                    child.style.animationDuration = `${speed * 2}s`;
                }
            });
        }
    }
}

// CSS animations for effects
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes sparkleAnimation {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
    }
    
    @keyframes rippleAnimation {
        0% { width: 0; height: 0; opacity: 1; }
        100% { width: 100px; height: 100px; opacity: 0; margin-left: -50px; margin-top: -50px; }
    }
    
    @keyframes fireParticleAnimation {
        0% { transform: scale(1) translateY(0); opacity: 1; }
        100% { transform: scale(0.5) translateY(-50px); opacity: 0; }
    }
    
    @keyframes bubbleAnimation {
        0% { transform: scale(0) translateY(0); opacity: 1; }
        100% { transform: scale(1.5) translateY(-100px); opacity: 0; }
    }
    
    @keyframes sparkAnimation {
        0% { transform: scale(1) rotate(0deg); opacity: 1; }
        50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
    }
    
    @keyframes waveAnimation {
        0% { width: 0; height: 0; opacity: 1; }
        100% { width: 150px; height: 150px; opacity: 0; margin-left: -75px; margin-top: -75px; }
    }
    
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(styleSheet);

// Initialize both classes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MoodPlayer();
    new MoodEnhancer();
});