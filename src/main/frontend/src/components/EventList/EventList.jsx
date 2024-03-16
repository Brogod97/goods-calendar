import React, { useState } from "react";
import "./EventList.scss";

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
    <div className="p-4">
      {/* <div className="border-dotted border border-gray-300"></div> */}
      <div className="flex justify-between items-center h-8 my-2">
        <div className="text-base font-medium">이벤트 목록</div>
        {/* FIXME: Filter를 컴포넌트로 분리 */}
        <div className="w-4 h-4 ml-auto relative">
          <div onClick={toggleFilterModal}>{/* <Filtericon /> */}</div>
          {isFilterModalOpen && (
            <div className="absolute top-4 left-[-80px] w-24 h-20 bg-white rounded-lg shadow-md items-center">
              {/* 각 필터를 체크박스로 표시 */}
              <p className="h-5 text-left text-xs mt-0 ml-3">
                <input
                  type="checkbox"
                  value="AC"
                  checked={selectedFilters.includes("AC")}
                  onChange={() => handleFilterChange("AC")}
                />
                아트
              </p>
              <p className="h-5 text-left text-xs mt-0 ml-3">
                <input
                  type="checkbox"
                  value="OT"
                  checked={selectedFilters.includes("OT")}
                  onChange={() => handleFilterChange("OT")}
                />
                오리지널
              </p>
              <p className="h-5 text-left text-xs mt-0 ml-3">
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
      {/* FIXME: 이벤트를 컴포넌트로 분리 -> 필요한 값만 Prop으로 전달 */}
      <ul className="list-none p-0">
        {searchedEvents.length === 0 ? (
          <div>이벤트가 없습니다</div>
        ) : (
          searchedEvents.map((event) => (
            <li
              className="flex border border-gray-300 rounded mb-2 h-20"
              key={event.id}
            >
              <a
                className="text-no-underline text-gray-700 flex w-full"
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  id="event_img"
                  className="m-2 size-16 flex items-center justify-center"
                >
                  <img className="size-16" src={event.thumbnail} alt="썸네일" />
                </div>
                <div className="flex flex-col pt-10px">
                  <div className="text-xs text-white flex items-center justify-start h-4 m-0">
                    {(() => {
                      if (event.goodsType === "AC") {
                        return (
                          <p className="bg-lotte border border-white rounded px-1">
                            아트카드
                          </p>
                        );
                      } else if (event.goodsType === "OT") {
                        return (
                          <p className="bg-mega border border-white rounded px-1">
                            오리지널 티켓
                          </p>
                        );
                      } else if (event.goodsType === "TTT") {
                        return (
                          <p className="bg-cgv border border-white rounded px-1">
                            TTT
                          </p>
                        );
                      } else if (event.goodsType === "FM") {
                        return (
                          <p className="bg-cgv border border-white rounded px-1">
                            필름마크
                          </p>
                        );
                      }
                      return null;
                    })()}
                  </div>
                  <div className="font-14 py-1 max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
                    <strong className="">{event.title}</strong>
                  </div>
                  <div className="event_date">
                    <p className="font-12 ">
                      {event.startDate} ~ {event.endDate}
                    </p>
                  </div>
                </div>
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default EventList;
