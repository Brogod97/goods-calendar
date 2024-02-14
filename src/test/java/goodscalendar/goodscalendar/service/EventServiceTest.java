package goodscalendar.goodscalendar.service;

import goodscalendar.goodscalendar.domain.Event;
import goodscalendar.goodscalendar.domain.EventPage;
import goodscalendar.goodscalendar.respository.EventRepository;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@Slf4j
@Transactional
@SpringBootTest
class EventServiceTest {

    @Autowired
    private EventService service;
    @Autowired
    private EventRepository eventRepository;

    /**
     * 영화관 별 크롤링 이벤트 저장 테스트
     */
    @Test
    @DisplayName("씨지비 이벤트 크롤링 저장")
    void cgv() {
        String url = EventPage.CGV.getDesc();
        String theater = EventPage.CGV.name();

        service.saveEvent(url, theater);
    }

    @Test
    @DisplayName("메가박스 이벤트 크롤링 저장")
    void megabox() {
        String url = EventPage.MEGABOX.getDesc();
        String theater = EventPage.MEGABOX.name();

        service.saveEvent(url, theater);
    }

    @Test
    @DisplayName("롯데시네마 이벤트 크롤링 저장")
    void lotteCinema() {
        String url = EventPage.LOTTE.getDesc();
        String theater = EventPage.LOTTE.name();

        service.saveEvent(url, theater);
    }

    /**
     * DB에 저장된 데이터 조회 테스트
     */
    @Test
    @DisplayName("모든 이벤트 조회")
    void getEventList() {
        //given
        Event event1 = new Event("getEventListByType Test1", "OT", "theater", "2021-01-05", "2024-02-07", "link", "thumbnail");
        Event event2 = new Event("getEventListByType Test2", "OT", "theater", "2021-01-06", "2024-02-07", "link", "thumbnail");
        Event event3 = new Event("getEventListByType Test3", "TTT", "theater", "2021-02-07", "2024-02-07", "link", "thumbnail");
        Event event4 = new Event("getEventListByType Test4", "AC", "theater", "2021-02-07", "2024-02-07", "link", "thumbnail");
        Event event5 = new Event("getEventListByType Test5", "AC", "theater", "2021-02-07", "2024-02-07", "link", "thumbnail");

        eventRepository.save(event1);
        eventRepository.save(event2);
        eventRepository.save(event3);
        eventRepository.save(event4);
        eventRepository.save(event5);

        EventSearchCond eventSearchCond = new EventSearchCond();

        //when
        List<Event> result = service.getEventList(eventSearchCond);

        //then
        for (Event e : result) {
            log.info("result={}", e);
        }
        Assertions.assertThat(result).hasSize(5);
    }

    @Test
    @DisplayName("년, 월에 해당하는 이벤트 조회")
    void getEventListByDate() {
        //given
        Event event1 = new Event("getEventListByDate Test1", "thumbnail", "theater", "2021-01-05", "2024-02-07", "link", "thumbnail");
        Event event2 = new Event("getEventListByDate Test2", "thumbnail", "theater", "2021-01-06", "2024-02-07", "link", "thumbnail");
        Event event3 = new Event("getEventListByDate Test3", "thumbnail", "theater", "2021-02-07", "2024-02-07", "link", "thumbnail");

        eventRepository.save(event1);
        eventRepository.save(event2);
        eventRepository.save(event3);

        EventSearchCond eventSearchCond = new EventSearchCond();
        eventSearchCond.setYear("2021");
        eventSearchCond.setMonth("01");

        //when
        List<Event> result = service.getEventList(eventSearchCond);

        //then
        for (Event e : result) {
            log.info("result={}", e);
        }
        assertThat(result.size()).isEqualTo(2);
    }

    @Test
    @DisplayName("타입으로 필터링")
    void getEventListByType() {
        //given
        Event event1 = new Event("getEventListByType Test1", "OT", "theater", "2021-01-05", "2024-02-07", "link", "thumbnail");
        Event event2 = new Event("getEventListByType Test2", "OT", "theater", "2021-01-06", "2024-02-07", "link", "thumbnail");
        Event event3 = new Event("getEventListByType Test3", "TTT", "theater", "2021-02-07", "2024-02-07", "link", "thumbnail");
        Event event4 = new Event("getEventListByType Test4", "AC", "theater", "2021-02-07", "2024-02-07", "link", "thumbnail");
        Event event5 = new Event("getEventListByType Test5", "AC", "theater", "2021-02-07", "2024-02-07", "link", "thumbnail");

        eventRepository.save(event1);
        eventRepository.save(event2);
        eventRepository.save(event3);
        eventRepository.save(event4);
        eventRepository.save(event5);

        EventSearchCond eventSearchCond = new EventSearchCond();
        eventSearchCond.setTypes(new String[]{"AC", "TTT"});

        //when
        List<Event> result = service.getEventList(eventSearchCond);

        //then
        assertThat(result.size()).isEqualTo(3);
    }

    @Test
    @DisplayName("검색 기능 시 Title로 검색")
    void getEventListByTitle() {
        //given
        Event event1 = new Event("라푼젤", "OT", "theater", "2021-01-05", "2024-02-07", "link", "thumbnail");
        Event event2 = new Event("분노의 질주: 도쿄 드리프트", "OT", "theater", "2021-01-06", "2024-02-07", "link", "thumbnail");
        Event event3 = new Event("분노의 질주: 언리미티드", "TTT", "theater", "2021-02-07", "2024-02-07", "link", "thumbnail");

        eventRepository.save(event1);
        eventRepository.save(event2);
        eventRepository.save(event3);

        EventSearchCond eventSearchCond = new EventSearchCond();
        eventSearchCond.setInputValue("분노");

        //when
        List<Event> resultList = service.getEventList(eventSearchCond);

        //then
        assertThat(resultList).hasSize(2);
    }
}