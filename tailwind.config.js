/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        slate: {
          25: "#f8fafc",
        },
      },
      boxShadow: {
        invoice: "0 0 10px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
