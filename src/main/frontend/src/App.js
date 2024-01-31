import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import axios from "axios";
import "./Calendar.css";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DateSelector from "./components/DateSelector/DateSelector";
import Help from "./components/Help/Help";
import Searchicon from "./components/Searchicon/Searchicon";
import DateSelectorWithEventList from "./components/DateSelectorWithEventList/DateSelectorWithEventList";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [markCgv, setMarkCgv] = useState([]);
  const [markMega, setMarkMega] = useState([]);
  const [markLotte, setMarkLotte] = useState([]);

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
          .filter((event) => event.theater === "LOTTECINEMA")
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

  return (
    <div>
      <Header />
      <div className="contents" style={{ display: "flex" }}>
        <DateSelector onConfirm={handleConfirm} selectedDate={selectedDate} />
        <Help />
        <Searchicon />
      </div>
      <div className="cal">
        <Calendar
          locale="en"
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
                  className="dotCgv"
                ></div>
              );
            }
            if (markMega.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              html.push(
                <div
                  key={`mega-${moment(date).format("YYYY-MM-DD")}`}
                  className="dotMega"
                ></div>
              );
            }
            if (
              markLotte.find((x) => x === moment(date).format("YYYY-MM-DD"))
            ) {
              html.push(
                <div
                  key={`lotte-${moment(date).format("YYYY-MM-DD")}`}
                  className="dotLotte"
                ></div>
              );
            }
            return <div className="absoluteDiv">{html}</div>;
          }}
        />
      </div>
      <DateSelectorWithEventList selectedDate={selectedDate} events={events} />
      <Footer />
    </div>
  );
}

export default App;
