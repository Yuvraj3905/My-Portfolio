import { useEffect, useState } from "react";

const KEY = "ys-visitor-count-v1";
const SESSION_KEY = "ys-visitor-counted";

const seedCount = () => {
  const launchDate = new Date("2024-09-01").getTime();
  const days = Math.max(1, Math.floor((Date.now() - launchDate) / 86400000));
  return 1200 + days * 7;
};

export const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    try {
      const stored = Number(localStorage.getItem(KEY)) || seedCount();
      const shouldBump = !sessionStorage.getItem(SESSION_KEY);
      const next = shouldBump ? stored + 1 : stored;
      if (shouldBump) sessionStorage.setItem(SESSION_KEY, "1");
      localStorage.setItem(KEY, String(next));
      setCount(next);
    } catch {
      setCount(seedCount());
    }
  }, []);

  if (count === null) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-6 left-6 z-[55] hidden md:flex items-center gap-2 px-3 py-2 bg-cyber-dark/80 backdrop-blur-md border border-cyber-neon/30 text-cyber-neon font-mono text-[10px] uppercase tracking-widest rounded"
    >
      <span
        aria-hidden="true"
        className="w-1.5 h-1.5 rounded-full bg-cyber-neon animate-pulse motion-reduce:animate-none"
      />
      <span>
        Agents online:{" "}
        <span className="text-white font-bold">{count.toLocaleString()}</span>
      </span>
    </div>
  );
};
