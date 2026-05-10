type HapticPattern = "light" | "medium" | "double";

const patterns: Record<HapticPattern, number | number[]> = {
  light: 8,
  medium: 18,
  double: [10, 30, 10],
};

export const haptic = (pattern: HapticPattern = "light") => {
  if (typeof navigator === "undefined" || !navigator.vibrate) return;
  navigator.vibrate(patterns[pattern]);
};
