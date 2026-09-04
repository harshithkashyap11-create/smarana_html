// SMARANA Upgraded Audio & Multilingual Speech Engine
// Full Web Speech API with Male/Female voice selection, dynamic pitch control, lip-sync event binding

class AudioEngine {
    constructor() {
        this.ctx = null;
        this.synth = window.speechSynthesis || null;
        this.voices = [];
        this.isSpeaking = false;
        this.unlocked = false;
        this.listeners = { speakStart: [], speakEnd: [] };

        if (this.synth) {
            this.loadVoices();
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.onvoiceschanged = () => {
                    this.loadVoices();
                };
            }
        }

        // Unlock AudioContext and SpeechSynthesis on first user gesture
        if (typeof window !== 'undefined') {
            const unlock = () => {
                this.initCtx();
                if (this.synth && this.synth.resume) this.synth.resume();
                this.unlocked = true;
                window.removeEventListener('click', unlock);
                window.removeEventListener('touchstart', unlock);
            };
            window.addEventListener('click', unlock);
            window.addEventListener('touchstart', unlock);
        }
    }

    initCtx() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    loadVoices() {
        if (this.synth) {
            this.voices = this.synth.getVoices() || [];
        }
    }

    getAvailableVoices(language = '') {
        this.loadVoices();
        if (!this.voices || this.voices.length === 0) return [];
        if (!language) return this.voices;

        const langLower = language.toLowerCase();
        const langMap = {
            'telugu': ['te', 'te-in'],
            'hindi': ['hi', 'hi-in'],
            'english': ['en', 'en-in', 'en-us', 'en-gb'],
            'tamil': ['ta', 'ta-in'],
            'kannada': ['kn', 'kn-in'],
            'malayalam': ['ml', 'ml-in'],
            'marathi': ['mr', 'mr-in'],
            'gujarati': ['gu', 'gu-in'],
            'punjabi': ['pa', 'pa-in'],
            'bengali': ['bn', 'bn-in']
        };

        const targetCodes = langMap[langLower] || [langLower];
        return this.voices.filter(v => targetCodes.some(code => v.lang.toLowerCase().includes(code)));
    }

    on(event, fn) {
        if (this.listeners[event]) {
            this.listeners[event].push(fn);
        }
    }

    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(fn => fn(data));
        }
    }

    // --- MULTILINGUAL VOICE SPEECH SYNTHESIS ---
    speak(text, options = {}) {
        if (!text) return;
        this.initCtx();

        const lang = options.language || 'English';
        const gender = options.gender || 'female'; // 'female', 'male'
        const companionType = options.type || 'Granddaughter';
        const rate = options.voiceRate || (gender === 'male' ? 0.9 : 0.95);
        let pitch = options.voicePitch || (gender === 'male' ? 0.8 : 1.25);

        // If Cat companion, adjust pitch to playful cute level
        if (companionType === 'Cat') {
            pitch = 1.45;
        }

        if (!this.synth) {
            console.warn("Web Speech Synthesis not supported in this browser.");
            this.fallbackToneSpeech(text, options.onEnd);
            return;
        }

        // Cancel ongoing speech
        this.synth.cancel();
        if (this.synth.resume) this.synth.resume();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.pitch = pitch;

        // Pick best matching system voice
        this.loadVoices();
        const matchingVoices = this.getAvailableVoices(lang);
        let selectedVoice = null;

        if (matchingVoices.length > 0) {
            if (gender === 'male') {
                selectedVoice = matchingVoices.find(v =>
                v.name.toLowerCase().includes('male') ||
                v.name.toLowerCase().includes('david') ||
                v.name.toLowerCase().includes('ravi') ||
                v.name.toLowerCase().includes('george')
                ) || matchingVoices[0];
            } else {
                selectedVoice = matchingVoices.find(v =>
                v.name.toLowerCase().includes('female') ||
                v.name.toLowerCase().includes('zira') ||
                v.name.toLowerCase().includes('heera') ||
                v.name.toLowerCase().includes('sita') ||
                v.name.toLowerCase().includes('google')
                ) || matchingVoices[0];
            }
        } else if (this.voices.length > 0) {
            // Fallback to any English or primary voice with pitch adjustment
            if (gender === 'male') {
                selectedVoice = this.voices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('david')) || this.voices[0];
            } else {
                selectedVoice = this.voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira')) || this.voices[0];
            }
        }

        if (selectedVoice) {
            utterance.voice = selectedVoice;
            utterance.lang = selectedVoice.lang;
        }

        utterance.onstart = () => {
            this.isSpeaking = true;
            this.emit('speakStart', { text });
            if (options.onStart) options.onStart();
        };

            utterance.onend = () => {
                this.isSpeaking = false;
                this.emit('speakEnd');
                if (options.onEnd) options.onEnd();
            };

                utterance.onerror = (err) => {
                    console.warn("Speech synthesis notice:", err);
                    this.isSpeaking = false;
                    this.emit('speakEnd');
                    if (options.onEnd) options.onEnd();
                };

                    try {
                        this.synth.speak(utterance);
                    } catch (e) {
                        console.warn("Speech speak error, falling back:", e);
                        this.fallbackToneSpeech(text, options.onEnd);
                    }
    }

    stopSpeech() {
        if (this.synth) {
            this.synth.cancel();
        }
        this.isSpeaking = false;
        this.emit('speakEnd');
    }

    fallbackToneSpeech(text, onEnd) {
        this.emit('speakStart', { text });
        this.playTuneSample();
        setTimeout(() => {
            this.emit('speakEnd');
            if (onEnd) onEnd();
        }, 2000);
    }

    // --- SOUND EFFECTS SYNTHESIZER ---
    playClick() {
        this.initCtx();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
    }

    playFlip() {
        this.initCtx();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.12);
    }

    playSuccess() {
        this.initCtx();
        if (!this.ctx) return;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);
            gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.1);
            gain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + idx * 0.1 + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.1 + 0.35);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime + idx * 0.1);
            osc.stop(this.ctx.currentTime + idx * 0.1 + 0.35);
        });
    }

    playPurr() {
        this.initCtx();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.6);
    }

    playMeow() {
        this.initCtx();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(850, this.ctx.currentTime + 0.2);
        osc.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.5);
    }

    playTuneSample() {
        this.initCtx();
        if (!this.ctx) return;
        const notes = [
            { f: 440, d: 0.3 }, { f: 493.88, d: 0.3 }, { f: 554.37, d: 0.4 },
            { f: 587.33, d: 0.4 }, { f: 659.25, d: 0.6 }
        ];
        let time = this.ctx.currentTime;
        notes.forEach((note) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(note.f, time);
            gain.gain.setValueAtTime(0.2, time);
            gain.gain.exponentialRampToValueAtTime(0.01, time + note.d);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(time);
            osc.stop(time + note.d);
            time += note.d * 0.9;
        });
    }

    // --- SPEECH RECOGNITION ---
    listen(onResult, onError, onEnd) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const rec = new SpeechRecognition();
            rec.continuous = false;
            rec.interimResults = false;
            rec.lang = 'en-IN';

            rec.onresult = (e) => {
                const transcript = e.results[0][0].transcript;
                if (onResult) onResult(transcript);
            };
                rec.onerror = (e) => {
                    if (onError) onError(e);
                };
                    rec.onend = () => {
                        if (onEnd) onEnd();
                    };
                        try {
                            rec.start();
                        } catch (err) {
                            if (onError) onError(err);
                        }
        } else {
            const simulatedResponses = [
                "I am feeling very happy today! I had my morning tea.",
                "Can we play the photo memory game together?",
                "Tell me about my grandchildren.",
                "I completed my morning walk today!",
                "What is the weather like outside?"
            ];
            const randomText = simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)];
            setTimeout(() => {
                if (onResult) onResult(randomText);
                if (onEnd) onEnd();
            }, 1500);
        }
    }
}

window.smarnaAudio = new AudioEngine();
