// SMARANA Companion Avatar Canvas Engine with Speech Event Binding

class CompanionAvatarEngine {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.ctx = canvasElement ? canvasElement.getContext('2d') : null;
        this.animId = null;
        this.state = 'IDLE'; // State machine
        this.time = 0;
        this.mouthOpen = 0;
        this.isBlinking = false;
        this.blinkTimer = 0;
        this.speechText = "";
        this.config = window.smarnaStore ? window.smarnaStore.companion : {};

        // Auto bind audio speech events for lip sync
        if (window.smarnaAudio) {
            window.smarnaAudio.on('speakStart', ({ text }) => {
                this.setState('SPEAKING', text);
            });
            window.smarnaAudio.on('speakEnd', () => {
                this.setState('HAPPY');
            });
        }
    }

    setCanvas(canvas) {
        this.canvas = canvas;
        if (canvas) {
            this.ctx = canvas.getContext('2d');
            this.start();
        }
    }

    setState(newState, speech = "") {
        this.state = newState;
        if (speech) {
            this.speechText = speech;
        }
    }

    start() {
        if (this.animId) cancelAnimationFrame(this.animId);
        const loop = () => {
            this.time += 0.05;
            this.updateState();
            this.render();
            this.animId = requestAnimationFrame(loop);
        };
        loop();
    }

    stop() {
        if (this.animId) cancelAnimationFrame(this.animId);
    }

    updateState() {
        // Periodic blinking logic
        this.blinkTimer += 0.05;
        if (this.blinkTimer > 3.5) {
            this.isBlinking = true;
            if (this.blinkTimer > 3.7) {
                this.isBlinking = false;
                this.blinkTimer = 0;
            }
        }

        // Mouth movement during speaking
        if (this.state === 'SPEAKING' || window.smarnaAudio?.isSpeaking) {
            this.mouthOpen = Math.abs(Math.sin(this.time * 9)) * 15;
        } else {
            this.mouthOpen = 0;
        }
    }

    render() {
        if (!this.canvas || !this.ctx) return;
        const w = this.canvas.width;
        const h = this.canvas.height;
        const ctx = this.ctx;
        const cfg = window.smarnaStore.companion || this.config;

        ctx.clearRect(0, 0, w, h);

        const breathOffset = Math.sin(this.time * 2) * 4;
        const isCat = cfg.type === 'Cat';

        ctx.save();
        ctx.translate(w / 2, h / 2 + (this.state === 'IDLE' ? breathOffset : 0));

        if (isCat) {
            this.renderCat(ctx, cfg);
        } else {
            this.renderHumanoid(ctx, cfg);
        }

        if (this.state === 'CELEBRATING' || this.state === 'EXCITED') {
            this.renderSparkles(ctx, w, h);
        }

        ctx.restore();
    }

    renderHumanoid(ctx, cfg) {
        const skinColor = cfg.appearance?.skinTone || '#E8B993';
        const hairColor = cfg.appearance?.hairColor || '#1A1818';
        const outfitColor = cfg.appearance?.outfitColor || '#C0392B';
        const isFemale = cfg.gender === 'female' || cfg.type === 'Granddaughter';

        // Body / Outfit
        ctx.fillStyle = outfitColor;
        ctx.beginPath();
        ctx.ellipse(0, 110, 75, 55, 0, Math.PI, 0);
        ctx.fill();

        // Saree gold border / collar accent
        ctx.strokeStyle = '#F1C40F';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(-55, 110);
        ctx.lineTo(0, 60);
        ctx.lineTo(55, 110);
        ctx.stroke();

        // Neck
        ctx.fillStyle = skinColor;
        ctx.fillRect(-14, 30, 28, 35);

        // Head / Face
        ctx.beginPath();
        ctx.ellipse(0, -10, 52, 58, 0, 0, Math.PI * 2);
        ctx.fill();

        // Ears
        ctx.beginPath();
        ctx.ellipse(-52, -10, 10, 14, 0, 0, Math.PI * 2);
        ctx.ellipse(52, -10, 10, 14, 0, 0, Math.PI * 2);
        ctx.fill();

        // Earrings (if enabled)
        if (cfg.appearance?.accessories?.includes('earrings')) {
            ctx.fillStyle = '#F1C40F';
            ctx.beginPath();
            ctx.arc(-54, 4, 6, 0, Math.PI * 2);
            ctx.arc(54, 4, 6, 0, Math.PI * 2);
            ctx.fill();
        }

        // Hair Back / Bun / Braid
        ctx.fillStyle = hairColor;
        if (isFemale) {
            ctx.beginPath();
            ctx.ellipse(0, -35, 56, 38, 0, Math.PI, 0);
            ctx.fill();

            ctx.beginPath();
            ctx.ellipse(-48, 10, 14, 45, 0.2, 0, Math.PI * 2);
            ctx.ellipse(48, 10, 14, 45, -0.2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.ellipse(0, -32, 55, 32, 0, Math.PI, 0);
            ctx.fill();
        }

        // Bindi
        if (cfg.appearance?.accessories?.includes('bindi') && isFemale) {
            ctx.fillStyle = '#C0392B';
            ctx.beginPath();
            ctx.arc(0, -22, 4.5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Eyes
        const eyeY = -10;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(-20, eyeY, 12, 10, 0, 0, Math.PI * 2);
        ctx.ellipse(20, eyeY, 12, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        if (this.isBlinking) {
            ctx.strokeStyle = '#2C3E50';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(-30, eyeY); ctx.lineTo(-10, eyeY);
            ctx.moveTo(10, eyeY); ctx.lineTo(30, eyeY);
            ctx.stroke();
        } else {
            const eyeDx = this.state === 'THINKING' ? 3 : (this.state === 'LISTENING' ? -2 : 0);
            const eyeDy = this.state === 'THINKING' ? -4 : 0;
            ctx.fillStyle = cfg.appearance?.eyeColor || '#4A2E16';
            ctx.beginPath();
            ctx.arc(-20 + eyeDx, eyeY + eyeDy, 6, 0, Math.PI * 2);
            ctx.arc(20 + eyeDx, eyeY + eyeDy, 6, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(-22 + eyeDx, eyeY - 2 + eyeDy, 2, 0, Math.PI * 2);
            ctx.arc(18 + eyeDx, eyeY - 2 + eyeDy, 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Eyebrows
        ctx.strokeStyle = hairColor;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        if (this.state === 'HAPPY' || this.state === 'CELEBRATING') {
            ctx.arc(-20, -28, 12, Math.PI * 1.1, Math.PI * 1.9);
            ctx.arc(20, -28, 12, Math.PI * 1.1, Math.PI * 1.9);
        } else {
            ctx.arc(-20, -24, 12, Math.PI * 1.15, Math.PI * 1.85);
            ctx.arc(20, -24, 12, Math.PI * 1.15, Math.PI * 1.85);
        }
        ctx.stroke();

        // Glasses
        if (cfg.appearance?.glasses) {
            ctx.strokeStyle = '#2C3E50';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(-20, eyeY, 16, 0, Math.PI * 2);
            ctx.arc(20, eyeY, 16, 0, Math.PI * 2);
            ctx.moveTo(-4, eyeY); ctx.lineTo(4, eyeY);
            ctx.stroke();
        }

        // Rosy Cheeks
        ctx.fillStyle = 'rgba(231, 76, 60, 0.25)';
        ctx.beginPath();
        ctx.ellipse(-26, 12, 10, 6, 0, 0, Math.PI * 2);
        ctx.ellipse(26, 12, 10, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Nose
        ctx.strokeStyle = '#C8966E';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(0, 5, 4, 0, Math.PI * 0.8);
        ctx.stroke();

        // Mouth / Lip Sync
        ctx.fillStyle = '#D9534F';
        ctx.strokeStyle = '#C0392B';
        ctx.lineWidth = 2;

        const mouthY = 24;
        ctx.beginPath();
        if (this.state === 'SPEAKING' || window.smarnaAudio?.isSpeaking || this.mouthOpen > 0) {
            ctx.ellipse(0, mouthY, 12, Math.max(4, this.mouthOpen), 0, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.state === 'HAPPY' || this.state === 'EXCITED' || this.state === 'CELEBRATING') {
            ctx.arc(0, mouthY - 4, 14, 0.1 * Math.PI, 0.9 * Math.PI);
            ctx.fill();
        } else {
            ctx.arc(0, mouthY - 2, 10, 0.1 * Math.PI, 0.9 * Math.PI);
            ctx.stroke();
        }
    }

    renderCat(ctx, cfg) {
        const catColor = '#F39C12';
        // Ears
        ctx.fillStyle = catColor;
        ctx.beginPath();
        ctx.moveTo(-45, -30); ctx.lineTo(-25, -75); ctx.lineTo(-5, -40); ctx.fill();
        ctx.moveTo(45, -30); ctx.lineTo(25, -75); ctx.lineTo(5, -40); ctx.fill();

        ctx.fillStyle = '#FFB6C1';
        ctx.beginPath();
        ctx.moveTo(-38, -35); ctx.lineTo(-25, -65); ctx.lineTo(-12, -40); ctx.fill();
        ctx.moveTo(38, -35); ctx.lineTo(25, -65); ctx.lineTo(12, -40); ctx.fill();

        // Body
        ctx.fillStyle = catColor;
        ctx.beginPath();
        ctx.ellipse(0, 80, 65, 50, 0, 0, Math.PI * 2);
        ctx.fill();

        // Paws
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(-30, 115, 16, 0, Math.PI * 2);
        ctx.arc(30, 115, 16, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.fillStyle = catColor;
        ctx.beginPath();
        ctx.ellipse(0, -10, 55, 48, 0, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#2ECC71';
        ctx.beginPath();
        ctx.ellipse(-20, -14, 12, 15, 0, 0, Math.PI * 2);
        ctx.ellipse(20, -14, 12, 15, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#111111';
        ctx.beginPath();
        ctx.ellipse(-20, -14, 3, 12, 0, 0, Math.PI * 2);
        ctx.ellipse(20, -14, 3, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Whiskers
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-25, 6); ctx.lineTo(-65, 2);
        ctx.moveTo(-25, 12); ctx.lineTo(-60, 16);
        ctx.moveTo(25, 6); ctx.lineTo(65, 2);
        ctx.moveTo(25, 12); ctx.lineTo(60, 16);
        ctx.stroke();

        // Nose & Mouth
        ctx.fillStyle = '#FFB6C1';
        ctx.beginPath();
        ctx.ellipse(0, 2, 5, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#555555';
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (this.mouthOpen > 0) {
            ctx.ellipse(0, 10, 6, Math.max(3, this.mouthOpen), 0, 0, Math.PI * 2);
            ctx.fillStyle = '#D9534F';
            ctx.fill();
        } else {
            ctx.arc(-5, 8, 6, 0, Math.PI * 0.8);
            ctx.arc(5, 8, 6, Math.PI * 0.2, Math.PI);
            ctx.stroke();
        }
    }

    renderSparkles(ctx, w, h) {
        const colors = ['#F1C40F', '#E74C3C', '#2ECC71', '#9B59B6', '#3498DB'];
        for (let i = 0; i < 15; i++) {
            const angle = (i / 15) * Math.PI * 2 + this.time;
            const dist = 70 + Math.sin(this.time * 4 + i) * 20;
            const x = Math.cos(angle) * dist;
            const y = Math.sin(angle) * dist - 10;

            ctx.fillStyle = colors[i % colors.length];
            ctx.beginPath();
            ctx.arc(x, y, 4 + Math.sin(this.time * 6 + i) * 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

window.CompanionAvatarEngine = CompanionAvatarEngine;
