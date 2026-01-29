import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Terminal,
  Database,
  Trophy,
  ChevronDown,
  Zap,
  Code2,
  Cpu,
  Globe,
  Mail,
  Github,
  Linkedin,
  Server,
  Layout,
  ExternalLink,
  Home,
  Monitor,
  Command,
  X,
} from "lucide-react";

// --- HELPERS ---
const Typewriter = ({ text, delay = 0.05, className = "" }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, delay * 1000);
    return () => clearInterval(interval);
  }, [text, delay]);
  return <span className={className}>{displayed}</span>;
};

// --- COMPONENTS ---

const NavHUD = ({ activeSection }) => {
  const navItems = [
    { id: "hero", icon: Home, label: "INIT" },
    { id: "skills", icon: Zap, label: "STACK" },
    { id: "projects", icon: Globe, label: "DEPLOY" },
    { id: "achievements", icon: Trophy, label: "AWARDS" },
    { id: "experience", icon: Server, label: "LOG" },
    { id: "contact", icon: Mail, label: "LINK" },
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6">
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`group relative p-3 border rounded-sm transition-all duration-300 ${
            activeSection === item.id
              ? "bg-cyber-neon border-cyber-neon text-black shadow-[0_0_15px_#00F0FF]"
              : "border-white/10 text-white/40 hover:border-white/40 hover:text-white"
          }`}
        >
          <item.icon size={18} />
          <span className="absolute right-full mr-4 px-2 py-1 bg-black/80 border border-white/10 text-[10px] font-mono tracking-widest text-cyber-neon opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase">
            {item.label}
          </span>
          {activeSection === item.id && (
            <div className="absolute -left-1 top-0 bottom-0 w-0.5 bg-black" />
          )}
        </a>
      ))}
    </div>
  );
};

const TerminalSystem = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "system", content: "Agentic OS v2.0.4 loaded." },
    { type: "system", content: 'Type "help" for available commands.' },
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: "user", content: `> ${input}` }];

      if (cmd === "help") {
        newHistory.push({
          type: "system",
          content: "Available: help, ls, whoami, clear, exit, goto [section]",
        });
      } else if (cmd === "ls") {
        newHistory.push({
          type: "system",
          content:
            "Sections: hero, skills, projects, achievements, experience, contact",
        });
      } else if (cmd === "whoami") {
        newHistory.push({
          type: "system",
          content:
            "Yuvraj Singh: AI & Full Stack Engineer. Specializing in Agentic Workflows.",
        });
      } else if (cmd === "clear") {
        setHistory([]);
        setInput("");
        return;
      } else if (cmd === "exit") {
        onClose();
        setInput("");
        return;
      } else if (cmd.startsWith("goto ")) {
        const target = cmd.split(" ")[1];
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          newHistory.push({
            type: "success",
            content: `Navigating to ${target}...`,
          });
        } else {
          newHistory.push({
            type: "error",
            content: `Section "${target}" not found.`,
          });
        }
      } else if (cmd !== "") {
        newHistory.push({
          type: "error",
          content: `Command not found: ${cmd}`,
        });
      }

      setHistory(newHistory);
      setInput("");
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
        >
          <div className="w-full max-w-4xl h-[60vh] bg-cyber-dark border border-cyber-neon/30 flex flex-col shadow-[0_0_50px_rgba(0,240,255,0.1)] overflow-hidden">
            <div className="flex justify-between items-center px-4 py-2 bg-cyber-neon/10 border-b border-cyber-neon/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyber-neon animate-pulse" />
                <span className="font-mono text-[10px] text-cyber-neon tracking-widest uppercase">
                  System Terminal // User@Yuvraj-Portfolio
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={16} />
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
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  className="bg-transparent border-none outline-none flex-1 text-cyber-neon"
                />
              </div>
            </div>

            <div className="px-4 py-1 bg-cyber-neon/5 border-t border-cyber-neon/10 flex justify-between">
              <span className="text-[8px] text-gray-600 font-mono uppercase">
                Status: Ready
              </span>
              <span className="text-[8px] text-gray-600 font-mono uppercase tracking-widest">
                Type "exit" to close
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Loader = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cyber-dark text-cyber-neon"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative mb-8"
      >
        <div className="w-24 h-24 border-4 border-cyber-neon border-t-transparent rounded-full animate-spin shadow-[0_0_20px_#00F0FF]" />
        <Terminal
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          size={32}
        />
      </motion.div>
      <div className="w-64 h-1 bg-gray-800 rounded overflow-hidden">
        <motion.div
          className="h-full bg-cyber-neon shadow-[0_0_15px_#00F0FF]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          onAnimationComplete={onComplete}
        />
      </div>
      <p className="mt-4 font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase">
        Establishing Agentic Link...
      </p>
    </motion.div>
  );
};

