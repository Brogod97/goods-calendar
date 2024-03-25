import React, { useState } from "react";
import { TbFilter } from "react-icons/tb";

const Filter = ({ selectedFilters, handleFilterChange }) => {
  const [selectedFiltersTemp, setSelectedFiltersTemp] = useState([
    ...selectedFilters,
  ]);

  const toggleFilterModal = () => {
    const filterModal = document.getElementById("filter-modal");
    filterModal.classList.toggle("hidden");
  };

  const handleSaveFilters = () => {
    handleFilterChange(selectedFiltersTemp);
    toggleFilterModal(); // 필터 모달 닫기
  };

  const handleCheckboxChange = (filter) => {
    const index = selectedFiltersTemp.indexOf(filter);
    if (index === -1) {
      setSelectedFiltersTemp([...selectedFiltersTemp, filter]); // 필터 추가
    } else {
      setSelectedFiltersTemp(
        selectedFiltersTemp.filter((item) => item !== filter)
      ); // 필터 제거
    }
  };

  return (
    <div className="w-4 h-4 ml-auto mr-2 relative">
      <div className="cursor-pointer" onClick={toggleFilterModal}>
        <TbFilter className="hover:stroke-grayc" color="#1d1d1f" />
      </div>
      <div
        id="filter-modal"
        className={`absolute top-4 left-[-80px] w-52 h-60 bg-white rounded-lg shadow-md items-center hidden`}
      >
        {/* 각 필터를 체크박스로 표시 */}
        <p className="h-5 text-left text-xs mt-0 ml-3">
          <input
            type="checkbox"
            value="AC"
            checked={selectedFiltersTemp.includes("AC")}
            onChange={() => handleCheckboxChange("AC")}
          />
          아트
        </p>
        <p className="h-5 text-left text-xs mt-0 ml-3">
          <input
            type="checkbox"
            value="OT"
            checked={selectedFiltersTemp.includes("OT")}
            onChange={() => handleCheckboxChange("OT")}
          />
          오리지널
        </p>
        <p className="h-5 text-left text-xs mt-0 ml-3">
          <input
            type="checkbox"
            value="TTT"
            checked={selectedFiltersTemp.includes("TTT")}
            onChange={() => handleCheckboxChange("TTT")}
          />
          TTT
        </p>
        <p className="h-5 text-left text-xs mt-0 ml-3">
          <input
            type="checkbox"
            value="FM"
            checked={selectedFiltersTemp.includes("FM")}
            onChange={() => handleCheckboxChange("FM")}
          />
          FM
        </p>
        {/* 완료 버튼 */}
        <button
          className="bg-blue-500 text-white px-2 py-1 mt-2"
          onClick={handleSaveFilters}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default Filter;
