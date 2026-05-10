import { motion, AnimatePresence } from "framer-motion";
import { Database } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import siteData from "@/data/site.json";
import { useResume } from "@/contexts/useResume";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import type { SiteConfig } from "@/types";

const site = siteData as SiteConfig;

const STATUSES = [
  "ESTABLISHING ENCRYPTED LINK...",
  "DECRYPTING BIOMETRIC DATA...",
  "SYNCHRONIZING WITH CLOUD CORE...",
  "PULLING ENCRYPTED ARCHIVE...",
  "CHECKSUM VERIFICATION...",
  "FINALIZING DOWNLOAD...",
];

const HEX_CHARS = "0123456789ABCDEF";
const generateHex = (): string => {
  let s = "";
  for (let i = 0; i < 20; i++) {
    s += HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
  }
  return s;
};

export const ResumeModal = () => {
  const { isOpen, close } = useResume();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(STATUSES[0]);
  const [dataStream, setDataStream] = useState<string[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);

  useFocusTrap(dialogRef, isOpen, close);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setDataStream((prev) => [generateHex(), ...prev.slice(0, 15)]);
    }, 100);
    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setProgress(0);
    setStatus(STATUSES[0]);
    let currentStatusIndex = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const newProgress = prev + Math.random() * 10;
        const statusIndex = Math.floor((newProgress / 100) * STATUSES.length);
        if (statusIndex > currentStatusIndex && statusIndex < STATUSES.length) {
          currentStatusIndex = statusIndex;
          setStatus(STATUSES[statusIndex]);
        }
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    if (progress !== 100) return;
    const timer = setTimeout(() => {
      close();
      const link = document.createElement("a");
      link.href = site.resumeUrl;
      link.download = site.resumeFileName;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 800);
    return () => clearTimeout(timer);
  }, [progress, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[250] flex items-center justify-center bg-black/95 backdrop-blur-2xl overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Resume download"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 flex justify-between px-4 opacity-10 pointer-events-none"
          >
            <div className="font-mono text-[10px] text-cyber-neon leading-none flex flex-col">
              {dataStream.map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
            <div className="font-mono text-[10px] text-cyber-neon leading-none flex flex-col items-end">
              {dataStream.map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          </div>

          <div
            ref={dialogRef}
            className="w-full max-w-lg p-1 mr-4 ml-4 bg-gradient-to-br from-cyber-neon/30 to-transparent clip-path-tactical"
          >
            <div className="bg-cyber-dark p-8 md:p-12 relative clip-path-tactical">
              <div className="scanline motion-reduce:hidden" />

              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-cyber-neon/10 rounded-sm border border-cyber-neon/20">
                  <Database
                    className="text-cyber-neon animate-pulse motion-reduce:animate-none"
                    size={24}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">
                    Data <span className="text-cyber-neon">Retrieval</span>
                  </h2>
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">
                    System Protocol v4.0.2
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex justify-between font-mono text-[11px] text-cyber-neon uppercase tracking-widest">
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {status}
                  </motion.span>
                  <span
                    className="text-white font-black"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {Math.floor(progress)}%
                  </span>
                </div>

                <div
                  className="relative h-2 w-full bg-white/5 overflow-hidden"
                  role="progressbar"
                  aria-valuenow={Math.floor(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <motion.div
                    className="h-full bg-cyber-neon shadow-[0_0_20px_#00F0FF]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] w-20 animate-[scanline_2s_infinite] motion-reduce:animate-none" />
                </div>

                <div className="flex gap-1.5 h-1.5">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1"
                      animate={{
                        backgroundColor:
                          progress > (i / 24) * 100
                            ? "#00F0FF"
                            : "rgba(255, 255, 255, 0.05)",
                        boxShadow:
                          progress > (i / 24) * 100
                            ? "0 0 10px #00F0FF"
                            : "none",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-gray-500 uppercase tracking-[0.3em]">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-neon animate-ping motion-reduce:animate-none" />
                  AUTHENTICATED_DOWNLOAD
                </div>
                <span>NODE_ID: 87x-ALPHA</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
