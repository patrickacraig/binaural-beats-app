class BinauralBeatsGenerator {
    constructor() {
        this.audioContext = null;
        this.leftOscillator = null;
        this.rightOscillator = null;
        this.gainNode = null;
        this.isPlaying = false;
        this.timer = null;
        this.timeRemaining = 0;
        this.currentPreset = null;
        
        this.initializeElements();
        this.setupEventListeners();
    }
    
    initializeElements() {
        // Control elements
        this.baseFreqSlider = document.getElementById('baseFreq');
        this.beatFreqSlider = document.getElementById('beatFreq');
        this.volumeSlider = document.getElementById('volume');
        
        // Display elements
        this.baseFreqValue = document.getElementById('baseFreqValue');
        this.beatFreqValue = document.getElementById('beatFreqValue');
        this.volumeValue = document.getElementById('volumeValue');
        
        // Button elements
        this.playBtn = document.getElementById('playBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.presetBtns = document.querySelectorAll('.preset-btn');
        
        // Timer elements
        this.timerMinutes = document.getElementById('timerMinutes');
        this.startTimer = document.getElementById('startTimer');
        this.stopTimer = document.getElementById('stopTimer');
        this.timerDisplay = document.getElementById('timerDisplay');
    }
    
    setupEventListeners() {
        // Slider event listeners
        this.baseFreqSlider.addEventListener('input', () => {
            this.baseFreqValue.textContent = this.baseFreqSlider.value;
            if (this.isPlaying) {
                this.updateFrequencies();
            }
        });
        
        this.beatFreqSlider.addEventListener('input', () => {
            this.beatFreqValue.textContent = this.beatFreqSlider.value;
            if (this.isPlaying) {
                this.updateFrequencies();
            }
        });
        
        this.volumeSlider.addEventListener('input', () => {
            const volume = (this.volumeSlider.value * 100).toFixed(0);
            this.volumeValue.textContent = `${volume}%`;
            if (this.isPlaying) {
                this.updateVolume();
            }
        });
        
        // Button event listeners
        this.playBtn.addEventListener('click', () => this.startBinauralBeats());
        this.stopBtn.addEventListener('click', () => this.stopBinauralBeats());
        
        // Preset button listeners
        this.presetBtns.forEach(btn => {
            btn.addEventListener('click', (event) => {
                const frequency = btn.dataset.frequency;
                const beat = btn.dataset.beat;
                const presetName = btn.textContent.trim().split('\n')[0]; // Get first line of button text
                this.applyPreset(frequency, beat, presetName);
                
                // Store the current preset for status tracking
                this.currentPreset = presetName;
            });
        });
        
        // Timer event listeners
        this.startTimer.addEventListener('click', () => this.startStudyTimer());
        this.stopTimer.addEventListener('click', () => this.stopStudyTimer());
        
        // Initialize display values
        this.updateDisplayValues();
    }
    
    async initAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Resume context if it's suspended (required by some browsers)
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }
        }
    }
    
    async startBinauralBeats() {
        try {
            await this.initAudioContext();
            
            const baseFreq = parseFloat(this.baseFreqSlider.value);
            const beatFreq = parseFloat(this.beatFreqSlider.value);
            const volume = parseFloat(this.volumeSlider.value);
            
            // Create oscillators for left and right channels
            this.leftOscillator = this.audioContext.createOscillator();
            this.rightOscillator = this.audioContext.createOscillator();
            
            // Create gain node for volume control
            this.gainNode = this.audioContext.createGain();
            
            // Create channel splitter and merger for true binaural effect
            const splitter = this.audioContext.createChannelSplitter(2);
            const merger = this.audioContext.createChannelMerger(2);
            
            // Set frequencies (left ear gets base frequency, right ear gets base + beat)
            this.leftOscillator.frequency.setValueAtTime(baseFreq, this.audioContext.currentTime);
            this.rightOscillator.frequency.setValueAtTime(baseFreq + beatFreq, this.audioContext.currentTime);
            
            // Set oscillator type to sine wave for pure tones
            this.leftOscillator.type = 'sine';
            this.rightOscillator.type = 'sine';
            
            // Set volume
            this.gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
            
            // Connect left oscillator to left channel
            this.leftOscillator.connect(merger, 0, 0);
            
            // Connect right oscillator to right channel
            this.rightOscillator.connect(merger, 0, 1);
            
            // Connect merger to gain node to destination
            merger.connect(this.gainNode);
            this.gainNode.connect(this.audioContext.destination);
            
            // Start oscillators
            this.leftOscillator.start();
            this.rightOscillator.start();
            
            this.isPlaying = true;
            this.updateButtonStates();
            
        } catch (error) {
            console.error('Error starting binaural beats:', error);
            alert('Error starting audio. Please ensure your browser supports Web Audio API and you have given permission for audio.');
        }
    }
    
    stopBinauralBeats() {
        if (this.leftOscillator) {
            this.leftOscillator.stop();
            this.leftOscillator = null;
        }
        
        if (this.rightOscillator) {
            this.rightOscillator.stop();
            this.rightOscillator = null;
        }
        
        if (this.gainNode) {
            this.gainNode = null;
        }
        
        this.isPlaying = false;
        this.updateButtonStates();
    }
    
    updateFrequencies() {
        if (this.leftOscillator && this.rightOscillator) {
            const baseFreq = parseFloat(this.baseFreqSlider.value);
            const beatFreq = parseFloat(this.beatFreqSlider.value);
            
            this.leftOscillator.frequency.setValueAtTime(baseFreq, this.audioContext.currentTime);
            this.rightOscillator.frequency.setValueAtTime(baseFreq + beatFreq, this.audioContext.currentTime);
        }
    }
    
    updateVolume() {
        if (this.gainNode) {
            const volume = parseFloat(this.volumeSlider.value);
            this.gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
        }
    }
    
    updateButtonStates() {
        this.playBtn.disabled = this.isPlaying;
        this.stopBtn.disabled = !this.isPlaying;
    }
    
    updateDisplayValues() {
        this.baseFreqValue.textContent = this.baseFreqSlider.value;
        this.beatFreqValue.textContent = this.beatFreqSlider.value;
        const volume = (this.volumeSlider.value * 100).toFixed(0);
        this.volumeValue.textContent = `${volume}%`;
    }
    
    applyPreset(frequency, beat, presetName = null) {
        this.baseFreqSlider.value = frequency;
        this.beatFreqSlider.value = beat;
        this.updateDisplayValues();
        
        if (this.isPlaying) {
            this.updateFrequencies();
        }
        
        // Store the preset name
        if (presetName) {
            this.currentPreset = presetName;
        }
        
        // Add visual feedback
        this.presetBtns.forEach(btn => btn.style.transform = 'scale(1)');
        if (event && event.target) {
            event.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                event.target.style.transform = 'scale(1)';
            }, 150);
        }
    }
    
    startStudyTimer() {
        const minutes = parseInt(this.timerMinutes.value);
        if (minutes < 1 || minutes > 120) {
            alert('Please enter a timer duration between 1 and 120 minutes.');
            return;
        }
        
        this.timeRemaining = minutes * 60; // Convert to seconds
        this.updateTimerDisplay();
        
        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();
            
            if (this.timeRemaining <= 0) {
                this.stopStudyTimer();
                this.onTimerComplete();
            }
        }, 1000);
        
        this.startTimer.disabled = true;
        this.stopTimer.disabled = false;
    }
    
    stopStudyTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        this.startTimer.disabled = false;
        this.stopTimer.disabled = true;
        
        // Reset display to initial value
        const minutes = parseInt(this.timerMinutes.value);
        this.timeRemaining = minutes * 60;
        this.updateTimerDisplay();
    }
    
    updateTimerDisplay() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.timerDisplay.textContent = display;
        
        // Change color when time is running low
        if (this.timeRemaining <= 300) { // Last 5 minutes
            this.timerDisplay.style.color = '#e74c3c';
        } else if (this.timeRemaining <= 600) { // Last 10 minutes
            this.timerDisplay.style.color = '#f39c12';
        } else {
            this.timerDisplay.style.color = '#4c63d2';
        }
    }
    
    onTimerComplete() {
        // Create notification sound (brief tone)
        if (this.audioContext) {
            const notificationOsc = this.audioContext.createOscillator();
            const notificationGain = this.audioContext.createGain();
            
            notificationOsc.connect(notificationGain);
            notificationGain.connect(this.audioContext.destination);
            
            notificationOsc.frequency.setValueAtTime(800, this.audioContext.currentTime);
            notificationGain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            notificationGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
            
            notificationOsc.start();
            notificationOsc.stop(this.audioContext.currentTime + 0.5);
        }
        
        // Show alert
        alert('🎉 Study session complete! Time for a break!');
        
        // Flash the timer display
        let flashCount = 0;
        const flashInterval = setInterval(() => {
            this.timerDisplay.style.opacity = this.timerDisplay.style.opacity === '0.3' ? '1' : '0.3';
            flashCount++;
            if (flashCount >= 6) {
                clearInterval(flashInterval);
                this.timerDisplay.style.opacity = '1';
            }
        }, 200);
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.binauralApp = new BinauralBeatsGenerator();
});

