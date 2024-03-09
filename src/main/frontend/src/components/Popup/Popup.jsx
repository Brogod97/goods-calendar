// FIXME: DateSelector와 Popup은 별개의 컴포넌트가 아님

// Popup.js
import React, { useEffect, useRef } from "react";

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
    <div
      className="z-40 rounded-lg shadow-md flex items-center size-72 absolute bg-white "
      ref={popupRef}
    >
      <div className="px-4 ">
        {/* 년도와 월 선택 드롭다운 */}
        {children}
      </div>
    </div>
  );
};

export default Popup;
