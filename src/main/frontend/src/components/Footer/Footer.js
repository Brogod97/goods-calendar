import React from "react";
import "./footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>&copy; copyright {currentYear} Cho Bros. All rights reserved</p>
    </footer>
  );
};

export default Footer;
