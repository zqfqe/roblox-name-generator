// Simple synth for retro gaming sounds using Web Audio API
// No external assets required!

let audioCtx: AudioContext | null = null;

const getContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

const playTone = (freq: number, type: OscillatorType, duration: number, startTime: number = 0, vol: number = 0.1) => {
  const ctx = getContext();
  if (ctx.state === 'suspended') ctx.resume();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);

  gain.gain.setValueAtTime(vol, ctx.currentTime + startTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime + startTime);
  osc.stop(ctx.currentTime + startTime + duration);
};

export const audioService = {
  // Whoosh/Laser sound for generating
  playGenerate: () => {
    const ctx = getContext();
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    // Frequency sweep up
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.3);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  },

  // High pitched "Coin" sound for success/copy
  playSuccess: () => {
    // Two tones: B5 then E6
    playTone(987.77, 'sine', 0.1, 0, 0.1); 
    playTone(1318.51, 'sine', 0.4, 0.1, 0.1);
  },

  // Subtle click
  playClick: () => {
    playTone(800, 'triangle', 0.05, 0, 0.05);
  },
  
  // Tab switch / Hover
  playHover: () => {
    playTone(400, 'sine', 0.05, 0, 0.02);
  }
};