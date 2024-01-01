package goodscalendar.goodscalendar.controller;

import goodscalendar.goodscalendar.domain.Event;
import goodscalendar.goodscalendar.domain.EventPage;
import goodscalendar.goodscalendar.service.EventService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class EventController {

    private final EventService eventService;

    // TODO: 크롤링 스케줄링 적용
    @PostMapping("events")
    public void saveEvent() {
        for (EventPage eventPage : EventPage.values()) {
            String url = eventPage.getDesc();
            String theater = eventPage.name();

            eventService.saveEvent(url, theater);
        }
    }

    @GetMapping("events")
    public List<Event> getEventList() {
        return eventService.getEventList();
    }

    @GetMapping("events/date")
    public List<Event> getEventListByDate(@RequestParam String year, @RequestParam String month) {
        return eventService.getEventListByDate(year, month);
    }

    @GetMapping("events/type")
    public List<Event> getEventListByType(@RequestParam String[] inputValue) {
        return null;
    }

    @GetMapping("events/search")
    public List<Event> getEventListByTitle(@RequestParam String inputValue) {
        return eventService.getEventListByTitle(inputValue);
    }
}
