import { useContext } from "react";
import { TerminalContext } from "@/contexts/TerminalContext";
import type { TerminalContextValue } from "@/contexts/TerminalContext";

export const useTerminal = (): TerminalContextValue => {
  const ctx = useContext(TerminalContext);
  if (!ctx) throw new Error("useTerminal must be used inside TerminalProvider");
  return ctx;
};
