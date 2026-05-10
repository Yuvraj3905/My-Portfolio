import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTerminal } from "@/contexts/useTerminal";
import { useResume } from "@/contexts/useResume";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import type { TerminalLog } from "@/types";

const INITIAL_HISTORY: TerminalLog[] = [
  { type: "system", content: "Agentic OS v2.0.4 loaded." },
  { type: "system", content: 'Type "help" for available commands.' },
];

export const TerminalSystem = () => {
  const { isOpen, close } = useTerminal();
  const { open: openResume } = useResume();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLog[]>(INITIAL_HISTORY);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useFocusTrap(dialogRef, isOpen, close);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const cmd = input.trim().toLowerCase();
    const next: TerminalLog[] = [
      ...history,
      { type: "user", content: `> ${input}` },
    ];

    if (cmd === "help") {
      next.push({
        type: "system",
        content:
          "Available: help, ls, whoami, clear, exit, goto [section], resume",
      });
    } else if (cmd === "ls") {
      next.push({
        type: "system",
        content:
          "Sections: hero, skills, projects, achievements, experience, contact",
      });
    } else if (cmd === "whoami") {
      next.push({
        type: "system",
        content:
          "Yuvraj Singh: AI & Full Stack Engineer. Specializing in Agentic Workflows.",
      });
    } else if (cmd === "resume") {
      next.push({
        type: "success",
        content: "Initiating resume download sequence...",
      });
      openResume();
    } else if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (cmd === "exit") {
      close();
      setInput("");
      return;
    } else if (cmd.startsWith("goto ")) {
      const target = cmd.split(" ")[1];
      const element = document.getElementById(target ?? "");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        next.push({ type: "success", content: `Navigating to ${target}...` });
      } else {
        next.push({ type: "error", content: `Section "${target}" not found.` });
      }
    } else if (cmd !== "") {
      next.push({ type: "error", content: `Command not found: ${cmd}` });
    }

    setHistory(next);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="System terminal"
        >
          <div
            ref={dialogRef}
            className="w-full max-w-4xl h-[60vh] bg-cyber-dark border border-cyber-neon/30 flex flex-col shadow-[0_0_50px_rgba(0,240,255,0.1)] overflow-hidden"
          >
            <div className="flex justify-between items-center px-4 py-2 bg-cyber-neon/10 border-b border-cyber-neon/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyber-neon animate-pulse" />
                <span className="font-mono text-[10px] text-cyber-neon tracking-widest uppercase">
                  System Terminal // User@Yuvraj-Portfolio
                </span>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close terminal"
                className="text-gray-500 hover:text-white transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-neon"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 p-6 font-mono text-sm overflow-y-auto custom-scrollbar space-y-2"
            >
              {history.map((log, i) => (
                <div
                  key={i}
                  className={`
                    ${log.type === "system" ? "text-gray-400" : ""}
                    ${log.type === "user" ? "text-cyber-neon" : ""}
                    ${log.type === "error" ? "text-red-500" : ""}
                    ${log.type === "success" ? "text-green-400" : ""}
                  `}
                >
                  {log.content}
                </div>
              ))}
              <div className="flex gap-2 text-cyber-neon">
                <span>{">"}</span>
                <input
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  aria-label="Terminal command"
                  className="bg-transparent border-none outline-none flex-1 text-cyber-neon"
                />
              </div>
            </div>

            <div className="px-4 py-1 bg-cyber-neon/5 border-t border-cyber-neon/10 flex justify-between">
              <span className="text-[8px] text-gray-600 font-mono uppercase">
                Status: Ready
              </span>
              <span className="text-[8px] text-gray-600 font-mono uppercase tracking-widest">
                Type &quot;exit&quot; to close
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
