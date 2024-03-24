import React, { useState } from "react";
import Searchpage from "../Search/Searchpage";
// import { ReactComponent as Searchicon } from "../../assets/icon/search.svg";
import { TbSearch } from "react-icons/tb";

const Search = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="size-4 mx-6px">
      <div className="cursor-pointer" onClick={openModal}>
        {/* <Searchicon width={16} height={16} /> */}
        <TbSearch className="hover:stroke-grayc" color="#1d1d1f" />
      </div>

      {isModalOpen && <Searchpage onClose={closeModal} />}
    </div>
  );
};

export default Search;
