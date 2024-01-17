/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "ui-sans-serif", "system-ui"],
    },
    extend: {
      colors: {
        primary: {
          50: "#f0fdf9",
          100: "#cdfaee",
          200: "#9bf4de",
          300: "#61e7cb",
          400: "#30d1b5",
          500: "#15a48d",
          600: "#10917f",
          700: "#117467",
          800: "#125d54",
          900: "#144d46",
          950: "#052e2b",
        },
      },
    },
  },
  plugins: [],
};
