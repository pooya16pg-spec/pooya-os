import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#06080D",
        spatial: {
          surface: "rgba(15, 23, 42, 0.68)",
          border: "rgba(255, 255, 255, 0.12)",
          cyan: "#00F0FF",
          emerald: "#10B981",
          violet: "#8B5CF6",
        },
      },
      backgroundImage: {
        "xray-grid":
          "linear-gradient(to right, rgba(56, 189, 248, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.12) 1px, transparent 1px)",
      },
      backgroundSize: {
        "xray-size": "24px 24px",
      },
    },
  },
  plugins: [],
};
export default config;