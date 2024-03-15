import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Calendar from "react-calendar";
import moment from "moment";
import axios from "axios";
import "./Calendar.scss";
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DateSelector from "./components/DateSelector/DateSelector";
import Help from "./components/Help/Help";
import Search from "./components/Searchicon/Search";
import DateSelectorWithEventList from "./components/DateSelectorWithEventList/DateSelectorWithEventList";
import Filter from "./components/Filter/Filter";

// FIXME: App.js는 화면을 그리는 요소를 배치하는 것 보단 Provider와 같은 세팅을 하고, 컴포넌트를 조립하는 곳
// 리액트 라우터를 쓰게 되면 페이지 관리하는 코드를 작성하게 될 것

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [markCgv, setMarkCgv] = useState([]);
  const [markMega, setMarkMega] = useState([]);
  const [markLotte, setMarkLotte] = useState([]);
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/events");
        setEvents(response.data);

        // markCgv, markMega, markLotte에 날짜 추가하는 로직
        const markCgvDates = response.data
          .filter((event) => event.theater === "CGV")
          .map((event) => moment(event.startDate).format("YYYY-MM-DD"));

        const markMegaDates = response.data
          .filter((event) => event.theater === "MEGABOX")
          .map((event) => moment(event.startDate).format("YYYY-MM-DD"));

        const markLotteDates = response.data
          .filter((event) => event.theater === "LOTTE")
          .map((event) => moment(event.startDate).format("YYYY-MM-DD"));

        setMarkCgv(markCgvDates);
        setMarkMega(markMegaDates);
        setMarkLotte(markLotteDates);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []); // 빈 배열로 설정하여 컴포넌트가 처음 로드될 때만 실행되도록 함

  const handleConfirm = (selectedYear, selectedMonth, defaultdate) => {
    setSelectedDate(new Date(selectedYear, selectedMonth - 1, defaultdate));
  };

  const handleCalendarChange = (date) => {
    setSelectedDate(date);
  };

  const handleSearch = (searchValue) => {
    setSearchValue(searchValue);
  };

  const todayCursor = () => {
    setSelectedDate(new Date());
  };
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterChange = (type) => {
    // 선택된 필터들을 관리하는 배열에 추가 또는 제거
    if (selectedFilters.includes(type)) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== type));
    } else {
      setSelectedFilters([...selectedFilters, type]);
    }
  };

  // FIXME: 최소한의 단위로 컴포넌트를 분리하고, 조립한다는 점을 잊지 말기
  return (
    <div>
      <Router>
        <Header />
      </Router>
      <div className="flex mt-7 mb-3 mx-4 items-center">
        <DateSelector onConfirm={handleConfirm} selectedDate={selectedDate} />
        <div className="pl-2">
          <button
            className="px-2 rounded-lg border border-gray-200"
            onClick={todayCursor}
          >
            오늘
          </button>
        </div>
        <Filter
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
        />
        <Search onSearch={handleSearch} />
      </div>

      <div className="flex justify-center mx-4">
        <Calendar
          locale="kr"
          calendarType="US"
          onChange={handleCalendarChange}
          value={selectedDate}
          formatDay={(locale, date) => moment(date).format("DD")}
          activeStartDate={selectedDate}
          minDetail="month"
          maxDetail="month"
          navigationLabel={null}
          showNavigation={null}
          showFixedNumberOfWeeks={true}
          tileContent={({ date, view }) => {
            let html = [];
            if (
              view === "month" &&
              date.getMonth() !== selectedDate.getMonth()
            ) {
              if (
                markCgv.find((x) => x === moment(date).format("YYYY-MM-DD"))
              ) {
                html.push(
                  <div
                    key={`cgv-${moment(date).format("YYYY-MM-DD")}`}
                    className="w-6px h-6px ml-0.5 bg-cgv opacity-50"
                  ></div>
                );
              }
              if (
                markMega.find((x) => x === moment(date).format("YYYY-MM-DD"))
              ) {
                html.push(
                  <div
                    key={`mega-${moment(date).format("YYYY-MM-DD")}`}
                    className="w-6px h-6px ml-0.5 bg-mega opacity-50"
                  ></div>
                );
              }
              if (
                markLotte.find((x) => x === moment(date).format("YYYY-MM-DD"))
              ) {
                html.push(
                  <div
                    key={`lotte-${moment(date).format("YYYY-MM-DD")}`}
                    className="w-6px h-6px ml-0.5 bg-lotte opacity-50"
                  ></div>
                );
              }
            } else {
              if (
                markCgv.find((x) => x === moment(date).format("YYYY-MM-DD"))
              ) {
                html.push(
                  <div
                    key={`cgv-${moment(date).format("YYYY-MM-DD")}`}
                    className="w-6px h-6px ml-0.5 bg-cgv"
                  ></div>
                );
              }
              if (
                markMega.find((x) => x === moment(date).format("YYYY-MM-DD"))
              ) {
                html.push(
                  <div
                    key={`mega-${moment(date).format("YYYY-MM-DD")}`}
                    className="w-6px h-6px ml-0.5 bg-mega"
                  ></div>
                );
              }
              if (
                markLotte.find((x) => x === moment(date).format("YYYY-MM-DD"))
              ) {
                html.push(
                  <div
                    key={`lotte-${moment(date).format("YYYY-MM-DD")}`}
                    className="w-6px h-6px ml-0.5 bg-lotte"
                  ></div>
                );
              }
            }
            return (
              <div className="relative flex justify-center items-center">
                <div className="flex justify-center items-center absolute translate-y-200ps -translate-x-8ps">
                  {html}
                </div>
              </div>
            );
          }}
        />
      </div>
      <Help />
      {/* FIXME: 불필요한 중간 단계가 있음 */}
      <DateSelectorWithEventList
        selectedDate={selectedDate}
        events={events}
        searchValue={searchValue}
      />
      <Footer />
    </div>
  );
}

export default App;
