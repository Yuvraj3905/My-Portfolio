import { useEffect, useState } from "react";

const USERNAME = "Yuvraj3905";
const DAYS = 49;

interface DayCell {
  date: string;
  count: number;
}

const buildEmptyGrid = (): DayCell[] => {
  const today = new Date();
  const grid: DayCell[] = [];
  for (let i = DAYS - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    grid.push({ date: d.toISOString().slice(0, 10), count: 0 });
  }
  return grid;
};

export const GitHubContributions = () => {
  const [grid, setGrid] = useState<DayCell[]>(buildEmptyGrid);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${USERNAME}/events/public?per_page=100`,
          { headers: { Accept: "application/vnd.github+json" } },
        );
        if (!res.ok) throw new Error(String(res.status));
        const events = (await res.json()) as Array<{
          type: string;
          created_at: string;
          payload?: { commits?: unknown[] };
        }>;
        const counts = new Map<string, number>();
        events.forEach((e) => {
          if (e.type !== "PushEvent") return;
          const day = e.created_at.slice(0, 10);
          const adds = e.payload?.commits?.length ?? 1;
          counts.set(day, (counts.get(day) ?? 0) + adds);
        });
        if (cancelled) return;
        setGrid((prev) =>
          prev.map((c) => ({ ...c, count: counts.get(c.date) ?? 0 })),
        );
      } catch {
        if (!cancelled) setError(true);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const intensity = (count: number): string => {
    if (count === 0) return "bg-white/5";
    if (count < 2) return "bg-cyber-neon/30";
    if (count < 5) return "bg-cyber-neon/60";
    if (count < 10) return "bg-cyber-neon/80";
    return "bg-cyber-neon shadow-[0_0_8px_#00F0FF]";
  };

  return (
    <div className="p-6 bg-black/60 border border-white/10 rounded-lg backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-mono text-sm font-bold tracking-widest uppercase text-cyber-neon">
          Live Activity
        </h4>
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[9px] text-gray-400 hover:text-cyber-neon uppercase tracking-widest"
        >
          @{USERNAME}
        </a>
      </div>
      <div
        className="grid grid-flow-col gap-1"
        style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}
        aria-label="Recent GitHub push activity"
      >
        {grid.map((day) => (
          <div
            key={day.date}
            title={`${day.date}: ${day.count} commit${day.count === 1 ? "" : "s"}`}
            className={`w-3 h-3 rounded-sm ${intensity(day.count)}`}
          />
        ))}
      </div>
      <p className="mt-4 font-mono text-[9px] text-gray-400 uppercase tracking-widest">
        {error ? "// activity feed offline" : "// last 7 weeks · public events"}
      </p>
    </div>
  );
};
