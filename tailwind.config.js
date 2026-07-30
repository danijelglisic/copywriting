/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Akcenat — LinkedIn plava. Dugmici, linkovi, logo, hover stanja.
        secondary: "#0A66C2",
        "primary-contrast": "#084E96",
        // Svetlija plava za highlight tekst na tamnoj pozadini (kontrast na tegetu).
        primary: "#4A90D9",
        // Teget — glavne tamne brend povrsine (footer, hero, banner, mobilni meni).
        navy: "#0A1F44",
        // Skoro crna — najdublje sekcije i tamni tekst na beloj pozadini.
        dark: "#05070D",
      },
      keyframes: {
        "menu-in": {
          from: { transform: "translateY(-12px)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        // CSS animacija umesto Framer Motion: rAF-bazirane animacije su znale
        // da se zamrznu na pola i ostave meni pomeren. CSS uvek zavrsi.
        "menu-in": "menu-in 180ms ease-out both",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
        "2xl": "5rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
