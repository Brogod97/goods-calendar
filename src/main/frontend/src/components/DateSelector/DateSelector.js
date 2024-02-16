import React, { useState, useEffect } from "react";
import Popup from "../Popup/Popup";

const DateSelector = ({ onConfirm, selectedDate }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    selectedDate.getMonth() + 1
  );
  const defaultdate = 1;

  useEffect(() => {
    setSelectedYear(selectedDate.getFullYear());
    setSelectedMonth(selectedDate.getMonth() + 1);
  }, [selectedDate]);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    onConfirm(selectedYear, selectedMonth, defaultdate);
    setPopupOpen(false);
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
    openPopup();
  };

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
    openPopup();
  };

  const handleConfirm = () => {
    onConfirm(selectedYear, selectedMonth, defaultdate);
    closePopup();
  };
  const testStyle = {
    overflowY: "overlay",
    height: "100px",
    width: "100px",
  };
  const listItemStyle = {
    display: "flex",
    border: "0px",
    marginBottom: "8px",
    borderRadius: "4px",
    height: "20px",
    justifyContent: "center",
  };
  const flex = {
    display: "flex",
  };

  return (
    <div>
      <div onClick={openPopup}>
        {selectedYear}년 {selectedMonth}월 ⌵
      </div>
      {isPopupOpen && (
        <Popup onClose={closePopup}>
          <div style={flex}>
            <p>년</p>
            <p>월</p>
          </div>
          <div style={flex}>
            <ul style={testStyle}>
              {Array.from({ length: 11 }, (_, i) => i + 2020).map((year) => (
                <li
                  key={year}
                  onClick={() => handleYearClick(year)}
                  style={listItemStyle}
                >
                  {year}
                </li>
              ))}
            </ul>

            <ul style={testStyle}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <li
                  key={month}
                  onClick={() => handleMonthClick(month)}
                  style={listItemStyle}
                >
                  {month}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button onClick={handleConfirm}>확인</button>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default DateSelector;
