// Popup.js
import React, { useEffect, useRef } from "react";
import "./popup.scss";

const Popup = ({ onClose, children }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="popup size-72 absolute bg-white " ref={popupRef}>
      <div className="popup-content px-4 ">
        {/* 년도와 월 선택 드롭다운 */}
        {children}
      </div>
    </div>
  );
};

export default Popup;
