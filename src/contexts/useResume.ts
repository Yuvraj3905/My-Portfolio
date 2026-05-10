import { useContext } from "react";
import { ResumeContext } from "@/contexts/ResumeContext";
import type { ResumeContextValue } from "@/contexts/ResumeContext";

export const useResume = (): ResumeContextValue => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used inside ResumeProvider");
  return ctx;
};
