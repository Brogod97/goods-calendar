// Popup.js
import React from "react";

const Popup = ({ onClose, children }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        {/* 팝업 닫기 버튼 */}
        <button onClick={onClose}>X</button>

        {/* 년도와 월 선택 드롭다운 */}
        {children}
      </div>
    </div>
  );
};

export default Popup;
