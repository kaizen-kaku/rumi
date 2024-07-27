import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2c2b28',
        secondary: '#393937',
        accent: '#d97757',
        accent2: '#5a4c9d',
        warning: '#e6b800',
        error: '#cc3300',
      },
    },
  },
  plugins: [],
};

export default config;