const HUDCard = ({ title, type, description, icon: Icon, impact, tech }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative p-6 bg-cyber-panel/40 border border-white/10 backdrop-blur-xl group hover:border-cyber-neon/50 transition-all duration-500 overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-1 h-8 bg-cyber-neon/30" />
    <div className="absolute top-0 left-0 w-8 h-1 bg-cyber-neon/30" />

    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-cyber-dark border border-white/5 text-cyber-neon rounded-lg group-hover:shadow-[0_0_15px_#00F0FF33] transition-all">
        <Icon size={24} />
      </div>
      {impact && (
        <span className="text-[10px] font-mono bg-cyber-neon/10 text-cyber-neon px-2 py-1 rounded border border-cyber-neon/20">
          IMPACT: {impact}
        </span>
      )}
    </div>

    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyber-neon transition-colors">
      {title}
    </h3>
    <p className="text-xs font-mono text-gray-500 uppercase mb-4 tracking-wider">
      {type}
    </p>
    <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
      {description}
    </p>

    <div className="flex flex-wrap gap-2">
      {tech?.map((t) => (
        <span
          key={t}
          className="text-[9px] font-mono text-white/40 border border-white/5 px-2 py-0.5 rounded"
        >
          {t}
        </span>
      ))}
    </div>

    <div className="absolute inset-0 bg-gradient-to-br from-cyber-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/20 group-hover:border-cyber-neon transition-colors" />
  </motion.div>
);

const SkillNode = ({ title, skills, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="p-6 bg-black/40 border border-white/5 rounded-lg hover:border-white/20 transition-all"
  >
    <div className="flex items-center gap-3 mb-4 text-cyber-neon">
      <Icon size={20} />
      <h4 className="font-mono text-sm font-bold tracking-widest uppercase">
        {title}
      </h4>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="px-3 py-1 bg-white/5 border border-white/5 text-[11px] text-gray-300 font-mono rounded-full hover:bg-white/10 transition-colors"
        >
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
);

const Landscape = ({
  opacity = 0.2,
  color = "#00F0FF",
  type = "mountains",
  className = "",
}) => {
  if (type === "mountains") {
    return (
      <svg
        viewBox="0 0 1000 300"
        className={`pointer-events-none fill-none stroke-current ${className}`}
        style={{ opacity, color }}
      >
        <path
          d="M0,300 L150,150 L300,250 L450,50 L600,200 L800,50 L1000,200 L1000,300 Z"
          strokeWidth="1"
          strokeDasharray="5 5"
        />
        <path
          d="M0,300 L100,200 L250,250 L400,100 L550,200 L700,50 L850,150 L1000,100 L1000,300 Z"
          strokeWidth="2"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 1000 300"
      className={`pointer-events-none fill-none stroke-current ${className}`}
      style={{ opacity, color }}
    >
      <path
        d="M0,300 L50,150 L100,150 L120,50 L150,50 L170,200 L250,200 L280,100 L350,100 L400,250 L500,250 L550,50 L650,50 L700,200 L800,200 L850,100 L950,100 L1000,300 Z"
        strokeWidth="2"
      />
    </svg>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const containerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const sections = [
      "hero",
      "skills",
      "projects",
      "achievements",
      "experience",
      "contact",
    ];
    const options = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, options);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef });

  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 20]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08, 0.1], [1, 1, 0]);
  const visorY = useTransform(scrollYProgress, [0, 0.05], ["0%", "-100%"]);

  const land1Y = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const land2Y = useTransform(scrollYProgress, [0.3, 0.6], [0, -150]);
  const land3Y = useTransform(scrollYProgress, [0.6, 1], [0, -200]);

  return (
    <div className="bg-cyber-dark text-white min-h-screen overflow-x-hidden selection:bg-cyber-neon selection:text-black">
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <NavHUD activeSection={activeSection} />
      <TerminalSystem
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* TERMINAL TRIGGER BUTTON */}
      <button
        onClick={() => setTerminalOpen(true)}
        className="fixed top-6 right-6 z-[60] p-3 bg-cyber-dark/80 backdrop-blur-md border border-cyber-neon/30 text-cyber-neon rounded transition-all group flex items-center gap-2 hover:bg-cyber-neon hover:text-black shadow-[0_0_15px_rgba(0,240,255,0.1)]"
      >
        <Command
          size={16}
          className="group-hover:rotate-12 transition-transform"
        />
        <span className="text-[10px] font-mono tracking-widest uppercase hidden md:inline">
          System Terminal [Ctrl+K]
        </span>
      </button>

      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#00F0FF11,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <main ref={containerRef} className="relative z-10 w-full">
        {/* HERO SECTION */}
        <section id="hero" className="h-[200vh] relative">
          <motion.div
            style={{ y: land1Y }}
            className="absolute inset-0 z-0 flex items-end"
          >
            <Landscape type="mountains" className="w-full h-96 opacity-10" />
          </motion.div>
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
            <motion.div
              style={{ scale: heroScale, opacity: heroOpacity }}
              className="relative w-96 h-96 md:w-[500px] md:h-[500px] flex items-center justify-center"
            >
              {/* CYBER FRAME */}
              <svg
                viewBox="0 0 500 500"
                className="absolute inset-0 w-full h-full text-white/10 drop-shadow-[0_0_15px_rgba(0,240,255,0.1)]"
              >
                <path
                  d="M50,150 L50,50 L150,50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M350,50 L450,50 L450,150"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M450,350 L450,450 L350,450"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M150,450 L50,450 L50,350"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="10 10"
                />
              </svg>

              <div className="text-center z-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 text-glow">
                    YUVRAJ SINGH
                  </h1>
                  <p className="text-cyber-neon font-mono text-sm tracking-[0.4em] mb-8 uppercase">
                    AI & Full Stack Engineer
                  </p>
                </motion.div>

                <div className="bg-black/60 backdrop-blur-md p-6 border border-white/5 rounded-lg max-w-sm mx-auto font-mono text-[10px] text-left leading-relaxed text-gray-400 border-l-cyber-neon border-l-2">
                  <div className="flex gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <Typewriter
                    delay={0.02}
                    text="> High-performance engineer with 2+ years experience in agentic workflows, LLMs, and real-time systems. Proven track record of reducing latency by 300ms and improving engagement by 35%."
                  />
                </div>
              </div>
            </motion.div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-6 h-10 border-2 border-cyber-neon/20 rounded-full flex justify-center p-1.5"
              >
                <motion.div
                  animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-1 h-2 bg-cyber-neon rounded-full"
                />
              </motion.div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[9px] font-mono text-cyber-neon uppercase tracking-[0.5em] animate-pulse">
                  Scroll to Initialize
                </span>
                <ChevronDown
                  className="text-cyber-neon/50 animate-bounce"
                  size={14}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section
          id="skills"
          className="py-32 px-6 max-w-7xl mx-auto relative content-none"
        >
          <motion.div
            style={{ y: land1Y }}
            className="absolute inset-x-0 bottom-0 z-0 flex items-end translate-y-20"
          >
            <Landscape type="mountains" className="w-full h-64 opacity-5" />
          </motion.div>
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              TECHNICAL <span className="text-cyber-neon">STACK</span>
            </h2>
            <div className="h-1 w-20 bg-cyber-neon" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkillNode
              title="AI & LLM Stack"
              icon={Cpu}
              skills={[
                "LangGraph",
                "LangChain",
                "OpenAI GPT-4o",
                "RAG",
                "Vector DBs",
                "Computer Vision",
              ]}
            />
            <SkillNode
              title="Core Engineering"
              icon={Server}
              skills={[
                "Next.js",
                "Python (Expert)",
                "FastAPI",
                "Node.js",
                "WebSockets",
                "Docker",
                "Playwright",
              ]}
            />
            <SkillNode
              title="Agentic Concepts"
              icon={Zap}
              skills={[
                "Agentic Workflows",
                "Prompt Engineering",
                "Microservices",
                "System Design",
                "Event-Driven Architecture",
              ]}
            />
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section
          id="projects"
          className="py-32 px-6 bg-white/[0.02] border-y border-white/5 relative overflow-hidden"
        >
          <motion.div
            style={{ y: land2Y }}
            className="absolute inset-0 z-0 flex items-end"
          >
            <Landscape type="city" className="w-full h-full opacity-10" />
          </motion.div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-16 text-right flex flex-col items-end">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase inline-block">
                High <span className="text-cyber-neon">Impact</span> Deployments
              </h2>
              <div className="h-1 w-40 bg-cyber-neon" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <HUDCard
                title="Self-Healing RPA Engine"
                type="Agentic AI Scraper"
                icon={BotIcon}
                impact="85% Success Rate"
                tech={["Python", "LangGraph", "GPT-4o Vision", "Playwright"]}
                description="Built an autonomous web scraper that identifies broken selectors via multi-modal feedback loops and rewrites its execution code in real-time."
              />
              <HUDCard
                title="PhygitalMax Backend"
                type="Real-time Synchronization"
                icon={Globe}
                impact="-300ms Latency"
                tech={["Node.js", "WebSockets", "Redis"]}
                description="Architected a multi-camera synchronization protocol for livestream commerce, supporting 10k+ concurrent users with sub-second latency."
              />
              <HUDCard
                title="Talk-to-Data SaaS"
                type="B2B AI Analytics"
                icon={Database}
                impact="Secure RAG"
                tech={["Next.js", "FastAPI", "LangChain SQL Agent"]}
                description="Natural language SQL query engine with PII sanitization, allowing non-technical managers to derive insights from raw databases."
              />
              <HUDCard
                title="HomeSeeker"
                type="IoT AI Security"
                icon={Trophy}
                impact="95% Accuracy"
                tech={["Python", "TensorFlow", "OpenCV", "IoT"]}
                description="1st Runner-Up @ CodeStorm. AI security device detecting fire, violence, and covered faces in real-time on low-power hardware."
              />
              <HUDCard
                title="Annotation Engine"
                type="Live Engagement"
                icon={Zap}
                impact="+35% Engagement"
                tech={["Next.js", "Real-time DB"]}
                description="Real-time collaborative annotation layer for live video sessions, significantly boosting user interaction during e-commerce events."
              />
              <HUDCard
                title="Chronosense"
                type="Cross-Platform Tool"
                icon={ChevronDown}
                impact="32% Efficiency"
                tech={["Flutter", "Node.js", "Firebase"]}
                description="Cross-platform time-tracking engine with real-time sync and actionable productivity analytics for diverse workflows."
              />
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS SECTION */}
        <section
          id="achievements"
          className="py-32 px-6 max-w-7xl mx-auto relative overflow-hidden"
        >
          <motion.div
            style={{ y: land2Y }}
            className="absolute inset-0 z-0 flex items-end translate-y-20"
          >
            <Landscape type="mountains" className="w-full h-full opacity-5" />
          </motion.div>
          <div className="relative z-10">
            <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase">
                HONORS & <span className="text-cyber-neon">ACHIEVEMENTS</span>
              </h2>
              <div className="h-1 w-20 bg-cyber-neon" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <HUDCard
                title="Winner - CodeStorm 2.0"
                type="Team RouteMe"
                icon={Trophy}
                impact='WTF "Wow That’s Fantastic" Innovation Award'
                tech={["AR/MR", "Immersive Tech", "OBLIS"]}
                description="Led Team RouteMe to victory at CodeStorm 2.0 organized by KocharTech. Developed OBLIS, an AR and merged reality solution that pushed the boundaries of immersive technology."
              />
              <HUDCard
                title="1st Runner-Up - CodeStorm Hackathon"
                type="AI Smart Home Security"
                icon={Trophy}
                impact="95% Detection Accuracy"
                tech={["AI", "IoT", "Computer Vision", "Real-time Alerts"]}
                description="Created HomeSeeker, an AI-powered security system detecting fire, smoke, violence, and covered faces. Reduced emergency response time by 40% through instant authoritative notifications."
              />
              <HUDCard
                title="Top 10 Finalist - All India Smart Hackathon"
                type="Portfolio Website Track"
                icon={Trophy}
                impact="Innovation Award"
                tech={[
                  "Portfolio Generator",
                  "Personal Branding",
                  "Scalable Templates",
                ]}
                description="Secured a Top 10 position in the prestigious national hackathon. Presented an innovative portfolio generator solution designed to streamline personal branding through vibrant, customizable templates."
              />
            </div>
          </div>
        </section>

        {/* SERVICE HISTORY */}
        <section
          id="experience"
          className="py-32 px-6 max-w-5xl mx-auto relative"
        >
          <motion.div
            style={{ y: land3Y }}
            className="absolute inset-0 z-0 flex items-end"
          >
            <Landscape type="mountains" className="w-full h-full opacity-10" />
          </motion.div>
          <div className="relative z-10">
            <div className="flex items-center gap-6 mb-16">
              <div className="p-4 bg-cyber-neon/10 rounded-full border border-cyber-neon/30 text-cyber-neon">
                <Code2 size={40} />
              </div>
              <div>
                <h2 className="text-3xl font-bold uppercase tracking-widest">
                  Experience <span className="text-gray-500">Log</span>
                </h2>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-1">
                  Kochar Tech Service History
                </p>
              </div>
            </div>

            <div className="space-y-16">
              <div className="relative pl-8 border-l border-white/10 group">
                <div className="absolute top-0 left-0 w-3 h-3 bg-cyber-neon rounded-full -translate-x-[6.5px] border-4 border-cyber-dark group-hover:scale-125 transition-transform" />
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">
                    Junior Engineer
                  </h3>
                  <span className="font-mono text-cyber-neon text-sm">
                    JULY 2024 - PRESENT
                  </span>
                </div>
                <p className="text-white/60 mb-6 font-light max-w-3xl leading-relaxed">
                  Driving core engineering for{" "}
                  <span className="text-white font-bold">PhygitalMax</span>.
                  Specialized in low-latency systems and AI integrations for
                  e-commerce at scale. Developed custom Chrome extension bridges
                  for RPA bots and real-time engagement modules.
                </p>
              </div>

              <div className="relative pl-8 border-l border-white/10 group">
                <div className="absolute top-0 left-0 w-3 h-3 bg-gray-600 rounded-full -translate-x-[6.5px] border-4 border-cyber-dark group-hover:bg-cyber-neon transition-colors" />
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">IT Intern</h3>
                  <span className="font-mono text-gray-500 text-sm">
                    JAN 2024 - JUNE 2024
                  </span>
                </div>
                <p className="text-white/60 font-light max-w-3xl leading-relaxed">
                  Refactored legacy API endpoints for scalability, achieving{" "}
                  <span className="text-white font-bold">99.9% uptime</span>.
                  Engineered core modules for cross-platform live video apps
                  using Flutter and Node.js.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTAs / REACH OUT */}
        <section
          id="contact"
          className="py-32 px-6 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.05),transparent)]"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-8">
              BUILD THE <span className="text-cyber-neon">FUTURE</span>
            </h2>
            <p className="text-gray-400 mb-12 font-mono text-sm uppercase tracking-widest leading-loose italic">
              Currently open for high-impact AI/Full-Stack roles. Let's build
              agentic systems that scale.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="mailto:yuvraj202001@gmail.com"
                className="px-8 py-4 bg-cyber-neon text-black font-bold uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1"
              >
                Establish Link
              </a>
              <a
                href="https://linkedin.com/in/Yuvraj3905"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 border border-cyber-neon text-cyber-neon font-bold uppercase tracking-widest hover:bg-cyber-neon/10 transition-all transform hover:-translate-y-1"
              >
                LinkedIn Matrix
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-20 border-t border-white/5 bg-cyber-dark py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.4em]">
            © 2024 Yuvraj Singh // AI Systems Architect
          </div>
          <div className="flex gap-8 text-gray-400">
            <a
              href="https://github.com/Yuvraj3905"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyber-neon transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/Yuvraj3905"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyber-neon transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:yuvraj202001@gmail.com"
              className="hover:text-cyber-neon transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Icon fallbacks
const BotIcon = ({ size }) => <Cpu size={size} />;
