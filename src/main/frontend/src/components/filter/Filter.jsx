import React, { useState, useRef, useEffect, useCallback } from "react";
import { TbFilter } from "react-icons/tb";

const Filter = ({ selectedFilters, handleFilterChange }) => {
  const [selectedFiltersTemp, setSelectedFiltersTemp] = useState([
    ...selectedFilters,
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달의 상태를 저장하는 상태 변수
  const filterModalRef = useRef(null);

  const toggleFilterModal = useCallback(() => {
    setIsModalOpen((prevState) => !prevState);
    // 이전 상태를 기반으로 토글
  }, []);

  const handleSaveFilters = () => {
    handleFilterChange(selectedFiltersTemp);
    closeFilterModal();
  };

  const closeFilterModal = useCallback(() => {
    if (isModalOpen) {
      const flitermodal = document.querySelector("#filter-modal");
      flitermodal.classList.add("animate__fadeOut");
      flitermodal.classList.add("animate__faster");
      setTimeout(() => {
        setIsModalOpen((prevState) => !prevState);
      }, 300);
    }
  }, [isModalOpen]);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isModalOpen &&
        filterModalRef.current &&
        !filterModalRef.current.contains(event.target)
      ) {
        closeFilterModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, closeFilterModal]);

  return (
    <div className="w-4 h-4 ml-auto mr-2 relative">
      <div
        className={`cursor-pointer ${isModalOpen ? "pointer-events-none" : ""}`}
        onClick={toggleFilterModal}
      >
        <TbFilter className="hover:stroke-grayc" color="#1d1d1f" />
      </div>
      <div
        ref={filterModalRef}
        id="filter-modal"
        className={`absolute top-6 left-[-192px] w-52 bg-white rounded-lg drop-shadow-md items-center animate__animated ${
          isModalOpen ? "animate__fadeIn animate__faster z-50" : "-z-10" // 모달의 상태에 따라 hidden 클래스를 추가하여 모달을 숨김
        } px-5`}
      >
        {/* 각 필터를 체크박스로 표시 */}
        <div className="flex pt-3 pb-2 items-center border-b border-gray-200">
          <p className="select-none">필터</p>
        </div>
        <div className="flex flex-col py-4 select-none">
          <div className="h-5 text-left text-sm mb-2 flex items-center ">
            <input
              className="peer cursor-pointer mr-2 w-14px h-14px border rounded-sm border-grayc appearance-none checked:border-0 checked:bg-[url('./assets/icon/checked.svg')] bg-no-repeat bg-center "
              type="checkbox"
              value="TTT"
              checked={selectedFiltersTemp.includes("TTT")}
              onChange={() => handleCheckboxChange("TTT")}
            />
            <p className="peer-checked:opacity-100 opacity-50 text-blackc">
              TTT
            </p>
          </div>

          <div className="h-5 text-left text-sm mb-2 flex items-center">
            <input
              className="peer cursor-pointer mr-2 w-14px h-14px border rounded-sm border-grayc appearance-none checked:border-0 checked:bg-[url('./assets/icon/checked.svg')] bg-no-repeat bg-center"
              type="checkbox"
              value="FM"
              checked={selectedFiltersTemp.includes("FM")}
              onChange={() => handleCheckboxChange("FM")}
            />
            <p className="peer-checked:opacity-100 opacity-50 text-blackc">
              필름마크
            </p>
          </div>
          <div className="h-5 text-left text-sm mb-2 flex items-center">
            <input
              className="peer cursor-pointer mr-2 w-14px h-14px border rounded-sm border-grayc appearance-none checked:border-0 checked:bg-[url('./assets/icon/checked.svg')] bg-no-repeat bg-center"
              type="checkbox"
              value="AC"
              checked={selectedFiltersTemp.includes("AC")}
              onChange={() => handleCheckboxChange("AC")}
            />
            <p className="peer-checked:opacity-100 opacity-50 text-blackc">
              아트카드
            </p>
          </div>
          <div className="h-5 text-left text-sm flex items-center">
            <input
              className="peer cursor-pointer mr-2 w-14px h-14px border rounded-sm border-grayc appearance-none checked:border-0 checked:bg-[url('./assets/icon/checked.svg')] bg-no-repeat bg-center"
              type="checkbox"
              value="OT"
              checked={selectedFiltersTemp.includes("OT")}
              onChange={() => handleCheckboxChange("OT")}
            />
            <p className="peer-checked:opacity-100 opacity-50 text-blackc">
              오리지널 티켓
            </p>
          </div>
        </div>
        <div className="flex justify-center pb-4 ">
          <button
            className="px-70px py-3px rounded border text-white bg-black border-white text-sm select-none"
            onClick={handleSaveFilters}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
