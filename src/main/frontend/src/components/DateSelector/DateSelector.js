import React, { useState, useEffect } from "react";
import Popup from "../Popup/Popup";
import "./DateSelector.css";

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

  return (
    <div>
      <div onClick={openPopup}>
        {selectedYear}년 {selectedMonth}월 ⌵
      </div>
      {isPopupOpen && (
        <Popup onClose={closePopup}>
          <div>
            <div className="selector">
              <p>년</p>
              <p>월</p>
            </div>
            <div className="selector">
              <ul className="testStyle">
                {Array.from({ length: 11 }, (_, i) => i + 2019).map((year) => (
                  <li
                    key={year}
                    onClick={() => handleYearClick(year)}
                    className="listItemStyle"
                  >
                    {year}
                  </li>
                ))}
              </ul>

              <ul className="testStyle">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <li
                    key={month}
                    onClick={() => handleMonthClick(month)}
                    className="listItemStyle"
                  >
                    {month}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button onClick={handleConfirm}>완료</button>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default DateSelector;
