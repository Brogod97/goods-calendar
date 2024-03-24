import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const Searchpage = ({ onClose }) => {
  const [searchValue, setSearchValue] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const navigate = useNavigate();

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
    setShowCloseIcon(e.target.value !== "");
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

      navigate(
        `/search-results?query=${encodeURIComponent(searchValue.trim())}`
      );
    }
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
    navigate(`/search-results?query=${encodeURIComponent(search)}`);
  };

  const handleClearInput = () => {
    setSearchValue("");
    setShowCloseIcon(false);
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-full h-full z-40 p-4">
      <div className="w-full flex z-50">
        <div className="search-inputbox basis-5/6 relative">
          <div className="absolute top-10px left-3">
            <CiSearch size={20} />
          </div>
          <div className="relative"></div>
          {showCloseIcon && (
            <div
              className="cursor-pointer absolute top-10px left-91ps"
              onClick={handleClearInput}
            >
              <IoMdClose size={20} className="text-gray-500" />
            </div>
          )}
          <input
            className="visible border-0 bg-gray-100 w-full cursor-text text-inherit pl-10 pr-10 py-2 rounded-md outline-none"
            type="text"
            placeholder="이벤트 검색"
            value={searchValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>

        <button
          className="text-lg font-bold top-6 right-5 border-none bg-transparent flex-grow basis-1/6 pl-4"
          onClick={handleCancelClick}
        >
          취소
        </button>
      </div>
      <div className="">
        <div className="mt-7 mb-1 flex h-9">
          <p className="text-sm text-gray-400 mr-auto">
            <span className="pl-2 ">최근 검색어</span>
          </p>
          <div className="ml-auto">
            <button
              className="text-sm text-gray-400 border-none bg-transparent"
              onClick={handleDeleteAllSearches}
            >
              전체 삭제
            </button>
          </div>
        </div>
        <ul className="flex flex-col">
          {recentSearches.map((search, index) => (
            <li className="flex pl-2 h-10 " key={index}>
              <div
                className="cursor-pointer"
                onClick={() => handleRecentSearchClick(search)}
              >
                {search}
              </div>
              <div className="ml-auto">
                <button
                  className="border-none bg-transparent"
                  onClick={() => handleDeleteSearch(index)}
                >
                  <IoMdClose size={20} className="text-gray-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Searchpage;
