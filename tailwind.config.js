// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // font-sansクラスに'Noto Sans JP'を適用
        // フォント名にスペースが含まれる場合は、必ずクォーテーションで囲みます
        sans: ['"Montserrat"', "Noto Sans JP"],
        // font-serifクラスに'Noto Serif JP'を適用
        serif: ['"Robot Slab"', "Noto Serif JP"],
      },
    },
  },
  plugins: [],
};
