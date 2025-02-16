import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "104px": "104px",
        "314px": "314px",
      },
      colors: {
        "interval-min": "#c3ff3d",
        primary: "#c3ff3d",
      },
      backgroundImage: {
        "gradient-horario":
          "linear-gradient(to bottom, #ffffff0d, #ffffff26)",
      },
    },
  },
  plugins: [],
} satisfies Config;
