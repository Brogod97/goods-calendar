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
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://172.20.10.4:8080/events");
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

  useEffect(() => {
    // 필터링된 이벤트들을 설정
    const filtered = events.filter((event) => {
      if (selectedFilters.length === 0) return true; // 선택된 필터가 없으면 모든 이벤트 표시

      // 선택된 필터에 해당하는 이벤트만 표시
      return selectedFilters.includes(event.goodsType);
    });
    setFilteredEvents(filtered);

    // 선택된 필터에 따라 markCgv, markMega, markLotte 값을 설정
    const markCgvDates = filtered
      .filter((event) => event.theater === "CGV")
      .map((event) =>
        moment(event.startDate, "YYYY.MM.DD").format("YYYY-MM-DD")
      );

    const markMegaDates = filtered
      .filter((event) => event.theater === "MEGABOX")
      .map((event) =>
        moment(event.startDate, "YYYY.MM.DD").format("YYYY-MM-DD")
      );

    const markLotteDates = filtered
      .filter((event) => event.theater === "LOTTE")
      .map((event) =>
        moment(event.startDate, "YYYY.MM.DD").format("YYYY-MM-DD")
      );

    setMarkCgv(markCgvDates);
    setMarkMega(markMegaDates);
    setMarkLotte(markLotteDates);
  }, [events, selectedFilters]);

  const handleConfirm = (selectedYear, selectedMonth, defaultdate) => {
    setSelectedDate(new Date(selectedYear, selectedMonth - 1, defaultdate));
  };

  const handleCalendarChange = (date) => {
    setSelectedDate(date);
  };

  const todayCursor = () => {
    setSelectedDate(new Date());
  };

  const handleFilterChange = (types) => {
    setSelectedFilters(types);
    // 필터링된 이벤트들을 설정
    const filtered = events.filter((event) => {
      if (types.length === 0) return true; // 선택된 필터가 없으면 모든 이벤트 표시

      // 선택된 필터에 해당하는 이벤트만 표시
      return types.includes(event.goodsType);
    });
    setFilteredEvents(filtered);
  };

  return (
    <div>
      <div className="h-auto min-h-full pb-36">
        <Header />
        <div className="flex mt-7 mb-3 mx-4 items-center">
          <DateSelector onConfirm={handleConfirm} selectedDate={selectedDate} />
          <div className="pl-2">
            <button
              className="px-2 rounded-lg border border-gray-200 select-none"
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
          events={filteredEvents} // 필터링된 이벤트들로 변경
        />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
