import { createContext, useCallback, useState } from "react";
import type { ReactNode } from "react";

export interface TerminalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TerminalContext = createContext<TerminalContextValue | null>(null);

export const TerminalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((p) => !p), []);
  return (
    <TerminalContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </TerminalContext.Provider>
  );
};
