import { motion, useScroll, useTransform } from "framer-motion";
import { Activity as ActivityIcon } from "lucide-react";
import type { RefObject } from "react";
import { GitHubContributions } from "@/components/GitHubContributions";
import { Landscape } from "@/components/Landscape";

interface ActivityProps {
  containerRef: RefObject<HTMLElement>;
}

export const Activity = ({ containerRef }: ActivityProps) => {
  const { scrollYProgress } = useScroll({ target: containerRef });
  const landY = useTransform(scrollYProgress, [0.2, 0.5], [0, -120]);

  return (
    <section
      id="activity"
      className="py-32 px-6 bg-white/[0.02] border-y border-white/5 relative overflow-hidden"
      aria-label="Live development activity"
    >
      <motion.div
        style={{ y: landY }}
        className="absolute inset-0 z-0 flex items-end opacity-30"
        aria-hidden="true"
      >
        <Landscape type="city" className="w-full h-full opacity-10" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-4 bg-cyber-neon/10 border border-cyber-neon/30 text-cyber-neon rounded-sm">
            <ActivityIcon
              size={28}
              className="animate-pulse motion-reduce:animate-none"
              aria-hidden="true"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-bold uppercase">
              LIVE <span className="text-cyber-neon">PULSE</span>
            </h2>
            <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mt-1">
              Real-time signal from GitHub public events
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GitHubContributions />
          </div>

          <div className="grid grid-cols-2 gap-4 content-start">
            <StatTile label="Status" value="ACTIVE" pulse />
            <StatTile label="Build" value="GREEN" />
            <StatTile label="Stack" value="TS · Vite" />
            <StatTile label="Region" value="IN-DL" />
          </div>
        </div>

        <p className="mt-8 font-mono text-[10px] text-gray-400 uppercase tracking-widest">
          {
            "// data sourced live from github.com/Yuvraj3905 · refreshes on visit"
          }
        </p>
      </div>
    </section>
  );
};

interface StatTileProps {
  label: string;
  value: string;
  pulse?: boolean;
}

const StatTile = ({ label, value, pulse }: StatTileProps) => (
  <div className="p-4 bg-black/40 border border-white/10 rounded-lg">
    <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest mb-2">
      {label}
    </p>
    <div className="flex items-center gap-2">
      {pulse && (
        <span
          aria-hidden="true"
          className="w-2 h-2 rounded-full bg-cyber-neon animate-pulse motion-reduce:animate-none shadow-[0_0_8px_#00F0FF]"
        />
      )}
      <span className="font-mono text-sm font-bold text-cyber-neon tracking-widest uppercase">
        {value}
      </span>
    </div>
  </div>
);
