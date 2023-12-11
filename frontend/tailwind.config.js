/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "user-background": "url('../src/assets/wallpaper.jpg')",
      },
      colors: {
        "regal-blue": "#1677ff",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
