package goodscalendar.goodscalendar.controller;

import goodscalendar.goodscalendar.domain.EventPage;
import goodscalendar.goodscalendar.service.EventService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class EventController {

    private final EventService eventService;

    // TODO: 크롤링 스케줄링 적용
    @PostMapping("event/save")
    public void saveEvent() {
        for (EventPage eventPage : EventPage.values()) {
            String url = eventPage.getDesc();
            String theater = eventPage.name();

            eventService.saveEvent(url, theater);
        }
    }
}
