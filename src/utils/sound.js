class SoundController {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.isUnlocked = false;

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sound_enabled');
      if (saved !== null) {
        this.enabled = saved === 'true';
      }
      this.attachUnlockListeners();
    }
  }

  attachUnlockListeners() {
    const unlock = () => {
      this.initCtx();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().then(() => {
          this.isUnlocked = true;
        });
      } else if (this.ctx && this.ctx.state === 'running') {
        this.isUnlocked = true;
      }
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('wheel', unlock);
    };

    window.addEventListener('click', unlock, { passive: true, once: true });
    window.addEventListener('keydown', unlock, { passive: true, once: true });
    window.addEventListener('touchstart', unlock, { passive: true, once: true });
    window.addEventListener('wheel', unlock, { passive: true, once: true });
  }

  initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  // دالة التبديل مع تحديث التخزين المحلي وإصدار صوت تأكيد فوري
  toggleSound() {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sound_enabled', String(this.enabled));
    }

    if (this.enabled) {
      this.initCtx();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().then(() => {
          this.playClickSnap();
        });
      } else {
        this.playClickSnap();
      }
    }

    return this.enabled;
  }

  playClickSnap() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(850, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.035);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.035);
  }

  playHoverTick() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx || this.ctx.state !== 'running') return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.015);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.015);
  }
}

export const sounds = new SoundController();