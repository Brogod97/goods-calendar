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

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
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
          <label>년도:</label>
          <select onChange={handleYearChange} value={selectedYear}>
            {Array.from({ length: 11 }, (_, i) => i + 2020).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <label>월:</label>
          <select onChange={handleMonthChange} value={selectedMonth}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <button onClick={handleConfirm}>확인</button>
        </Popup>
      )}
    </div>
  );
};

export default DateSelector;
