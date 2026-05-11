import { useEffect, useRef } from "react";

export const useGlitchOnView = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.remove("glitch-in");
            void node.offsetWidth;
            node.classList.add("glitch-in");
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
};
