import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        glid: {
          orange: "#F97316",
          orangeDark: "#EA580C",
          orangeLight: "#FB923C",
          orangeAccent: "#FDBA74",
          canvas: "#FAFAFA",
          card: "#FFFFFF",
          border: "#ECECEC",
          text: "#111827",
          muted: "#6B7280",
          success: "#16A34A",
          error: "#DC2626",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '28px',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'premium': '0 12px 32px -4px rgba(249, 115, 22, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'glow-orange': '0 0 25px -4px rgba(249, 115, 22, 0.25)',
      },
    },
  },
  plugins: [],
};
export default config;
