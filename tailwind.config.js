/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ---- PickaBook design tokens ----
        paper: "#FFFFFF",      // primary background
        ink: "#1B1A17",        // primary text, near-black warm charcoal
        "ink-soft": "#514D42", // secondary text
        sand: "#F1EBDD",       // light warm surface (cards, sections)
        "sand-deep": "#DED0AE",// borders / dividers on sand
        line: "#E7E1D2",       // hairline borders on white
        clay: "#8A7350",       // muted accent for CTAs / links
        "clay-dark": "#6E5B3E",
        dark: "#15140F",       // dark section background (newsletter, footer)
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Helvetica", "Arial", "sans-serif"],
      },
      maxWidth: {
        content: "1240px",
      },
      letterSpacing: {
        wideish: "0.02em",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        "menu-in": {
          "0%": { opacity: 0, transform: "translateY(-6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "drawer-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "menu-in": "menu-in 0.22s ease-out",
        "drawer-in": "drawer-in 0.35s cubic-bezier(0.65,0,0.35,1)",
      },
    },
  },
  plugins: [],
};
