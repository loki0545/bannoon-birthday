// Web Audio API synthesizer for melodic music-box, piano chimes, and celebration effects

class SoundEngine {
  private ctx: AudioContext | null = null;
  private musicInterval: number | null = null;
  private isMusicPlaying: boolean = false;
  private volume: number = 0.6;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getPlaying(): boolean {
    return this.isMusicPlaying;
  }

  // Play a soft crystal music-box bell tone
  public playTone(freq: number, duration: number = 1.2, type: OscillatorType = 'sine', gainMultiplier: number = 1) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Warm low-pass filter to simulate music-box chime resonance
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, this.ctx.currentTime);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      const initialGain = this.volume * 0.25 * gainMultiplier;

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(initialGain, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  // UI interaction chime
  public playChime() {
    if (this.isMuted) return;
    this.playTone(880, 0.8, 'sine', 0.8);
    setTimeout(() => this.playTone(1320, 0.9, 'sine', 0.7), 90);
  }

  // Magical celebration sparkle arpeggio
  public playSparkle() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 1.2, 'sine', 0.6);
      }, idx * 70);
    });
  }

  // Candle extinguish breath sound
  public playCandleBlow() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(150, this.ctx.currentTime + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(this.volume * 0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {
      // Ignore
    }
  }

  // Gift opening glissando
  public playGiftOpen() {
    if (this.isMuted) return;
    const notes = [392, 440, 523.25, 587.33, 659.25, 783.99, 880, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 1.4, 'sine', 0.8);
      }, idx * 60);
    });
  }

  // Firework burst sound
  public playFirework() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      // Deep initial boom
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(this.volume * 0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);

      // Crackles
      setTimeout(() => {
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            this.playTone(1800 + Math.random() * 800, 0.15, 'triangle', 0.25);
          }, i * 65 + Math.random() * 30);
        }
      }, 150);
    } catch {
      // Ignore
    }
  }

  // Gentle music-box Happy Birthday & ambient lullaby melody
  public startMusicBox() {
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;
    this.initContext();

    // "Happy Birthday" gentle music-box notes sequence (frequencies & durations in ms)
    const melody: Array<{ note: number; delay: number; duration: number }> = [
      // Hap-py Birth-day to you
      { note: 392.00, delay: 0, duration: 0.8 },    // G4
      { note: 392.00, delay: 400, duration: 0.6 },  // G4
      { note: 440.00, delay: 800, duration: 1.1 },  // A4
      { note: 392.00, delay: 1400, duration: 1.1 }, // G4
      { note: 523.25, delay: 2000, duration: 1.1 }, // C5
      { note: 493.88, delay: 2600, duration: 1.8 }, // B4

      // Hap-py Birth-day to you
      { note: 392.00, delay: 3600, duration: 0.8 }, // G4
      { note: 392.00, delay: 4000, duration: 0.6 }, // G4
      { note: 440.00, delay: 4400, duration: 1.1 }, // A4
      { note: 392.00, delay: 5000, duration: 1.1 }, // G4
      { note: 587.33, delay: 5600, duration: 1.1 }, // D5
      { note: 523.25, delay: 6200, duration: 1.8 }, // C5

      // Hap-py Birth-day dear Bannoon
      { note: 392.00, delay: 7200, duration: 0.8 }, // G4
      { note: 392.00, delay: 7600, duration: 0.6 }, // G4
      { note: 783.99, delay: 8000, duration: 1.2 }, // G5
      { note: 659.25, delay: 8600, duration: 1.2 }, // E5
      { note: 523.25, delay: 9200, duration: 1.1 }, // C5
      { note: 493.88, delay: 9800, duration: 1.1 }, // B4
      { note: 440.00, delay: 10400, duration: 1.6 },// A4

      // Hap-py Birth-day to you
      { note: 698.46, delay: 11400, duration: 0.8 }, // F5
      { note: 698.46, delay: 11800, duration: 0.6 }, // F5
      { note: 659.25, delay: 12200, duration: 1.2 }, // E5
      { note: 523.25, delay: 12800, duration: 1.2 }, // C5
      { note: 587.33, delay: 13400, duration: 1.2 }, // D5
      { note: 523.25, delay: 14000, duration: 2.2 }, // C5

      // Gentle celebratory piano arpeggio coda
      { note: 523.25, delay: 15600, duration: 1.4 }, // C5
      { note: 659.25, delay: 16000, duration: 1.4 }, // E5
      { note: 783.99, delay: 16400, duration: 1.4 }, // G5
      { note: 1046.50, delay: 16800, duration: 2.5 },// C6
    ];

    const loopLength = 19000;

    const playMelodyCycle = () => {
      if (!this.isMusicPlaying) return;
      melody.forEach(item => {
        setTimeout(() => {
          if (this.isMusicPlaying && !this.isMuted) {
            // Add subtle harmony bell note for warmth
            this.playTone(item.note, item.duration, 'sine', 0.5);
            if (item.duration > 1.4) {
              this.playTone(item.note / 2, item.duration * 0.8, 'sine', 0.3);
            }
          }
        }, item.delay);
      });
    };

    playMelodyCycle();
    this.musicInterval = window.setInterval(playMelodyCycle, loopLength);
  }

  public stopMusicBox() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public toggleMusic(): boolean {
    if (this.isMusicPlaying) {
      this.stopMusicBox();
    } else {
      this.startMusicBox();
    }
    return this.isMusicPlaying;
  }
}

export const soundEngine = new SoundEngine();
