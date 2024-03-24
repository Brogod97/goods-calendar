import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import CalendarComponent from "../components/Calendar/GoodsCalendar";
import DateSelector from "../components/DateSelector/DateSelector";
import Help from "../components/Help/Help";
import Search from "../components/Searchicon/Search";
import DateSelectorWithEventList from "../components/DateSelectorWithEventList/DateSelectorWithEventList";
import Filter from "../components/Filter/Filter";
import axios from "axios";
import moment from "moment";

function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [markCgv, setMarkCgv] = useState([]);
  const [markMega, setMarkMega] = useState([]);
  const [markLotte, setMarkLotte] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.45.95:8080/events");
        setEvents(response.data);

        // markCgv, markMega, markLotte에 날짜 추가하는 로직
        const markCgvDates = response.data
          .filter((event) => event.theater === "CGV")
          .map((event) =>
            moment(event.startDate, "YYYY.MM.DD").format("YYYY-MM-DD")
          );

        const markMegaDates = response.data
          .filter((event) => event.theater === "MEGABOX")
          .map((event) =>
            moment(event.startDate, "YYYY.MM.DD").format("YYYY-MM-DD")
          );

        const markLotteDates = response.data
          .filter((event) => event.theater === "LOTTE")
          .map((event) =>
            moment(event.startDate, "YYYY.MM.DD").format("YYYY-MM-DD")
          );

        setMarkCgv(markCgvDates);
        setMarkMega(markMegaDates);
        setMarkLotte(markLotteDates);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

  const handleConfirm = (selectedYear, selectedMonth, defaultdate) => {
    setSelectedDate(new Date(selectedYear, selectedMonth - 1, defaultdate));
  };

  const handleCalendarChange = (date) => {
    setSelectedDate(date);
  };

  const todayCursor = () => {
    setSelectedDate(new Date());
  };

  const handleFilterChange = (type) => {
    // 선택된 필터들을 관리하는 배열에 추가 또는 제거
    if (selectedFilters.includes(type)) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== type));
    } else {
      setSelectedFilters([...selectedFilters, type]);
    }
  };

  return (
    <div>
      <div className="h-auto min-h-full pb-36">
        <Header />
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
          <Search />
        </div>

        <CalendarComponent
          selectedDate={selectedDate}
          handleCalendarChange={handleCalendarChange}
          markCgv={markCgv}
          markMega={markMega}
          markLotte={markLotte}
        />
        <Help />
        <DateSelectorWithEventList
          selectedDate={selectedDate}
          events={events}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
