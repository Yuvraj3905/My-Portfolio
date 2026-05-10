import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(true);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    setCoarsePointer(isCoarse);
  }, []);

  useEffect(() => {
    if (coarsePointer) return;
    document.body.classList.add("cursor-hidden");
    return () => document.body.classList.remove("cursor-hidden");
  }, [coarsePointer]);

  useEffect(() => {
    if (coarsePointer) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.classList.contains("cursor-pointer");
      setHovered(isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseenter", onMouseEnter);
    document.body.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseenter", onMouseEnter);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [coarsePointer]);

  if (coarsePointer) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-12 h-12 border border-cyber-neon/30 rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.1)]"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          scale: hovered ? 1.4 : 1,
          rotate: hovered ? 90 : 0,
          opacity: isVisible ? 1 : 0,
          borderColor: hovered
            ? "rgba(0, 240, 255, 0.8)"
            : "rgba(0, 240, 255, 0.3)",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.5 }}
      >
        <div className="w-full h-[1px] bg-cyber-neon/20 absolute rotate-45" />
        <div className="w-full h-[1px] bg-cyber-neon/20 absolute -rotate-45" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 bg-cyber-neon clip-path-tactical pointer-events-none z-[9999] hidden md:block shadow-[0_0_10px_#00F0FF]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: isVisible ? 1 : 0,
          rotate: hovered ? 45 : 0,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 800, mass: 0.1 }}
      />
    </>
  );
};
