import { motion, useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";
import projectsData from "@/data/projects.json";
import { Landscape } from "@/components/Landscape";
import { HUDCard } from "@/components/HUDCard";
import type { Project } from "@/types";

const projects = projectsData as Project[];

interface ProjectsProps {
  containerRef: RefObject<HTMLElement>;
}

export const Projects = ({ containerRef }: ProjectsProps) => {
  const { scrollYProgress } = useScroll({ target: containerRef });
  const land2Y = useTransform(scrollYProgress, [0.3, 0.6], [0, -150]);

  return (
    <section
      id="projects"
      className="py-32 px-6 bg-cyber-dark/60 border-y border-white/5 relative overflow-hidden"
      aria-label="Featured projects"
    >
      <motion.div
        style={{ y: land2Y }}
        className="absolute inset-0 z-0 flex items-end"
        aria-hidden="true"
      >
        <Landscape type="city" className="w-full h-full opacity-10" />
      </motion.div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 text-right flex flex-col items-end">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase inline-block">
            High <span className="text-cyber-neon">Impact</span> Deployments
          </h2>
          <div className="h-1 w-40 bg-cyber-neon" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <HUDCard
              key={p.title}
              title={p.title}
              type={p.type}
              icon={p.icon}
              impact={p.impact}
              tech={p.tech}
              description={p.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
