/** @type {import('tailwindcss').Config} */
module.exports = {
  important: "#lawrence-home-root",
  corePlugins: {
    preflight: false,
  },
  content: [
    "./app/javascript/**/*.{js,jsx}",
    "./app/views/articles/index.html.erb",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        paper: "#faf9f7",
        muted: "#5c5c5c",
        line: "#d4d0c8",
        accent: "#1e3a5f",
        accentMuted: "#8b2942",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "Times New Roman", "serif"],
        body: ['"Source Serif 4"', "Georgia", "Times New Roman", "serif"],
        ui: ['"Inter"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["3.25rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["2.25rem", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "deck": ["1.125rem", { lineHeight: "1.55" }],
      },
      spacing: {
        18: "4.5rem",
      },
      maxWidth: {
        measure: "42rem",
        content: "1200px",
      },
      transitionDuration: {
        editorial: "220ms",
      },
    },
  },
  plugins: [],
};
