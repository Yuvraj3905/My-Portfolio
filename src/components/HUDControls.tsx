import { Monitor, Volume2, VolumeX } from "lucide-react";
import { useSettings } from "@/contexts/useSettings";
import { sfx } from "@/lib/sfx";
import { haptic } from "@/lib/haptics";

const themeLabel: Record<string, string> = {
  cyber: "CYAN",
  amber: "AMBER",
  matrix: "GRN",
};

export const HUDControls = () => {
  const { soundOn, toggleSound, crt, toggleCrt, theme, setTheme } =
    useSettings();

  const cycleTheme = () => {
    const order: Array<typeof theme> = ["cyber", "amber", "matrix"];
    const next = order[(order.indexOf(theme) + 1) % order.length];
    setTheme(next);
    sfx.play("tick");
    haptic("light");
  };

  return (
    <div className="fixed bottom-6 left-6 z-[55] flex items-center gap-2 no-print">
      <button
        type="button"
        onClick={() => {
          toggleSound();
          if (!soundOn) sfx.play("beep");
        }}
        aria-label={soundOn ? "Mute sound effects" : "Enable sound effects"}
        aria-pressed={soundOn}
        className="p-2 bg-cyber-dark/80 backdrop-blur-md border border-cyber-neon/30 text-cyber-neon hover:bg-cyber-neon hover:text-black transition-colors rounded focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-neon"
      >
        {soundOn ? (
          <Volume2 size={14} aria-hidden="true" />
        ) : (
          <VolumeX size={14} aria-hidden="true" />
        )}
      </button>
      <button
        type="button"
        onClick={() => {
          toggleCrt();
          sfx.play("glitch");
          haptic("light");
        }}
        aria-label={crt ? "Disable CRT mode" : "Enable CRT mode"}
        aria-pressed={crt}
        className={`p-2 backdrop-blur-md border transition-colors rounded focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-neon ${
          crt
            ? "bg-cyber-neon text-black border-cyber-neon"
            : "bg-cyber-dark/80 text-cyber-neon border-cyber-neon/30 hover:bg-cyber-neon hover:text-black"
        }`}
      >
        <Monitor size={14} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={cycleTheme}
        aria-label={`Cycle theme. Current: ${themeLabel[theme]}`}
        className="px-3 py-2 bg-cyber-dark/80 backdrop-blur-md border border-cyber-neon/30 text-cyber-neon hover:bg-cyber-neon hover:text-black font-mono text-[10px] uppercase tracking-widest transition-colors rounded focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-neon"
      >
        {themeLabel[theme]}
      </button>
    </div>
  );
};
