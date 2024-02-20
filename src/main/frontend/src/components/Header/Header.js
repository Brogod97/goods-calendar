import React from "react";
import "./header.css";
import MySvg from "./logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate(); // useHistory를 사용하여 history 객체 생성

  // 로고를 클릭했을 때 홈페이지로 이동하는 함수
  const handleLogoClick = () => {
    navigate("/"); // 홈페이지 경로로 이동
    window.location.reload();
    console.log("헤더 클릭됨");
  };

  // TODO: 임시 버튼
  const handleClick = () => {
    console.log("call save event POST");
    axios.post("http://localhost:8080/events");
  };

  return (
    <header>
      <img src={MySvg} alt="Logo" onClick={handleLogoClick} />
      <button type="button" onClick={handleClick}>
        이벤트 저장
      </button>
      {/*  임시 버튼  */}
    </header>
  );
};

export default Header;
