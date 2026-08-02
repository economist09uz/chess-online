import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        boardLight: "#f0d9b5",
        boardDark: "#b58863",
        highlight: "rgba(255, 255, 0, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
