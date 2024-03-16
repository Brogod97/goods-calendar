import React, { useState } from "react";
import Searchpage from "../Search/Searchpage";
// import { ReactComponent as Searchicon } from "../../assets/icon/search.svg";
import { TbSearch } from "react-icons/tb";

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
    <div className="size-4 mx-6px">
      <div className="cursor-pointer" onClick={openModal}>
        {/* <Searchicon width={16} height={16} /> */}
        <TbSearch />
      </div>

      {isModalOpen && (
        <Searchpage onClose={closeModal} onSearch={handleSearch} />
      )}
    </div>
  );
};

export default Search;
