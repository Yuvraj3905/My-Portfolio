import { useEffect, useRef } from "react";
import { useSettings } from "@/contexts/useSettings";

const CHARS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ0123456789∆ΩΣ";

export const MatrixRain = () => {
  const { matrixMode, setMatrix } = useSettings();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!matrixMode) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMatrix(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [matrixMode, setMatrix]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !matrixMode) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 16;
    const cols = Math.floor(window.innerWidth / fontSize);
    const drops = new Array<number>(cols).fill(1);

    let raf = 0;
    let last = 0;
    const draw = (now: number) => {
      if (now - last > 50) {
        ctx.fillStyle = "rgba(5,5,5,0.08)";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.font = `${fontSize}px JetBrains Mono, monospace`;
        for (let i = 0; i < drops.length; i++) {
          const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          ctx.fillStyle = drops[i] === 1 ? "#aaffcc" : "#00f0ff";
          ctx.fillText(ch, x, y);
          if (y > window.innerHeight && Math.random() > 0.975) drops[i] = 0;
          drops[i]++;
        }
        last = now;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [matrixMode]);

  if (!matrixMode) return null;

  return (
    <div
      className="fixed inset-0 z-[300] bg-black/90 pointer-events-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Matrix mode overlay (press Escape to exit)"
    >
      <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setMatrix(false)}
        className="absolute top-6 right-6 px-4 py-2 bg-black border border-cyber-neon/50 text-cyber-neon font-mono text-xs uppercase tracking-widest hover:bg-cyber-neon hover:text-black transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-neon"
      >
        [ESC] Exit Matrix
      </button>
    </div>
  );
};
