import React, { useEffect, useState } from "react";
import EventList from "../components/EventList/EventList";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const SearchResultPage = () => {
  // useLocation 훅을 사용하여 location 객체를 가져옴
  const location = useLocation();
  // URL에서 쿼리 파라미터 추출
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [searchValue, setSearchValue] = useState(searchQuery);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showCloseIcon, setShowCloseIcon] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.45.95:8080/events");
        setEvents(response.data);
        setFilteredEvents(response.data); // 전체 이벤트를 필터된 이벤트로 설정
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

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

  const handleSearchClick = () => {
    if (searchValue.trim() !== "") {
      const updatedSearches = [...recentSearches, searchValue.trim()];
      setRecentSearches(updatedSearches);
      saveToLocalStorage(updatedSearches);

      navigate(
        `/search-results?query=${encodeURIComponent(searchValue.trim())}`
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleLogoClick = () => {
    navigate("/"); // 홈페이지 경로로 이동
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    if (filter === "전체") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) => event.goodsType === filter);
      setFilteredEvents(filtered);
    }
  };

  const handleClearInput = () => {
    setSearchValue("");
    setShowCloseIcon(false);
  };

  return (
    <div>
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
              placeholder={"이벤트 검색"}
              value={searchValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
          </div>
          <button
            className="text-lg font-bold top-6 right-5 border-none bg-transparent flex-grow basis-1/6 pl-4"
            onClick={handleLogoClick}
          >
            취소
          </button>
        </div>
        <div className="mt-6 mb-4 ml-10px">
          <button
            className={`py-1 px-3 mr-1 text-xs h-7 rounded-3xl border   ${selectedFilter === "전체" ? "bg-blackc text-white border-blackc" : "text-secondary border-gray-300"}`}
            onClick={() => handleFilterClick("전체")}
          >
            전체
          </button>
          <button
            className={`py-1 px-3 mr-1 h-7 text-xs rounded-full border  ${selectedFilter === "FM" ? "bg-blackc text-white border-blackc" : "text-secondary border-gray-300"}`}
            onClick={() => handleFilterClick("FM")}
          >
            CGV
          </button>
          <button
            className={`py-1 px-3 mr-1 h-7 text-xs rounded-full border   ${selectedFilter === "AC" ? "bg-black text-white border-blackc" : "text-secondary border-gray-300"}`}
            onClick={() => handleFilterClick("AC")}
          >
            롯데시네마
          </button>
          <button
            className={`py-1 px-3 mr-1 h-7 text-xs rounded-full border   ${selectedFilter === "OT" ? "bg-black text-white border-blackc" : "text-secondary border-gray-300"}`}
            onClick={() => handleFilterClick("OT")}
          >
            메가박스
          </button>
        </div>

        <div className="">
          <EventList events={filteredEvents} searchValue={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;
