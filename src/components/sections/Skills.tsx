import { motion, useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";
import skillsData from "@/data/skills.json";
import { GitHubContributions } from "@/components/GitHubContributions";
import { Landscape } from "@/components/Landscape";
import { SkillNode } from "@/components/SkillNode";
import type { SkillGroup } from "@/types";

const skills = skillsData as SkillGroup[];

interface SkillsProps {
  containerRef: RefObject<HTMLElement>;
}

export const Skills = ({ containerRef }: SkillsProps) => {
  const { scrollYProgress } = useScroll({ target: containerRef });
  const land1Y = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  return (
    <section
      id="skills"
      className="py-32 px-6 max-w-7xl mx-auto relative"
      aria-label="Technical stack"
    >
      <motion.div
        style={{ y: land1Y }}
        className="absolute inset-x-0 bottom-0 z-0 flex items-end translate-y-20"
        aria-hidden="true"
      >
        <Landscape type="mountains" className="w-full h-64 opacity-5" />
      </motion.div>
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          TECHNICAL <span className="text-cyber-neon">STACK</span>
        </h2>
        <div className="h-1 w-20 bg-cyber-neon" aria-hidden="true" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((group) => (
          <SkillNode
            key={group.title}
            title={group.title}
            icon={group.icon}
            skills={group.skills}
          />
        ))}
        <GitHubContributions />
      </div>
    </section>
  );
};
