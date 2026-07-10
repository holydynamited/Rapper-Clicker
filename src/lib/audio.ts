import yeatAudio from '../audio/yeat.mp3';
import nineAudio from '../audio/nine.mp3';
import fakeminkAudio from '../audio/fakemink.mp3';
import bleoodAudio from '../audio/bleood.mp3';
import cartiAudio from '../audio/carti.mp3';

const RAPPER_AUDIO: Record<string, string> = {
  yeat: yeatAudio,
  ninevicious: nineAudio,
  fakemink: fakeminkAudio,
  bleood: bleoodAudio,
  carti: cartiAudio,
};

const PREVIEW_MS = 5000;
const MUTE_KEY = 'rapper-clicker-muted';

let isMuted = typeof localStorage !== 'undefined' && localStorage.getItem(MUTE_KEY) === '1';

let currentAudio: HTMLAudioElement | null = null;
let stopTimer: ReturnType<typeof setTimeout> | null = null;
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === 'suspended') void audioCtx.resume();
  return audioCtx;
}

function playBubble(volume = 0.28, startHz = 420, endHz = 140, duration = 0.11) {
  if (isMuted) return;

  const ctx = getAudioContext();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(startHz, t);
  osc.frequency.exponentialRampToValueAtTime(Math.max(endHz, 40), t + duration);

  gain.gain.setValueAtTime(volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + duration + 0.02);
}

export function playCupBubble() {
  const wobble = 0.85 + Math.random() * 0.3;
  playBubble(0.26, 520 * wobble, 160, 0.1);
}

export function playCaseBubble() {
  playBubble(0.32, 280, 90, 0.14);
  window.setTimeout(() => playBubble(0.18, 360, 120, 0.09), 70);
}

export function getInitialMuted(): boolean {
  return isMuted;
}

export function setMuted(muted: boolean) {
  isMuted = muted;
  localStorage.setItem(MUTE_KEY, muted ? '1' : '0');
  if (muted) stopRapperPreview();
}

export function playRapperPreview(rapperId: string) {
  if (isMuted) return;

  const src = RAPPER_AUDIO[rapperId];
  if (!src) return;

  stopRapperPreview();

  currentAudio = new Audio(src);
  currentAudio.volume = 0.65;
  currentAudio.play().catch(() => {});

  stopTimer = setTimeout(stopRapperPreview, PREVIEW_MS);
}

export function stopRapperPreview() {
  if (stopTimer) {
    clearTimeout(stopTimer);
    stopTimer = null;
  }
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}
