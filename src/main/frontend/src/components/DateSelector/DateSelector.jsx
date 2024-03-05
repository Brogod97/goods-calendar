import React, { useState, useEffect } from "react";
import Popup from "../Popup/Popup";
import "./DateSelector.scss";

// FIXME: DateSelector와 Popup은 별개의 컴포넌트가 아님
const DateSelector = ({ onConfirm, selectedDate }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    selectedDate.getMonth() + 1
  );
  const [selectedYearIndex, setSelectedYearIndex] = useState(null);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(null);
  const defaultdate = 1;

  useEffect(() => {
    setSelectedYear(selectedDate.getFullYear());
    setSelectedMonth(selectedDate.getMonth() + 1);
  }, [selectedDate]);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleYearClick = (year, index) => {
    setSelectedYear(year);
    setSelectedYearIndex(index);
    openPopup();
  };

  const handleMonthClick = (month, index) => {
    setSelectedMonth(month);
    setSelectedMonthIndex(index);
    openPopup();
  };

  const handleConfirm = () => {
    onConfirm(selectedYear, selectedMonth, defaultdate);
    setSelectedYearIndex(null); // 선택된 인덱스 초기화
    setSelectedMonthIndex(null); // 선택된 인덱스 초기화
    closePopup();
  };

  return (
    <div>
      <div className="relative" onClick={openPopup}>
        {selectedYear}년 {selectedMonth}월 ⌵
      </div>
      {isPopupOpen && (
        <Popup onClose={closePopup}>
          {/* FIXME: Popup 컴포넌트 내부에 children으로 전달하고 있는데, 꼭 필요한 경우가 아니라면, Popup 컴포넌트 내부에 작성하기 */}
          <div className="">
            <div className="flex py-2 justify-around items-center border-b border-gray-300">
              <p>년도</p>
              <p>월</p>
            </div>
            <div className="flex py-2 justify-around items-center">
              <ul className="testStyle">
                {Array.from({ length: 11 }, (_, i) => i + 2019).map(
                  (year, index) => (
                    <li
                      key={year}
                      onClick={() => handleYearClick(year, index)}
                      className={`listItemStyle ${
                        selectedYearIndex === index ? "selected" : ""
                      }`}
                    >
                      {year}
                    </li>
                  )
                )}
              </ul>

              <ul className="testStyle">
                {Array.from({ length: 12 }, (_, i) => i + 1).map(
                  (month, index) => (
                    <li
                      key={month}
                      onClick={() => handleMonthClick(month, index)}
                      className={`listItemStyle ${
                        selectedMonthIndex === index ? "selected" : ""
                      }`}
                    >
                      {month}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="flex justify-center">
              <button
                className="px-28 py-1 rounded-lg border text-white bg-black border-white"
                onClick={handleConfirm}
              >
                완료
              </button>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default DateSelector;
