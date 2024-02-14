package goodscalendar.goodscalendar.controller;

import goodscalendar.goodscalendar.domain.Event;
import goodscalendar.goodscalendar.domain.EventPage;
import goodscalendar.goodscalendar.service.EventSearchCond;
import goodscalendar.goodscalendar.service.EventService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


@Slf4j
@RestController
@RequiredArgsConstructor
@EnableScheduling
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {

    private final EventService eventService;

    @Scheduled(cron = "0 0 * * * *")
    @PostMapping("events")
    public void saveEvent() {
        log.info("Start saveEvent(), time = {}", LocalDateTime.now());

        for (EventPage eventPage : EventPage.values()) {
            String url = eventPage.getDesc();
            String theater = eventPage.name();

            eventService.saveEvent(url, theater);
        }

        log.info("End saveEvent(), time = {}", LocalDateTime.now());
    }

    @GetMapping("events")
    public List<Event> getEventList(@ModelAttribute("eventSearch") EventSearchCond eventSearchCond) {
        return eventService.getEventList(eventSearchCond);
    }
}
