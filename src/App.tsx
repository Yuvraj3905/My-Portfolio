import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useRef, useState } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Loader } from "@/components/Loader";
import { NavHUD } from "@/components/NavHUD";
import { ResumeModal } from "@/components/ResumeModal";
import { TerminalSystem } from "@/components/TerminalSystem";
import { TerminalTrigger } from "@/components/TerminalTrigger";
import { Hero } from "@/components/sections/Hero";
import { ResumeProvider } from "@/contexts/ResumeContext";
import { TerminalProvider } from "@/contexts/TerminalContext";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useTerminalShortcut } from "@/hooks/useTerminalShortcut";

const Skills = lazy(() =>
  import("@/components/sections/Skills").then((m) => ({ default: m.Skills })),
);
const Projects = lazy(() =>
  import("@/components/sections/Projects").then((m) => ({
    default: m.Projects,
  })),
);
const Achievements = lazy(() =>
  import("@/components/sections/Achievements").then((m) => ({
    default: m.Achievements,
  })),
);
const Experience = lazy(() =>
  import("@/components/sections/Experience").then((m) => ({
    default: m.Experience,
  })),
);
const Contact = lazy(() =>
  import("@/components/sections/Contact").then((m) => ({ default: m.Contact })),
);
const Footer = lazy(() =>
  import("@/components/sections/Footer").then((m) => ({ default: m.Footer })),
);

const SectionFallback = () => (
  <div
    role="status"
    aria-live="polite"
    className="py-32 flex items-center justify-center text-cyber-neon/60 font-mono text-[10px] uppercase tracking-[0.4em]"
  >
    Loading...
  </div>
);

const AppShell = () => {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLElement>(null);
  const activeSection = useActiveSection();
  useTerminalShortcut();

  return (
    <div className="bg-cyber-dark text-white min-h-screen overflow-x-hidden selection:bg-cyber-neon selection:text-black">
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <NavHUD activeSection={activeSection} />
      <TerminalSystem />
      <ResumeModal />
      <CustomCursor />
      <TerminalTrigger />

      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none opacity-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#00F0FF11,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <main ref={containerRef} className="relative z-10 w-full">
        <Hero containerRef={containerRef} />

        <Suspense fallback={<SectionFallback />}>
          <Skills containerRef={containerRef} />
          <Projects containerRef={containerRef} />
          <Achievements containerRef={containerRef} />
          <Experience containerRef={containerRef} />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <ResumeProvider>
        <TerminalProvider>
          <AppShell />
        </TerminalProvider>
      </ResumeProvider>
    </ErrorBoundary>
  );
}
