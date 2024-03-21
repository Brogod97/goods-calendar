package goodscalendar.goodscalendar.controller;

import goodscalendar.goodscalendar.domain.Event;
import goodscalendar.goodscalendar.service.EventSearchCond;
import goodscalendar.goodscalendar.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@EnableScheduling
@CrossOrigin(origins = "http://192.168.45.35:3000")
public class EventController {

    private final EventService eventService;

    // TODO: 추후 삭제 고려
    @PostMapping("events")
    public void saveEvent() {
        eventService.saveEvent();
    }

    @GetMapping("events")
    public List<Event> getEventList(@ModelAttribute("eventSearch") EventSearchCond eventSearchCond) {
        return eventService.getEventList(eventSearchCond);
    }
}