import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  delay?: number;
  className?: string;
}

export const Typewriter = ({
  text,
  delay = 0.05,
  className = "",
}: TypewriterProps) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, delay * 1000);
    return () => clearInterval(interval);
  }, [text, delay]);

  return <span className={className}>{displayed}</span>;
};
