// DateSelectorWithEventList.js

import React, { useEffect, useState, useCallback } from "react";
import EventList from "../EventList/EventList";
import moment from "moment";

const DateSelectorWithEventList = ({ selectedDate, events, searchValue }) => {
  const [filteredEvents, setFilteredEvents] = useState([]);

  const fetchEventsByDate = useCallback(
    async (date) => {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      const filteredEvents = events.filter((event) =>
        moment(event.startDate).isSame(formattedDate, "day")
      );
      setFilteredEvents(filteredEvents);
    },
    [events]
  );

  useEffect(() => {
    fetchEventsByDate(selectedDate);
  }, [selectedDate, fetchEventsByDate]);

  return (
    <div>
      <EventList events={filteredEvents} searchValue={searchValue} />
    </div>
  );
};

export default DateSelectorWithEventList;
