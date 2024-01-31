package goodscalendar.goodscalendar.service;

import goodscalendar.goodscalendar.domain.EventPage;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@SpringBootTest
@Transactional
class EventServiceTest {

    @Autowired
    private EventService service;

    @Test
    void cgv() {
        String url = EventPage.CGV.getDesc();
        String theater = EventPage.CGV.name();

        service.saveEvent(url, theater);
    }

    @Test
    void megabox() {
        String url = EventPage.MEGABOX.getDesc();
        String theater = EventPage.MEGABOX.name();

        service.saveEvent(url, theater);
    }

    @Test
    void lotteCinema() {
        String url = EventPage.LOTTE.getDesc();
        String theater = EventPage.LOTTE.name();

        service.saveEvent(url, theater);
    }

}