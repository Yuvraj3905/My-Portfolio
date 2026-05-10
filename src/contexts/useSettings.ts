import { useContext } from "react";
import { SettingsContext } from "@/contexts/SettingsContext";
import type { SettingsContextValue } from "@/contexts/SettingsContext";

export const useSettings = (): SettingsContextValue => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
};
