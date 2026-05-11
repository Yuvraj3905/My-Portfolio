import siteData from "@/data/site.json";
import { getIcon } from "@/lib/icons";
import { sfx } from "@/lib/sfx";
import { haptic } from "@/lib/haptics";
import type { SectionId, SiteConfig } from "@/types";

const site = siteData as SiteConfig;

interface NavHUDProps {
  activeSection: SectionId;
}

export const NavHUD = ({ activeSection }: NavHUDProps) => {
  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6 no-print"
    >
      {site.nav.map((item) => {
        const Icon = getIcon(item.icon);
        const isActive = activeSection === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-label={item.label}
            aria-current={isActive ? "true" : undefined}
            onClick={() => {
              sfx.play("tick");
              haptic("light");
            }}
            onMouseEnter={() => sfx.play("tick")}
            className={`group relative p-3 border rounded-sm transition-all duration-300 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-neon ${
              isActive
                ? "bg-cyber-neon border-cyber-neon text-black shadow-[0_0_15px_var(--cyber-neon)]"
                : "border-white/10 text-white/40 hover:border-white/40 hover:text-white"
            }`}
          >
            <Icon size={18} aria-hidden="true" />
            <span className="absolute right-full mr-4 px-2 py-1 bg-black/80 border border-white/10 text-[10px] font-mono tracking-widest text-cyber-neon opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase">
              {item.label}
            </span>
            {isActive && (
              <div
                aria-hidden="true"
                className="absolute -left-1 top-0 bottom-0 w-0.5 bg-black"
              />
            )}
          </a>
        );
      })}
    </nav>
  );
};
