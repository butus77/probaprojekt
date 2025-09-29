/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: { DEFAULT: "1rem", md: "1.5rem" },
      },
      boxShadow: {
        card: "0 6px 24px -8px rgba(0,0,0,0.12)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};


