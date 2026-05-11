import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { HUDControls } from "@/components/HUDControls";
import { Loader } from "@/components/Loader";
import { MatrixRain } from "@/components/MatrixRain";
import { NavHUD } from "@/components/NavHUD";
import { PWAUpdater } from "@/components/PWAUpdater";
import { ResumeModal } from "@/components/ResumeModal";
import { ShaderBackground } from "@/components/ShaderBackground";
import { TerminalSystem } from "@/components/TerminalSystem";
import { TerminalTrigger } from "@/components/TerminalTrigger";
import { VisitorCounter } from "@/components/VisitorCounter";
import { Hero } from "@/components/sections/Hero";
import { ResumeProvider } from "@/contexts/ResumeContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { TerminalProvider } from "@/contexts/TerminalContext";
import { useSettings } from "@/contexts/useSettings";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useHashRoute } from "@/hooks/useHashRoute";
import { useKonami } from "@/hooks/useKonami";
import { useTerminalShortcut } from "@/hooks/useTerminalShortcut";
import { sfx } from "@/lib/sfx";
import { haptic } from "@/lib/haptics";

const Skills = lazy(() =>
  import("@/components/sections/Skills").then((m) => ({ default: m.Skills })),
);
const Activity = lazy(() =>
  import("@/components/sections/Activity").then((m) => ({
    default: m.Activity,
  })),
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
const ResumePage = lazy(() =>
  import("@/routes/Resume").then((m) => ({ default: m.ResumePage })),
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

const PortfolioMain = () => {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLElement>(null);
  const activeSection = useActiveSection();
  const { setMatrix, matrixMode } = useSettings();
  useTerminalShortcut();

  useKonami(() => {
    setMatrix(true);
    sfx.play("glitch");
    haptic("double");
  });

  useEffect(() => {
    if (!loading) sfx.play("success");
  }, [loading]);

  useEffect(() => {
    sfx.play("glitch");
    haptic("light");
  }, [activeSection]);

  return (
    <div className="bg-cyber-dark text-white min-h-screen overflow-x-hidden selection:bg-cyber-neon selection:text-black">
      <ShaderBackground />
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-b from-cyber-dark/40 via-cyber-dark/70 to-cyber-dark/85"
      />
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <NavHUD activeSection={activeSection} />
      <TerminalSystem />
      <ResumeModal />
      <CustomCursor />
      <TerminalTrigger />
      <VisitorCounter />
      <HUDControls />
      {matrixMode && <MatrixRain />}

      <main ref={containerRef} className="relative z-10 w-full">
        <Hero containerRef={containerRef} />

        <Suspense fallback={<SectionFallback />}>
          <Skills containerRef={containerRef} />
          <Activity containerRef={containerRef} />
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

const Router = () => {
  const hash = useHashRoute();
  if (hash === "#/resume" || hash === "#resume") {
    return (
      <Suspense fallback={<SectionFallback />}>
        <ResumePage />
      </Suspense>
    );
  }
  return <PortfolioMain />;
};

export default function App() {
  return (
    <ErrorBoundary>
      <SettingsProvider>
        <ResumeProvider>
          <TerminalProvider>
            <Router />
            <PWAUpdater />
          </TerminalProvider>
        </ResumeProvider>
      </SettingsProvider>
    </ErrorBoundary>
  );
}
