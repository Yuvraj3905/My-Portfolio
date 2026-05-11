import { useEffect, useState } from "react";

export const PWAUpdater = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    let cancelled = false;
    void import("virtual:pwa-register").then(({ registerSW }) => {
      const update = registerSW({
        onNeedRefresh: () => {
          if (!cancelled) setUpdateAvailable(true);
        },
        onRegistered: (reg) => {
          if (reg && !cancelled) setRegistration(reg);
        },
      });
      void update;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!updateAvailable) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-6 right-6 z-[55] max-w-xs p-4 bg-cyber-dark/95 backdrop-blur-md border border-cyber-neon/40 text-cyber-neon shadow-[0_0_30px_rgba(0,240,255,0.2)] no-print"
    >
      <p className="font-mono text-[10px] uppercase tracking-widest mb-3">
        New build available
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            registration?.waiting?.postMessage({ type: "SKIP_WAITING" });
            window.location.reload();
          }}
          className="px-3 py-1 bg-cyber-neon text-black font-bold uppercase text-[10px] tracking-widest hover:bg-white transition-colors"
        >
          Reload
        </button>
        <button
          type="button"
          onClick={() => setUpdateAvailable(false)}
          className="px-3 py-1 border border-cyber-neon/30 text-cyber-neon uppercase text-[10px] tracking-widest hover:border-cyber-neon transition-colors"
        >
          Later
        </button>
      </div>
    </div>
  );
};
