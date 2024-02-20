import React, { useState } from "react";
import filtericon from "../filter/filter.svg";
import "./EventList.css";

const EventList = ({ events, searchValue }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  const handleFilterChange = (type) => {
    // 선택된 필터들을 관리하는 배열에 추가 또는 제거
    if (selectedFilters.includes(type)) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== type));
    } else {
      setSelectedFilters([...selectedFilters, type]);
    }
  };

  const toggleFilterModal = () => {
    setFilterModalOpen(!isFilterModalOpen);
  };

  const filteredEvents = selectedFilters.length
    ? events.filter((event) => selectedFilters.includes(event.type))
    : events;

  const searchedEvents = searchValue
    ? filteredEvents.filter((event) => {
        return event.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : filteredEvents;

  return (
    <div>
      <div className="dotted-border"></div>
      <div className="header">
        <h4>이벤트 목록</h4>
        <div className="filtericon">
          <img src={filtericon} alt="filter" onClick={toggleFilterModal} />
          {isFilterModalOpen && (
            <div className="filter-modal">
              {/* 각 필터를 체크박스로 표시 */}
              <p>
                <input
                  type="checkbox"
                  value="AC"
                  checked={selectedFilters.includes("AC")}
                  onChange={() => handleFilterChange("AC")}
                />
                아트
              </p>
              <p>
                <input
                  type="checkbox"
                  value="OT"
                  checked={selectedFilters.includes("OT")}
                  onChange={() => handleFilterChange("OT")}
                />
                오리지널
              </p>
              <p>
                <input
                  type="checkbox"
                  value="TTT"
                  checked={selectedFilters.includes("TTT")}
                  onChange={() => handleFilterChange("TTT")}
                />
                TTT
              </p>
            </div>
          )}
        </div>
      </div>
      <ul>
        {searchedEvents.map(
          (
            event // 검색된 이벤트만 매핑
          ) => (
            <li key={event.id}>
              <a href={event.link} target="_blank" rel="noopener noreferrer">
                <div className="event_img">
                  <img src={event.thumbnail} alt="썸네일" />
                </div>
                <div className="event_info">
                  <div className="event_card">
                    <p className={event.goodsType}>
                      {event.goodsType === "AC" && "아트카드"}
                      {event.goodsType === "OT" && "오리지널 티켓"}
                      {event.goodsType === "TTT" && "TTT"}
                      {event.goodsType === "FM" && "필름마크"}
                    </p>
                  </div>
                  <div className="event_title">
                    <strong>{event.title}</strong>
                  </div>
                  <div className="event_date">
                    <p>
                      {event.startDate} ~ {event.endDate}
                    </p>
                  </div>
                </div>
              </a>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default EventList;
