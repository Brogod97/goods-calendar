import React, { useState, useEffect } from "react";
import Popup from "../Popup/Popup";
import "./DateSelector.scss";
import { ReactComponent as Down } from "../../assets/icon/Group 125.svg";

// FIXME: DateSelector와 Popup은 별개의 컴포넌트가 아님
const DateSelector = ({ onConfirm, selectedDate }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    selectedDate.getMonth() + 1
  );
  const defaultYear = selectedDate.getFullYear();
  const defaultMonth = selectedDate.getMonth() + 1;
  const defaultdate = 1;

  // Year와 Month 배열 상태로 선언
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);

  // Year와 Month 배열 초기화
  useEffect(() => {
    const yearArray = Array.from({ length: 11 }, (_, i) => 2019 + i);
    const monthArray = Array.from({ length: 12 }, (_, i) => i + 1);
    setYears(yearArray);
    setMonths(monthArray);
  }, []);

  useEffect(() => {
    setSelectedYear(selectedDate.getFullYear());
    setSelectedMonth(selectedDate.getMonth() + 1);
  }, [selectedDate]);

  const openPopup2 = (selectedYear, selectedMonth, yearArray, monthArray) => {
    // 선택된 연도와 월에 해당하는 인덱스를 찾습니다.
    const yearIndex = yearArray.findIndex((year) => year === selectedYear);
    const monthIndex = monthArray.findIndex((month) => month === selectedMonth);

    // 선택된 연도와 월에 해당하는 위치로 스크롤을 이동합니다.
    const listItemHeight = 40; // 각 리스트 아이템의 높이
    const yearScrollContainer = document.querySelector(".testStyle");
    const yearScrollOffset =
      listItemHeight * (yearIndex + 2) - yearScrollContainer.offsetHeight / 2;
    yearScrollContainer.scrollTo({
      top: yearScrollOffset,
      behavior: "instant",
    });

    const monthScrollContainer = document.querySelector(".testStyle2");
    const monthScrollOffset =
      listItemHeight * (monthIndex + 2) - monthScrollContainer.offsetHeight / 2;
    monthScrollContainer.scrollTo({
      top: monthScrollOffset,
      behavior: "instant",
    });
    openPopup();
  };

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    if (isPopupOpen) {
      const popup = document.querySelector(".popup");
      popup.classList.add("inactive");
      setSelectedYear(defaultYear);
      setSelectedMonth(defaultMonth);
      // 팝업이 완전히 사라진 후 상태 변경
      setTimeout(() => {
        setPopupOpen(false);
      }, 300);
    }
  };

  const handleYearClick = (year, index) => {
    setSelectedYear(year);
    const listItemHeight = 40; // 각 리스트 아이템의 높이
    const scrollContainer = document.querySelector(".testStyle");
    const scrollOffset =
      listItemHeight * (index + 2) - scrollContainer.offsetHeight / 2;
    scrollContainer.scrollTo({
      top: scrollOffset,
      behavior: "smooth",
    });
    openPopup();
  };

  const handleMonthClick = (month, index) => {
    setSelectedMonth(month);
    const listItemHeight = 40; // 각 리스트 아이템의 높이
    const scrollContainer = document.querySelector(".testStyle2");
    const scrollOffset =
      listItemHeight * (index + 2) - scrollContainer.offsetHeight / 2;
    scrollContainer.scrollTo({
      top: scrollOffset,
      behavior: "smooth",
    });
    openPopup();
  };

  const handleConfirm = () => {
    onConfirm(selectedYear, selectedMonth, defaultdate);
    closePopup();
  };

  return (
    <div>
      <div
        className="relative flex items-center cursor-pointer"
        onClick={() => openPopup2(selectedYear, selectedMonth, years, months)}
      >
        {defaultYear}년 {defaultMonth}월 <Down />
      </div>
      <div className={`popup ${isPopupOpen ? "active" : ""}`}>
        <Popup onClose={closePopup}>
          {/* FIXME: Popup 컴포넌트 내부에 children으로 전달하고 있는데, 꼭 필요한 경우가 아니라면, Popup 컴포넌트 내부에 작성하기 */}
          <div className="">
            <div className="flex py-2 justify-around items-center border-b border-gray-300">
              <p>년도</p>
              <p>월</p>
            </div>
            <div className="flex py-2 justify-around items-center">
              <ul className="testStyle scroll-smooth snap-y snap-mandatory">
                <li className="dummy snap-start"></li>
                <li className="dummy snap-start"></li>
                {Array.from({ length: 11 }, (_, i) => i + 2019).map(
                  (year, index) => (
                    <li
                      key={year}
                      onClick={() => handleYearClick(year, index)}
                      className={`listItemStyle cursor-pointer snap-start ${
                        selectedYear === year ? "selected" : ""
                      }`}
                    >
                      {year}
                    </li>
                  )
                )}
                <li className="dummy "></li>
                <li className="dummy snap-end"></li>
              </ul>

              <ul className="testStyle2 scroll-smooth snap-y snap-mandatory">
                <li className="dummy snap-start"></li>
                <li className="dummy snap-start"></li>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(
                  (month, index) => (
                    <li
                      key={month}
                      onClick={() => handleMonthClick(month, index)}
                      className={`listItemStyle cursor-pointer snap-start ${
                        selectedMonth === month ? "selected" : ""
                      }`}
                    >
                      {month}
                    </li>
                  )
                )}
                <li className="dummy "></li>
                <li className="dummy snap-end"></li>
              </ul>
            </div>
            <div className="flex justify-center ">
              <button
                className="px-28 py-1 rounded-lg border text-white bg-black border-white"
                onClick={handleConfirm}
              >
                완료
              </button>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default DateSelector;
