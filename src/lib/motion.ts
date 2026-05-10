import { useReducedMotion } from "framer-motion";

export const useMotionSafe = (): boolean => !useReducedMotion();

export const fadeInUp = (motionSafe: boolean) =>
  motionSafe
    ? { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 } }
    : { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } };

export const fadeInScale = (motionSafe: boolean) =>
  motionSafe
    ? {
        initial: { opacity: 0, scale: 0.95 },
        whileInView: { opacity: 1, scale: 1 },
      }
    : {
        initial: { opacity: 1, scale: 1 },
        whileInView: { opacity: 1, scale: 1 },
      };
