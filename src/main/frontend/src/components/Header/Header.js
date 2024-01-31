import React from "react";
import "./header.css";
import MySvg from "./logo.svg";

const Header = () => {
  return (
    <header>
      <img src={MySvg} alt="Logo" />
    </header>
  );
};

export default Header;
