import { Link2 } from "lucide-react";
import { useState } from "react";
import { haptic } from "@/lib/haptics";
import { sfx } from "@/lib/sfx";

interface ShareButtonProps {
  anchor: string;
  label?: string;
}

export const ShareButton = ({
  anchor,
  label = "Copy link to this card",
}: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${anchor}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      sfx.play("success");
      haptic("light");
      setTimeout(() => setCopied(false), 1600);
    } catch {
      sfx.play("error");
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={label}
      className="absolute top-3 right-3 z-20 p-1.5 border border-white/10 bg-black/60 text-white/40 hover:text-cyber-neon hover:border-cyber-neon/50 rounded transition-colors opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-neon"
    >
      <Link2 size={12} aria-hidden="true" />
      {copied && (
        <span
          role="status"
          className="absolute -top-7 right-0 text-[9px] font-mono text-cyber-neon bg-black px-2 py-0.5 border border-cyber-neon/30 uppercase tracking-widest whitespace-nowrap"
        >
          Copied
        </span>
      )}
    </button>
  );
};
