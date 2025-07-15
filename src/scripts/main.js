// Main JavaScript for MoodBuzz Homepage

class MoodBuzz {
    constructor() {
        this.scanButton = document.getElementById('scanButton');
        this.cameraPreview = document.getElementById('cameraPreview');
        this.cameraPrompt = document.getElementById('cameraPrompt');
        this.moodProcessing = document.getElementById('moodProcessing');
        this.videoElement = document.getElementById('videoElement');
        this.stream = null;
        this.isScanning = false;
        
        this.init();
    }

    init() {
        this.scanButton.addEventListener('click', () => this.handleScanClick());
        this.addButtonRippleEffect();
        this.animateVolumeDisplay();
    }

    async handleScanClick() {
        if (this.isScanning) return;
        
        this.isScanning = true;
        this.scanButton.disabled = true;
        
        try {
            // Request camera access
            await this.requestCameraAccess();
            
            // Start mood detection process
            await this.startMoodDetection();
            
        } catch (error) {
            console.error('Error accessing camera:', error);
            this.showError('Camera access denied. Please allow camera permissions and try again.');
        } finally {
            this.isScanning = false;
            this.scanButton.disabled = false;
        }
    }

    async requestCameraAccess() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user',
                    width: { ideal: 640 },
                    height: { ideal: 480 }
                }
            });
            
            this.videoElement.srcObject = this.stream;
            this.cameraPrompt.style.display = 'none';
            this.cameraPreview.classList.add('active');
            
            // Wait for video to load
            return new Promise((resolve) => {
                this.videoElement.onloadedmetadata = () => {
                    resolve();
                };
            });
        } catch (error) {
            throw new Error('Camera access denied');
        }
    }

    async startMoodDetection() {
        // Hide scan button and show processing
        this.scanButton.style.display = 'none';
        this.moodProcessing.classList.add('active');

        // Capture frame from video
        const canvas = document.createElement('canvas');
        canvas.width = this.videoElement.videoWidth;
        canvas.height = this.videoElement.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.videoElement, 0, 0, canvas.width, canvas.height);

        // Convert canvas to Blob
        canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append("file", blob, "frame.jpg");

            try {
                const response = await fetch("http://127.0.0.1:8000/predict-emotion/", {
                    method: "POST",
                    body: formData
                });

                if (!response.ok) throw new Error("Server error");

                const result = await response.json();
                const detectedMood = result.mood || "neutral"; // Fallback
                this.redirectToMoodPage(detectedMood);
            } catch (err) {
                console.error("❌ Mood detection failed:", err);
                this.showError("AI mood detection failed. Please try again.");
            } finally {
                // Stop the stream and hide loading
                if (this.stream) {
                    this.stream.getTracks().forEach(track => track.stop());
                }
                this.moodProcessing.classList.remove('active');
            }
        }, "image/jpeg");
    }


    

    redirectToMoodPage(mood) {
        // Add a slight delay for better UX
        setTimeout(() => {
            window.location.href = `${mood}.html`;
        }, 1000);
    }

    showError(message) {
        this.moodProcessing.classList.remove('active');
        this.scanButton.style.display = 'block';
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-content">
                <h3>⚠️ Error</h3>
                <p>${message}</p>
            </div>
        `;
        
        // Add error styles
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 0, 0, 0.1);
            border: 2px solid rgba(255, 0, 0, 0.5);
            border-radius: 15px;
            padding: 2rem;
            z-index: 1000;
            text-align: center;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(errorDiv);
        
        // Remove error after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    addButtonRippleEffect() {
        this.scanButton.addEventListener('click', (e) => {
            const button = e.currentTarget;
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('span');
            ripple.className = 'button-ripple';
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    animateVolumeDisplay() {
        // Animate volume bars on the info section
        const volumeBars = document.querySelectorAll('.volume-bars .bar');
        let currentBar = 0;
        
        setInterval(() => {
            volumeBars.forEach((bar, index) => {
                bar.classList.toggle('active', index <= currentBar);
            });
            
            currentBar = (currentBar + 1) % volumeBars.length;
        }, 800);
    }
}

// Initialize MoodBuzz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MoodBuzz();
});

// Add some ambient interaction effects
document.addEventListener('DOMContentLoaded', () => {
    // Add floating particles interaction
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach(particle => {
        particle.addEventListener('mouseenter', () => {
            particle.style.transform = 'scale(1.5)';
            particle.style.opacity = '1';
        });
        
        particle.addEventListener('mouseleave', () => {
            particle.style.transform = 'scale(1)';
            particle.style.opacity = '0.7';
        });
    });
    
    // Add cursor tracking for glass cards
    const glassCards = document.querySelectorAll('.glass-card');
    
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * 5;
            const rotateY = (centerX - x) / centerX * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
});