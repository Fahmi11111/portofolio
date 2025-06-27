/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html"], // ✅ Pastikan ini mencakup semua file HTML/JS/Blade/dll yang gunakan Tailwind
  theme: {
    container: {
      center: true,
      padding: "16px", // ✅ Padding default container
    },
    extend: {
      colors: {
        primary: "#4f46e5", // ✅ Indigo
        secondary: "#64748b", // ✅ Slate gray
        dark: "#1e293b", // ✅ Dark slate
      },
      screens: {
        "2xl": "1320px", // ✅ Custom breakpoint
      },
      keyframes: {
        blob: {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
          },
          "33%": {
            transform: "translate(10px, -10px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-10px, 10px) scale(0.9)",
          },
        },
      },
      animation: {
        blob: "blob 7s ease-in-out infinite", // ✅ Animasi untuk efek blob
      },
    },
  },
  plugins: [],
};
