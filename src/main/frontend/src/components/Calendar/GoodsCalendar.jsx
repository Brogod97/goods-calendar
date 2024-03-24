import React from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "./Calendar.scss";

function GoodsCalendar({
  handleCalendarChange,
  selectedDate,
  markCgv,
  markMega,
  markLotte,
}) {
  return (
    <div className="flex justify-center mx-4">
      <Calendar
        locale="kr"
        calendarType="gregory"
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
          if (view === "month" && date.getMonth() !== selectedDate.getMonth()) {
            if (markCgv.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              html.push(
                <div
                  key={`cgv-${moment(date).format("YYYY-MM-DD")}`}
                  className="w-6px h-6px ml-0.5 bg-cgv opacity-50"
                ></div>
              );
            }
            if (markMega.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
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
            if (markCgv.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              html.push(
                <div
                  key={`cgv-${moment(date).format("YYYY-MM-DD")}`}
                  className="w-6px h-6px ml-0.5 bg-cgv"
                ></div>
              );
            }
            if (markMega.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
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
              <p className="dot"></p>
              <div className="flex justify-center items-center absolute translate-y-200ps -translate-x-8ps">
                {html}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}

export default GoodsCalendar;
