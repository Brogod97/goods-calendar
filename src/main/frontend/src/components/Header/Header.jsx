import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";

const Header = () => {
  const navigate = useNavigate(); // useHistory를 사용하여 history 객체 생성

  // 로고를 클릭했을 때 홈페이지로 이동하는 함수
  const handleLogoClick = () => {
    navigate("/"); // 홈페이지 경로로 이동
    window.location.reload();
    console.log("헤더 클릭됨");
  };

  return (
    <header className="border-b border-gray-400 flex min-h-20 items-center justify-center mx-4 py-10px">
      <div>
        <div className="cursor-pointer" onClick={handleLogoClick}>
          <Logo />
        </div>
      </div>
    </header>
  );
};

export default Header;
