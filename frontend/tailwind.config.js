/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // makes Tailwind scan all JSX/TSX files
  ],
  theme: {
    extend: {
      fontFamily: {
        hind: ['"Hind Siliguri"', 'sans-serif'], // 👈 custom font
         abhaya: ['"Abhaya Libre"', 'serif'],
      },
    },
  },
  plugins: [],
}
