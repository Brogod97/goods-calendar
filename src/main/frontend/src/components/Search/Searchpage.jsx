// FIXME: pages로 분리하기

import React, { useState, useEffect } from "react";

const Searchpage = ({ onClose, onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const storedSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  const saveToLocalStorage = (searches) => {
    localStorage.setItem("recentSearches", JSON.stringify(searches));
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCancelClick = () => {
    onClose();
  };

  const handleSearchClick = () => {
    if (searchValue.trim() !== "") {
      const updatedSearches = [...recentSearches, searchValue.trim()];
      setRecentSearches(updatedSearches);
      setSearchValue("");
      saveToLocalStorage(updatedSearches);

      onSearch(searchValue.trim());
    }
    onClose();
  };

  const handleDeleteSearch = (index) => {
    const updatedSearches = [...recentSearches];
    updatedSearches.splice(index, 1);
    setRecentSearches(updatedSearches);
    saveToLocalStorage(updatedSearches);
  };

  const handleDeleteAllSearches = () => {
    setRecentSearches([]);
    saveToLocalStorage([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleRecentSearchClick = (search) => {
    // 클릭한 최근 검색어로 검색을 실행합니다.
    onSearch(search);
    onClose();
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-full h-full z-40 p-4">
      <div className="w-full flex z-50">
        <div className="search-inputbox">
          <input
            className="visible border-0 bg-gray-200 w-106ps cursor-text text-inherit pl-12px pr-16 py-2 rounded-md"
            type="text"
            placeholder="이벤트 검색"
            value={searchValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        {searchValue ? (
          <button
            className="text-lg font-bold absolute top-6 right-9 border-none bg-transparent"
            onClick={handleSearchClick}
          >
            검색
          </button>
        ) : (
          <button
            className="text-lg font-bold absolute top-6 right-9 border-none bg-transparent"
            onClick={handleCancelClick}
          >
            취소
          </button>
        )}
      </div>
      <div className="relative">
        <div className="mt-10 mb-2 flex ">
          <p className="font-16px mr-auto">
            <span>최근 검색어</span>
          </p>
          <div className="ml-auto">
            <button
              className="text-16px border-none bg-transparent"
              onClick={handleDeleteAllSearches}
            >
              전체 삭제
            </button>
          </div>
        </div>
        <ul className="absolute top-8 w-full">
          {recentSearches.map((search, index) => (
            <li
              className="flex py-2"
              key={index}
              onClick={() => handleRecentSearchClick(search)}
            >
              {search}
              <button
                className="border-none bg-transparent ml-auto "
                onClick={() => handleDeleteSearch(index)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Searchpage;
