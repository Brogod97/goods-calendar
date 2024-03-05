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

  return (
    <div>
      <Router>
        <Header />
      </Router>
      <div className="flex mt-7 mb-3 px-4">
        <DateSelector onConfirm={handleConfirm} selectedDate={selectedDate} />
        <div className="pl-2">
          <button
            className="px-2 rounded-lg border border-gray-200"
            onClick={todayCursor}
          >
            오늘
          </button>
        </div>
        <Help />
        <Search onSearch={handleSearch} />
      </div>
      <div className="flex justify-center mb-5 px-4">
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
            if (markCgv.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              html.push(
                <div
                  key={`cgv-${moment(date).format("YYYY-MM-DD")}`}
                  className="dot dotCgv"
                ></div>
              );
            }
            if (markMega.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              html.push(
                <div
                  key={`mega-${moment(date).format("YYYY-MM-DD")}`}
                  className="dot dotMega"
                ></div>
              );
            }
            if (
              markLotte.find((x) => x === moment(date).format("YYYY-MM-DD"))
            ) {
              html.push(
                <div
                  key={`lotte-${moment(date).format("YYYY-MM-DD")}`}
                  className="dot dotLotte"
                ></div>
              );
            }
            return (
              <div className="relative flex justify-center items-center">
                <div className="addrHover"></div>
                <div className="dotDiv">{html}</div>
              </div>
            );
          }}
        />
      </div>
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
