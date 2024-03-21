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
        blackc: "#1D1D1F",
        grayc: "#7d7d84",
      },
      spacing: {
        200: "200",
        "2px": "2px",
        "6px": "6px",
        "10px": "10px",
        "12px": "12px",
        "14px": "14px",
        "16px": "16px",
        "8ps": "8%",
        550: "550",
        "106ps": "106%",
        "130ps": "130%",
        "133ps": "133%",
        "150ps": "150%",
        "158ps": "158%",
        "172ps": "172%",
        "200ps": "200%",
      },
    },
  },
  plugins: [],
};
