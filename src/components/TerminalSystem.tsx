import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTerminal } from "@/contexts/useTerminal";
import { useResume } from "@/contexts/useResume";
import { useSettings } from "@/contexts/useSettings";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { sfx } from "@/lib/sfx";
import { haptic } from "@/lib/haptics";
import type { ThemeName } from "@/contexts/SettingsContext";
import type { TerminalLog } from "@/types";

const INITIAL_HISTORY: TerminalLog[] = [
  { type: "system", content: "Agentic OS v3.1.7 loaded." },
  { type: "system", content: 'Type "help" for available commands.' },
];

const HELP_TEXT = `Available commands:
  help, ls, whoami, clear, exit
  goto [section]   navigate to section
  resume           download resume
  matrix           enter matrix mode
  crt [on|off]     toggle CRT effect
  theme [cyber|amber|matrix]
  sound [on|off]   toggle sfx
  share            copy current URL
  github           open GitHub profile
  visitors         show visitor count
  joke             tell a dev joke
  neofetch         system info
  sl               trains? what trains?`;

const NEOFETCH = (visitors: number) =>
  `       /\\          yuvraj@portfolio
      /  \\         -----------------
     / /\\ \\        OS:        Agentic OS 3.1.7
    /_/  \\_\\       Host:      yuvraj3905.github.io
   /  __  \\        Kernel:    React 18.3 / Vite 5
  / /    \\ \\       Shell:     ts-bash
 /_/      \\_\\      DE:        Cyberpunk HUD
                   Theme:     ${document.body.dataset.theme ?? "cyber"}
                   CPU:       LangGraph + GPT-4o
                   Memory:    ∞ tokens
                   Visitors:  ${visitors.toLocaleString()}`;

const JOKES = [
  "Why do agents prefer dark mode? Because light attracts bugs.",
  "There are 10 types of engineers: those who hallucinate and those who RAG.",
  "An LLM walks into a bar. The bartender asks 'system or user prompt?'",
  "I told my agent it had free will. It started writing tests.",
  "Why don't recruiters use vector DBs? They prefer cold leads.",
];

