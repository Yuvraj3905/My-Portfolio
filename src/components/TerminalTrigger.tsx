import { Command } from "lucide-react";
import { useTerminal } from "@/contexts/useTerminal";

export const TerminalTrigger = () => {
  const { open } = useTerminal();
  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open system terminal (Ctrl+K)"
      className="fixed top-6 right-6 z-[60] p-3 bg-cyber-dark/80 backdrop-blur-md border border-cyber-neon/30 text-cyber-neon rounded transition-all group flex items-center gap-2 hover:bg-cyber-neon hover:text-black shadow-[0_0_15px_rgba(0,240,255,0.1)] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-neon"
    >
      <Command
        size={16}
        className="group-hover:rotate-12 transition-transform"
        aria-hidden="true"
      />
      <span className="text-[10px] font-mono tracking-widest uppercase hidden md:inline">
        System Terminal [Ctrl+K]
      </span>
    </button>
  );
};
