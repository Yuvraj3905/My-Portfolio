import { createContext, useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { sfx } from "@/lib/sfx";

export type ThemeName = "cyber" | "amber" | "matrix";

export interface Settings {
  soundOn: boolean;
  crt: boolean;
  theme: ThemeName;
  matrixMode: boolean;
}

export interface SettingsContextValue extends Settings {
  toggleSound: () => void;
  setSound: (v: boolean) => void;
  toggleCrt: () => void;
  setCrt: (v: boolean) => void;
  setTheme: (t: ThemeName) => void;
  toggleMatrix: () => void;
  setMatrix: (v: boolean) => void;
}

const STORAGE_KEY = "ys-portfolio-settings-v1";

const defaultSettings: Settings = {
  soundOn: false,
  crt: false,
  theme: "cyber",
  matrixMode: false,
};

const loadSettings = (): Settings => {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings;
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return { ...defaultSettings, ...parsed, matrixMode: false };
  } catch {
    return defaultSettings;
  }
};

const persist = (s: Settings) => {
  try {
    const { soundOn, crt, theme } = s;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ soundOn, crt, theme }));
  } catch {
    // swallow quota errors
  }
};

// eslint-disable-next-line react-refresh/only-export-components
export const SettingsContext = createContext<SettingsContextValue | null>(null);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  useEffect(() => {
    persist(settings);
    sfx.setMuted(!settings.soundOn);
    if (typeof document !== "undefined") {
      document.body.dataset.theme = settings.theme;
      document.body.classList.toggle("crt-mode", settings.crt);
    }
  }, [settings]);

  const setSound = useCallback((v: boolean) => {
    setSettings((s) => ({ ...s, soundOn: v }));
    if (v) sfx.resume();
  }, []);
  const toggleSound = useCallback(
    () =>
      setSettings((s) => {
        if (!s.soundOn) sfx.resume();
        return { ...s, soundOn: !s.soundOn };
      }),
    [],
  );
  const setCrt = useCallback(
    (v: boolean) => setSettings((s) => ({ ...s, crt: v })),
    [],
  );
  const toggleCrt = useCallback(
    () => setSettings((s) => ({ ...s, crt: !s.crt })),
    [],
  );
  const setTheme = useCallback(
    (t: ThemeName) => setSettings((s) => ({ ...s, theme: t })),
    [],
  );
  const setMatrix = useCallback(
    (v: boolean) => setSettings((s) => ({ ...s, matrixMode: v })),
    [],
  );
  const toggleMatrix = useCallback(
    () => setSettings((s) => ({ ...s, matrixMode: !s.matrixMode })),
    [],
  );

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        toggleSound,
        setSound,
        toggleCrt,
        setCrt,
        setTheme,
        toggleMatrix,
        setMatrix,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
