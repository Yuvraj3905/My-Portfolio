import { motion, useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";
import achievementsData from "@/data/achievements.json";
import { Landscape } from "@/components/Landscape";
import { HUDCard } from "@/components/HUDCard";
import type { Achievement } from "@/types";

const achievements = achievementsData as Achievement[];

interface AchievementsProps {
  containerRef: RefObject<HTMLElement>;
}

export const Achievements = ({ containerRef }: AchievementsProps) => {
  const { scrollYProgress } = useScroll({ target: containerRef });
  const land2Y = useTransform(scrollYProgress, [0.3, 0.6], [0, -150]);

  return (
    <section
      id="achievements"
      className="py-32 px-6 max-w-7xl mx-auto relative overflow-hidden"
      aria-label="Honors and achievements"
    >
      <motion.div
        style={{ y: land2Y }}
        className="absolute inset-0 z-0 flex items-end translate-y-20"
        aria-hidden="true"
      >
        <Landscape type="mountains" className="w-full h-full opacity-5" />
      </motion.div>
      <div className="relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase">
            HONORS & <span className="text-cyber-neon">ACHIEVEMENTS</span>
          </h2>
          <div className="h-1 w-20 bg-cyber-neon" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((a) => (
            <HUDCard
              key={a.title}
              title={a.title}
              type={a.type}
              icon={a.icon}
              impact={a.impact}
              tech={a.tech}
              description={a.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
