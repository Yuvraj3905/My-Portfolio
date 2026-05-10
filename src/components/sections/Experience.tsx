import { motion, useScroll, useTransform } from "framer-motion";
import { Code2 } from "lucide-react";
import type { RefObject } from "react";
import experienceData from "@/data/experience.json";
import { Landscape } from "@/components/Landscape";
import type { ExperienceEntry } from "@/types";

const experience = experienceData as ExperienceEntry[];

interface ExperienceProps {
  containerRef: RefObject<HTMLElement>;
}

const highlightDescription = (description: string, highlights: string[]) => {
  let result: (string | JSX.Element)[] = [description];
  highlights.forEach((h, idx) => {
    const next: (string | JSX.Element)[] = [];
    result.forEach((part) => {
      if (typeof part !== "string") {
        next.push(part);
        return;
      }
      const split = part.split(h);
      split.forEach((seg, i) => {
        next.push(seg);
        if (i < split.length - 1) {
          next.push(
            <span key={`${idx}-${i}`} className="text-white font-bold">
              {h}
            </span>,
          );
        }
      });
    });
    result = next;
  });
  return result;
};

export const Experience = ({ containerRef }: ExperienceProps) => {
  const { scrollYProgress } = useScroll({ target: containerRef });
  const land3Y = useTransform(scrollYProgress, [0.6, 1], [0, -200]);

  return (
    <section
      id="experience"
      className="py-32 px-6 max-w-5xl mx-auto relative"
      aria-label="Experience log"
    >
      <motion.div
        style={{ y: land3Y }}
        className="absolute inset-0 z-0 flex items-end"
        aria-hidden="true"
      >
        <Landscape type="mountains" className="w-full h-full opacity-10" />
      </motion.div>
      <div className="relative z-10">
        <div className="flex items-center gap-6 mb-16">
          <div className="p-4 bg-cyber-neon/10 rounded-full border border-cyber-neon/30 text-cyber-neon">
            <Code2 size={40} aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-3xl font-bold uppercase tracking-widest">
              Experience <span className="text-gray-400">Log</span>
            </h2>
            <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mt-1">
              Kochar Tech Service History
            </p>
          </div>
        </div>

        <ol className="space-y-16 list-none p-0">
          {experience.map((entry) => (
            <li
              key={entry.role + entry.period}
              className="relative pl-8 border-l border-white/10 group"
            >
              <div
                className={`absolute top-0 left-0 w-3 h-3 rounded-full -translate-x-[6.5px] border-4 border-cyber-dark transition-all ${
                  entry.current
                    ? "bg-cyber-neon group-hover:scale-125"
                    : "bg-gray-600 group-hover:bg-cyber-neon"
                }`}
                aria-hidden="true"
              />
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">{entry.role}</h3>
                <span
                  className={`font-mono text-sm ${entry.current ? "text-cyber-neon" : "text-gray-400"}`}
                >
                  {entry.period}
                </span>
              </div>
              <p className="text-white/80 mb-2 font-light max-w-3xl leading-relaxed">
                {highlightDescription(entry.description, entry.highlights)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
