import React from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Git } from "../../assets/icon/Git.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-100">
      <div className="p-4 text-center">
        <div className="px-1">
          <Logo />
        </div>
        <div className="py-4 flex items-center">
          <p className="text-xs text-gray-600">
            <a
              href="https://www.naver.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              서비스 소개{" "}
            </a>
            |
            <a
              href="https://www.naver.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              서비스 문의{" "}
            </a>
            |
            <a
              href="https://www.naver.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              개인정보처리방침{" "}
            </a>
            |
            <a
              href="https://www.naver.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              이용 약관
            </a>
          </p>
          <div className="flex ml-auto ">
            <a
              href="https://github.com/Brogod97/goods-calendar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Git />
            </a>
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