// Handle page visibility changes to prevent audio issues
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.binauralApp && window.binauralApp.isPlaying) {
        // Optionally pause when tab is hidden to save resources
        console.log('Page hidden - binaural beats continue playing');
    }
});

// Store the app instance globally for debugging
window.addEventListener('load', () => {
    if (!window.binauralApp) {
        window.binauralApp = new BinauralBeatsGenerator();
    }
});

// IPC Communication with widget (only works in Electron)
if (typeof require !== 'undefined') {
    try {
        const { ipcRenderer } = require('electron');
        
        // Handle widget commands
        ipcRenderer.on('start-preset', (event, preset) => {
            if (window.binauralApp) {
                const presetMap = {
                    'Focus Mode': { frequency: 40, beat: 10 },
                    'Deep Focus': { frequency: 40, beat: 8 },
                    'Alert Study': { frequency: 200, beat: 10 },
                    'Calm Focus': { frequency: 150, beat: 6 }
                };
                
                if (presetMap[preset]) {
                    window.binauralApp.applyPreset(presetMap[preset].frequency, presetMap[preset].beat, preset);
                    if (!window.binauralApp.isPlaying) {
                        window.binauralApp.startBinauralBeats();
                    }
                    window.binauralApp.currentPreset = preset;
                    
                    // Send status update
                    ipcRenderer.send('status-update', {
                        isPlaying: true,
                        currentPreset: preset
                    });
                }
            }
        });
        
        ipcRenderer.on('stop-audio', (event) => {
            if (window.binauralApp && window.binauralApp.isPlaying) {
                window.binauralApp.stopBinauralBeats();
                window.binauralApp.currentPreset = null;
                
                // Send status update
                ipcRenderer.send('status-update', {
                    isPlaying: false,
                    currentPreset: null
                });
            }
        });
        
        ipcRenderer.on('get-status', (event) => {
            const status = {
                isPlaying: window.binauralApp ? window.binauralApp.isPlaying : false,
                currentPreset: window.binauralApp ? window.binauralApp.currentPreset : null
            };
            ipcRenderer.send('status-response', status);
        });
        
        // Send status updates when play/stop state changes
        const originalStart = BinauralBeatsGenerator.prototype.startBinauralBeats;
        const originalStop = BinauralBeatsGenerator.prototype.stopBinauralBeats;
        
        BinauralBeatsGenerator.prototype.startBinauralBeats = function() {
            const result = originalStart.call(this);
            ipcRenderer.send('status-update', {
                isPlaying: this.isPlaying,
                currentPreset: this.currentPreset || 'Custom'
            });
            return result;
        };
        
        BinauralBeatsGenerator.prototype.stopBinauralBeats = function() {
            const result = originalStop.call(this);
            ipcRenderer.send('status-update', {
                isPlaying: this.isPlaying,
                currentPreset: null
            });
            return result;
        };
        
    } catch (e) {
        console.log('Not running in Electron environment');
    }
}
