package goodscalendar.goodscalendar.crawler;

import goodscalendar.goodscalendar.domain.EventPage;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@SpringBootTest
class ClosedEventCrawlerTest {
    @Autowired  ClosedEventCrawler crawler;

    @Test
    @DisplayName("오리지널 티켓 종료된 이벤트 크롤링")
    void originalTicket() {
        crawler.process(EventPage.MEGABOX.name());
    }

    @Test
    @DisplayName("아트카드 종료된 이벤트 크롤링")
    void artCard() {
        crawler.process(EventPage.LOTTE.name());
    }

    @Test
    @DisplayName("CGV 종료된 이벤트 크롤링")
    void FilmMark_TTT() {
        crawler.process(EventPage.CGV.name());
    }
}