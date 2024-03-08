import React from "react";
import { ReactComponent as Filtericon } from "../../assets/icon/filter.svg";

const Filter = ({ selectedFilters, handleFilterChange }) => {
  const toggleFilterModal = () => {
    const filterModal = document.getElementById("filter-modal");
    filterModal.classList.toggle("hidden");
  };

  return (
    <div className="w-4 h-4 ml-auto relative">
      <div onClick={toggleFilterModal}>
        <Filtericon />
      </div>
      <div
        id="filter-modal"
        className={`absolute top-4 left-[-80px] w-24 h-20 bg-white rounded-lg shadow-md items-center hidden`}
      >
        {/* 각 필터를 체크박스로 표시 */}
        <p className="h-5 text-left text-xs mt-0 ml-3">
          <input
            type="checkbox"
            value="AC"
            checked={selectedFilters.includes("AC")}
            onChange={() => handleFilterChange("AC")}
          />
          아트
        </p>
        <p className="h-5 text-left text-xs mt-0 ml-3">
          <input
            type="checkbox"
            value="OT"
            checked={selectedFilters.includes("OT")}
            onChange={() => handleFilterChange("OT")}
          />
          오리지널
        </p>
        <p className="h-5 text-left text-xs mt-0 ml-3">
          <input
            type="checkbox"
            value="TTT"
            checked={selectedFilters.includes("TTT")}
            onChange={() => handleFilterChange("TTT")}
          />
          TTT
        </p>
      </div>
    </div>
  );
};

export default Filter;
