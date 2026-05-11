type SfxName = "tick" | "beep" | "glitch" | "success" | "error" | "open";

let ctx: AudioContext | null = null;
let muted = false;

const getCtx = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
};

const tone = (
  freq: number,
  duration: number,
  type: OscillatorType = "square",
  gain = 0.04,
) => {
  if (muted) return;
  const audio = getCtx();
  if (!audio) return;
  const osc = audio.createOscillator();
  const g = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audio.currentTime);
  g.gain.setValueAtTime(0, audio.currentTime);
  g.gain.linearRampToValueAtTime(gain, audio.currentTime + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);
  osc.connect(g).connect(audio.destination);
  osc.start();
  osc.stop(audio.currentTime + duration);
};

const noise = (duration: number, gain = 0.04) => {
  if (muted) return;
  const audio = getCtx();
  if (!audio) return;
  const buffer = audio.createBuffer(
    1,
    audio.sampleRate * duration,
    audio.sampleRate,
  );
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const src = audio.createBufferSource();
  const g = audio.createGain();
  const filter = audio.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 1200;
  src.buffer = buffer;
  g.gain.setValueAtTime(gain, audio.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);
  src.connect(filter).connect(g).connect(audio.destination);
  src.start();
};

export const sfx = {
  setMuted: (value: boolean) => {
    muted = value;
  },
  isMuted: () => muted,
  resume: () => {
    const audio = getCtx();
    if (audio && audio.state === "suspended") void audio.resume();
  },
  play: (name: SfxName) => {
    if (muted) return;
    switch (name) {
      case "tick":
        tone(2200, 0.04, "square", 0.02);
        break;
      case "beep":
        tone(880, 0.08, "square", 0.04);
        break;
      case "glitch":
        noise(0.08, 0.05);
        tone(140, 0.06, "sawtooth", 0.03);
        break;
      case "success":
        tone(660, 0.06, "triangle", 0.05);
        setTimeout(() => tone(990, 0.1, "triangle", 0.05), 60);
        break;
      case "error":
        tone(220, 0.12, "sawtooth", 0.05);
        break;
      case "open":
        tone(440, 0.05, "square", 0.03);
        setTimeout(() => tone(880, 0.05, "square", 0.03), 40);
        break;
    }
  },
};
