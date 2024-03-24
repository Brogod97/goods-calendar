import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SearchResultPage from "./pages/SearchResultPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-results" element={<SearchResultPage />} />
      </Routes>
    </div>
  );
}

export default App;
