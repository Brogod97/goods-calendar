// FIXME: pages로 분리하기

import React, { useState, useEffect } from "react";
import "./Searchpage.scss";

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
    <div className="searchpage-modal">
      <div className="search-contain">
        <div className="search-inputbox">
          <input
            className="search-input"
            type="text"
            placeholder="이벤트 검색"
            value={searchValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        {searchValue ? (
          <button className="btn-search" onClick={handleSearchClick}>
            검색
          </button>
        ) : (
          <button className="btn-cancel" onClick={handleCancelClick}>
            취소
          </button>
        )}
      </div>
      <div className="recent-search">
        <p>
          <span>최근 검색어</span>
        </p>
        <button className="btn-recent-delete" onClick={handleDeleteAllSearches}>
          전체 삭제
        </button>
        <ul className="recent-list">
          {recentSearches.map((search, index) => (
            <li key={index} onClick={() => handleRecentSearchClick(search)}>
              {search}
              <button
                className="btn-delete"
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
