import React from "react";
import { useLocation } from "react-router-dom";

const SearchResult = () => {
  // useLocation 훅을 사용하여 location 객체를 가져옴
  const location = useLocation();

  // URL에서 쿼리 파라미터 추출
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query");

  return (
    <div>
      <h2>검색 결과</h2>
      <p>검색어: {searchQuery}</p>
      {/* 여기에 검색 결과를 표시하는 로직을 추가할 수 있습니다. */}
    </div>
  );
};

export default SearchResult;
