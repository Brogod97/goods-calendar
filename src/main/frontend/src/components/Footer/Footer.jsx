import React from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Git } from "../../assets/icon/Git.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="mx-4 border-t border-gray-500"></div>
      <div className="p-4 text-center">
        <Logo />
        <div className="py-4 flex items-center">
          <p className="text-xs text-gray-600">
            서비스 소개 | 서비스 문의 | 개인정보처리방침 | 이용 약관
          </p>
          <div className="flex ml-auto ">
            <Git />
          </div>
        </div>
        <p className="text-xs text-gray-600 flex justify-start">
          &copy;{currentYear} ChoBros
        </p>
      </div>
    </footer>
  );
};

export default Footer;
