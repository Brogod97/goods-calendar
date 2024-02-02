import React from "react";
import Searchicon from "./search.svg";
import "./search.css";

const Search = () => {
  return (
    <div className="searchicon">
      <img src={Searchicon} alt="search" />
    </div>
  );
};

export default Search;