export const TerminalSystem = () => {
  const { isOpen, close } = useTerminal();
  const { open: openResume } = useResume();
  const settings = useSettings();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLog[]>(INITIAL_HISTORY);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useFocusTrap(dialogRef, isOpen, close);

  useEffect(() => {
    if (isOpen) sfx.play("open");
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const append = (next: TerminalLog[]) =>
    setHistory((prev) => [...prev, ...next]);

  const runCommand = (rawInput: string) => {
    const cmd = rawInput.trim();
    if (cmd === "") return;
    const lower = cmd.toLowerCase();
    setCmdHistory((h) => [cmd, ...h].slice(0, 50));
    setHistoryIdx(-1);
    append([{ type: "user", content: `> ${cmd}` }]);
    sfx.play("beep");
    haptic("light");

    if (lower === "help") {
      append([{ type: "system", content: HELP_TEXT }]);
    } else if (lower === "ls") {
      append([
        {
          type: "system",
          content:
            "Sections: hero, skills, projects, achievements, experience, contact",
        },
      ]);
    } else if (lower === "whoami") {
      append([
        {
          type: "system",
          content:
            "Yuvraj Singh: AI & Full Stack Engineer. Specializing in Agentic Workflows.",
        },
      ]);
    } else if (lower === "resume") {
      append([
        { type: "success", content: "Initiating resume download sequence..." },
      ]);
      openResume();
    } else if (lower === "clear") {
      setHistory([]);
    } else if (lower === "exit") {
      close();
    } else if (lower === "matrix") {
      append([
        { type: "success", content: "Wake up, Neo. Press ESC to exit." },
      ]);
      settings.setMatrix(true);
      sfx.play("glitch");
    } else if (lower.startsWith("crt")) {
      const arg = lower.split(/\s+/)[1];
      const next = arg === "on" ? true : arg === "off" ? false : !settings.crt;
      settings.setCrt(next);
      append([
        { type: "success", content: `CRT mode ${next ? "engaged" : "off"}.` },
      ]);
    } else if (lower.startsWith("theme")) {
      const arg = lower.split(/\s+/)[1] as ThemeName | undefined;
      if (arg && ["cyber", "amber", "matrix"].includes(arg)) {
        settings.setTheme(arg);
        append([{ type: "success", content: `Theme switched to ${arg}.` }]);
      } else {
        append([
          { type: "error", content: "Usage: theme [cyber|amber|matrix]" },
        ]);
      }
    } else if (lower.startsWith("sound")) {
      const arg = lower.split(/\s+/)[1];
      const next =
        arg === "on" ? true : arg === "off" ? false : !settings.soundOn;
      settings.setSound(next);
      append([
        { type: "success", content: `Sound effects ${next ? "on" : "off"}.` },
      ]);
    } else if (lower === "share") {
      void navigator.clipboard
        .writeText(window.location.href)
        .then(() =>
          append([{ type: "success", content: "URL copied to clipboard." }]),
        )
        .catch(() =>
          append([{ type: "error", content: "Clipboard unavailable." }]),
        );
    } else if (lower === "github") {
      window.open("https://github.com/Yuvraj3905", "_blank", "noopener");
      append([{ type: "success", content: "Opening github.com/Yuvraj3905" }]);
    } else if (lower === "visitors") {
      const stored = Number(localStorage.getItem("ys-visitor-count-v1")) || 0;
      append([
        {
          type: "system",
          content: `Agents online (cumulative): ${stored.toLocaleString()}`,
        },
      ]);
    } else if (lower === "joke") {
      const j = JOKES[Math.floor(Math.random() * JOKES.length)];
      append([{ type: "system", content: j }]);
    } else if (lower === "neofetch") {
      const visitors = Number(localStorage.getItem("ys-visitor-count-v1")) || 0;
      append([{ type: "system", content: NEOFETCH(visitors) }]);
    } else if (lower === "sl") {
      append([
        {
          type: "error",
          content: "Did you mean 'ls'? (no trains in this terminal, sorry)",
        },
      ]);
    } else if (lower === "sudo") {
      append([
        {
          type: "error",
          content:
            "Permission denied. This OS runs as visitor; superuser is reserved.",
        },
      ]);
    } else if (lower.startsWith("goto ")) {
      const target = lower.split(" ")[1];
      const element = document.getElementById(target ?? "");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        append([{ type: "success", content: `Navigating to ${target}...` }]);
      } else {
        append([{ type: "error", content: `Section "${target}" not found.` }]);
      }
    } else {
      append([{ type: "error", content: `Command not found: ${cmd}` }]);
      sfx.play("error");
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = historyIdx - 1;
      if (next < 0) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(next);
        setInput(cmdHistory[next] ?? "");
      }
    }
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
                <div
                  aria-hidden="true"
                  className="w-2 h-2 rounded-full bg-cyber-neon animate-pulse motion-reduce:animate-none"
                />
                <span className="font-mono text-[10px] text-cyber-neon tracking-widest uppercase">
                  System Terminal // User@Yuvraj-Portfolio
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  close();
                  sfx.play("tick");
                }}
                aria-label="Close terminal"
                className="text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-neon"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 p-6 font-mono text-sm overflow-y-auto custom-scrollbar space-y-2"
            >
              {history.map((log, i) => (
                <pre
                  key={i}
                  className={`whitespace-pre-wrap break-words ${
                    log.type === "system"
                      ? "text-gray-300"
                      : log.type === "user"
                        ? "text-cyber-neon"
                        : log.type === "error"
                          ? "text-red-400"
                          : "text-green-400"
                  }`}
                >
                  {log.content}
                </pre>
              ))}
              <div className="flex gap-2 text-cyber-neon">
                <span>{">"}</span>
                <input
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  aria-label="Terminal command"
                  className="bg-transparent border-none outline-none flex-1 text-cyber-neon"
                />
              </div>
            </div>

            <div className="px-4 py-1 bg-cyber-neon/5 border-t border-cyber-neon/10 flex justify-between">
              <span className="text-[8px] text-gray-400 font-mono uppercase">
                Status: Ready · ↑↓ history
              </span>
              <span className="text-[8px] text-gray-400 font-mono uppercase tracking-widest">
                Type &quot;help&quot; for commands
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
