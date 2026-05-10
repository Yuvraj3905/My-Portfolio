import { motion } from "framer-motion";
import { getIcon } from "@/lib/icons";
import type { IconName } from "@/types";

interface SkillNodeProps {
  title: string;
  skills: string[];
  icon: IconName;
}

export const SkillNode = ({ title, skills, icon }: SkillNodeProps) => {
  const Icon = getIcon(icon);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="p-6 bg-black/60 border border-white/10 rounded-lg backdrop-blur-md hover:border-white/30 transition-all"
    >
      <div className="flex items-center gap-3 mb-4 text-cyber-neon">
        <Icon size={20} aria-hidden="true" />
        <h4 className="font-mono text-sm font-bold tracking-widest uppercase">
          {title}
        </h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-white/5 border border-white/10 text-[11px] text-gray-200 font-mono rounded-full hover:bg-white/10 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
