import { useEffect } from "react";
import { useTerminal } from "@/contexts/useTerminal";

export const useTerminalShortcut = () => {
  const { toggle } = useTerminal();
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggle]);
};
