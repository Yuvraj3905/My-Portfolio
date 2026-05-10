import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { RefObject } from "react";
import siteData from "@/data/site.json";
import { Landscape } from "@/components/Landscape";
import { Typewriter } from "@/components/Typewriter";
import type { SiteConfig } from "@/types";

const site = siteData as SiteConfig;

interface HeroProps {
  containerRef: RefObject<HTMLElement>;
}

export const Hero = ({ containerRef }: HeroProps) => {
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 20]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08, 0.1], [1, 1, 0]);
  const land1Y = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  return (
    <section id="hero" className="h-[200vh] relative" aria-label="Introduction">
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
          <svg
            viewBox="0 0 500 500"
            className="absolute inset-0 w-full h-full text-white/10 drop-shadow-[0_0_15px_rgba(0,240,255,0.1)]"
            aria-hidden="true"
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
                {site.name.toUpperCase()}
              </h1>
              <p className="text-cyber-neon font-mono text-sm tracking-[0.4em] mb-8 uppercase">
                {site.role}
              </p>
            </motion.div>

            <div className="bg-black/60 backdrop-blur-md p-6 border border-white/5 rounded-lg max-w-sm mx-auto font-mono text-[10px] text-left leading-relaxed text-gray-300 border-l-cyber-neon border-l-2">
              <div className="flex gap-2 mb-2" aria-hidden="true">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse motion-reduce:animate-none" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <Typewriter delay={0.02} text={site.bio} />
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
            aria-hidden="true"
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
            <span className="text-[9px] font-mono text-cyber-neon uppercase tracking-[0.5em] animate-pulse motion-reduce:animate-none">
              Scroll to Initialize
            </span>
            <ChevronDown
              className="text-cyber-neon/50 animate-bounce motion-reduce:animate-none"
              size={14}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
