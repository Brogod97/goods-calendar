import React, { useState } from "react";
import Searchpage from "../Search/Searchpage";
import { TbSearch } from "react-icons/tb";

const Search = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "visible";
  };

  return (
    <div className="size-4 mx-6px">
      <div className="cursor-pointer" onClick={openModal}>
        <TbSearch className="hover:stroke-grayc" color="#1d1d1f" />
      </div>
      <div>{isModalOpen && <Searchpage onClose={closeModal} />}</div>
    </div>
  );
};

export default Search;
