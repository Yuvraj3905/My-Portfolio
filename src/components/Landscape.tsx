interface LandscapeProps {
  opacity?: number;
  color?: string;
  type?: "mountains" | "city";
  className?: string;
}

export const Landscape = ({
  opacity = 0.2,
  color = "#00F0FF",
  type = "mountains",
  className = "",
}: LandscapeProps) => {
  if (type === "mountains") {
    return (
      <svg
        viewBox="0 0 1000 300"
        className={`pointer-events-none fill-none stroke-current ${className}`}
        style={{ opacity, color }}
        aria-hidden="true"
      >
        <path
          d="M0,300 L150,150 L300,250 L450,50 L600,200 L800,50 L1000,200 L1000,300 Z"
          strokeWidth="1"
          strokeDasharray="5 5"
        />
        <path
          d="M0,300 L100,200 L250,250 L400,100 L550,200 L700,50 L850,150 L1000,100 L1000,300 Z"
          strokeWidth="2"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 1000 300"
      className={`pointer-events-none fill-none stroke-current ${className}`}
      style={{ opacity, color }}
      aria-hidden="true"
    >
      <path
        d="M0,300 L50,150 L100,150 L120,50 L150,50 L170,200 L250,200 L280,100 L350,100 L400,250 L500,250 L550,50 L650,50 L700,200 L800,200 L850,100 L950,100 L1000,300 Z"
        strokeWidth="2"
      />
    </svg>
  );
};
