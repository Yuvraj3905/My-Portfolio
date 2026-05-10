import { motion } from "framer-motion";
import { getIcon } from "@/lib/icons";
import type { IconName } from "@/types";

interface HUDCardProps {
  title: string;
  type: string;
  description: string;
  icon: IconName;
  impact?: string;
  tech?: string[];
}

export const HUDCard = ({
  title,
  type,
  description,
  icon,
  impact,
  tech,
}: HUDCardProps) => {
  const Icon = getIcon(icon);
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative p-6 bg-cyber-panel/40 border border-white/10 backdrop-blur-xl group hover:border-cyber-neon/50 transition-all duration-500 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-8 bg-cyber-neon/30" />
      <div className="absolute top-0 left-0 w-8 h-1 bg-cyber-neon/30" />

      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-cyber-dark border border-white/5 text-cyber-neon rounded-lg group-hover:shadow-[0_0_15px_#00F0FF33] transition-all">
          <Icon size={24} aria-hidden="true" />
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
      <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {tech?.map((t) => (
          <span
            key={t}
            className="text-[9px] font-mono text-white/60 border border-white/10 px-2 py-0.5 rounded"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-cyber-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/20 group-hover:border-cyber-neon transition-colors" />
    </motion.article>
  );
};
