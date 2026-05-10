import { useCountUp } from "@/hooks/useCountUp";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export const AnimatedNumber = ({
  value,
  prefix = "",
  suffix = "",
  duration,
}: AnimatedNumberProps) => {
  const { value: current, ref } = useCountUp(value, duration);
  return (
    <span ref={ref}>
      {prefix}
      {current.toLocaleString()}
      {suffix}
    </span>
  );
};

const NUMBER_RE = /(-?\d+(?:\.\d+)?)/;

export const AnimatedImpact = ({ raw }: { raw: string }) => {
  const match = raw.match(NUMBER_RE);
  if (!match) return <span>{raw}</span>;
  const num = Number(match[1]);
  if (Number.isNaN(num)) return <span>{raw}</span>;
  const idx = match.index ?? 0;
  const before = raw.slice(0, idx);
  const after = raw.slice(idx + match[1].length);
  return (
    <>
      {before}
      <AnimatedNumber value={num} />
      {after}
    </>
  );
};
