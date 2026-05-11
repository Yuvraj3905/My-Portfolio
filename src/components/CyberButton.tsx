import type { ReactNode } from "react";
import { sfx } from "@/lib/sfx";
import { haptic } from "@/lib/haptics";

type Variant = "primary" | "secondary" | "tertiary";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

interface ButtonProps extends BaseProps {
  onClick?: () => void;
  href?: undefined;
}

interface AnchorProps extends BaseProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: undefined;
}

type CyberButtonProps = ButtonProps | AnchorProps;

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-cyber-neon border-cyber-neon text-black hover:bg-white hover:border-white",
  secondary:
    "bg-transparent border-cyber-neon text-cyber-neon hover:bg-cyber-neon/10",
  tertiary:
    "bg-transparent border-white/20 text-white/50 hover:border-cyber-neon hover:text-cyber-neon",
};

export const CyberButton = (props: CyberButtonProps) => {
  const { children, variant = "primary", className = "" } = props;
  const isSecondary = variant === "secondary";

  const playInteract = () => {
    sfx.play("beep");
    haptic("medium");
  };

  const content = (
    <div
      className="relative overflow-hidden group"
      onMouseEnter={() => sfx.play("tick")}
    >
      <div
        className={`relative px-8 py-4 font-black uppercase tracking-[0.2em] text-sm transition-all duration-300 clip-path-tactical border-2 ${variantClasses[variant]} ${className}`}
      >
        <span className="relative z-10 block group-hover:animate-glitch motion-reduce:group-hover:animate-none">
          {children}
        </span>
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30"
        />
        {isSecondary && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cyber-neon/0 group-hover:bg-cyber-neon/5 transition-colors"
          />
        )}
      </div>
    </div>
  );

  if ("href" in props && props.href) {
    return (
      <a
        href={props.href}
        target={props.target}
        rel={props.rel}
        onClick={playInteract}
        className="block no-underline focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-neon"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        playInteract();
        if ("onClick" in props && props.onClick) props.onClick();
      }}
      className="block focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-neon"
    >
      {content}
    </button>
  );
};
