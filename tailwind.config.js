/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./main.tsx", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: "#050505",
          panel: "#1A1A1A",
          neon: "#00F0FF",
          danger: "#FF2A6D",
        },
        "cyber-neon": "#00F0FF",
        "cyber-dark": "#050505",
        "cyber-panel": "#111111",
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
