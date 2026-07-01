/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  important: ".lawrence-app",
  corePlugins: {
    preflight: false,
  },
  content: [
    "./app/javascript/**/*.{js,jsx}",
    "./app/views/**/*.html.erb",
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        accentMuted: "rgb(var(--color-accent-muted) / <alpha-value>)",
      },
      fontFamily: {
        display: ['"Newsreader"', "Georgia", "Times New Roman", "serif"],
        body: ['"Newsreader"', "Georgia", "Times New Roman", "serif"],
        ui: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["3.25rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["2.25rem", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        deck: ["1.125rem", { lineHeight: "1.55" }],
      },
      spacing: {
        18: "4.5rem",
      },
      maxWidth: {
        measure: "42rem",
        content: "1400px",
      },
      transitionDuration: {
        editorial: "120ms",
      },
    },
  },
  plugins: [],
};
