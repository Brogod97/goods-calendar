import React, { useState } from "react";
import Searchpage from "../Search/Searchpage";
import "./search.scss";
import Searchicon from "./search.svg";

const Search = ({ onSearch }) => {
  // App 컴포넌트로부터 onSearch 함수를 props으로 전달받음
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (searchValue) => {
    onSearch(searchValue); // App 컴포넌트로 검색값을 전달
  };

  return (
    <div className="searchicon">
      <img src={Searchicon} alt="search" onClick={openModal} />
      {isModalOpen && (
        <Searchpage onClose={closeModal} onSearch={handleSearch} />
      )}
    </div>
  );
};

export default Search;
