/** @type {import('tailwindcss').Config} */
// FIXME: 사용자 설정값 (색상 변수, 간격 등) 이 곳에서 선언하고 관리
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cgv: "#e42313",
        mega: "#362462",
        lotte: "#ee870e",
      },
      spacing: {
        "2px": "2px",
        "6px": "6px",
        "10px": "10px",
        "12px": "12px",
        "16px": "16px",
        "8ps": "8%",
        "106ps": "106%",
        "200ps": "200%",
      },
    },
  },
  plugins: [],
};
