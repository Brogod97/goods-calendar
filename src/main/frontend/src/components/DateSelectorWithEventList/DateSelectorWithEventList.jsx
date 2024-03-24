// DateSelectorWithEventList.js
// FIXME: 불필요한 계층이므로, EventList와 그 상위 컴포넌트에서 해결하기

import React, { useEffect, useState, useCallback } from "react";
import EventList from "../EventList/EventList";
import moment from "moment";

const DateSelectorWithEventList = ({ selectedDate, events }) => {
  const [filteredEvents, setFilteredEvents] = useState([]);

  const fetchEventsByDate = useCallback(
    async (date) => {
      const formattedDate = moment(date).format("YYYY-MM-DD");

      const filteredEvents = events.filter((event) =>
        moment(event.startDate, "YYYY.MM.DD")
          .startOf("day")
          .isSame(formattedDate, "day")
      );

      setFilteredEvents(filteredEvents);
    },
    [events]
  );

  useEffect(() => {
    fetchEventsByDate(selectedDate);
  }, [selectedDate, fetchEventsByDate]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center h-8 my-2">
        <div className="text-base font-medium">이벤트 목록</div>
      </div>
      <EventList events={filteredEvents} />
    </div>
  );
};

export default DateSelectorWithEventList;
