import { createContext, useCallback, useState } from "react";
import type { ReactNode } from "react";

export interface ResumeContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ResumeContext = createContext<ResumeContextValue | null>(null);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return (
    <ResumeContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ResumeContext.Provider>
  );
};
