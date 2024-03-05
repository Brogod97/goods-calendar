/** @type {import('tailwindcss').Config} */
// FIXME: 사용자 설정값 (색상 변수, 간격 등) 이 곳에서 선언하고 관리
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cgv: "#e42313",
      },
      spacing: {
        six: "6px",
        per8: "8%",
        per200: "200%",
      },
    },
  },
  plugins: [],
};
