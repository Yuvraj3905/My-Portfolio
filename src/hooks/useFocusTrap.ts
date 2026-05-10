import { useEffect } from "react";
import type { RefObject } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export const useFocusTrap = (
  containerRef: RefObject<HTMLElement>,
  active: boolean,
  onEscape?: () => void,
) => {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const node = containerRef.current;
    const previousActive = document.activeElement as HTMLElement | null;

    const focusables = node.querySelectorAll<HTMLElement>(FOCUSABLE);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    first?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onEscape) {
        e.preventDefault();
        onEscape();
        return;
      }
      if (e.key !== "Tab" || focusables.length === 0) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    node.addEventListener("keydown", handleKey);
    return () => {
      node.removeEventListener("keydown", handleKey);
      previousActive?.focus?.();
    };
  }, [active, containerRef, onEscape]);
};
