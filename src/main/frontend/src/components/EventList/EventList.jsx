import React, { useState } from "react";

const EventList = ({ events, searchValue }) => {
  const [selectedFilters] = useState([]);

  const filteredEvents = selectedFilters.length
    ? events.filter((event) => selectedFilters.includes(event.type))
    : events;

  const searchedEvents = searchValue
    ? filteredEvents.filter((event) => {
        return event.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : filteredEvents;

  return (
    <div className="">
      {/* FIXME: 이벤트를 컴포넌트로 분리 -> 필요한 값만 Prop으로 전달 */}
      <ul className="list-none p-0">
        {searchedEvents.length === 0 ? (
          <div className="flex justify-center items-center text-sm text-gray-400">
            검색된 이벤트가 없습니다.
          </div>
        ) : (
          searchedEvents.map((event) => (
            <li
              className="flex border shadow-sm rounded mb-2 h-20 w-full"
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
                  <img
                    className="size-16 max-w-16"
                    src={event.thumbnail}
                    alt="썸네일"
                  />
                </div>
                <div className="flex flex-col pt-10px w-full">
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
                  <div className="font-14 py-1 ">
                    <p
                      className={`font-semibold truncate ${event.title.length >= 30 ? "max-w-[80%]" : "max-w-[95%]"}`}
                    >
                      {event.title}
                    </p>
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
