import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

interface LoaderProps {
  onComplete: () => void;
}

export const Loader = ({ onComplete }: LoaderProps) => (
  <motion.div
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cyber-dark text-cyber-neon"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
    role="status"
    aria-live="polite"
    aria-label="Loading portfolio"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative mb-8"
    >
      <div className="w-24 h-24 border-4 border-cyber-neon border-t-transparent rounded-full animate-spin shadow-[0_0_20px_#00F0FF] motion-reduce:animate-none" />
      <Terminal
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        size={32}
        aria-hidden="true"
      />
    </motion.div>
    <div className="w-64 h-1 bg-gray-800 rounded overflow-hidden">
      <motion.div
        className="h-full bg-cyber-neon shadow-[0_0_15px_#00F0FF]"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        onAnimationComplete={onComplete}
      />
    </div>
    <p className="mt-4 font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase">
      Establishing Agentic Link...
    </p>
  </motion.div>
);
