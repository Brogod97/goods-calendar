package goodscalendar.goodscalendar.service;

import goodscalendar.goodscalendar.domain.Event;
import goodscalendar.goodscalendar.respository.EventRepository;
import goodscalendar.goodscalendar.crawler.EventCrawler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class EventService {

    private final EventRepository eventRepository;
    private final EventCrawler eventCrawler;

    @Transactional
    public void saveEvent(String url, String theater) {

        List<Event> eventList = eventCrawler.process(url, theater);
        for (Event event : eventList) {
            if(eventRepository.findByTitleContaining(event.getTitle()).isEmpty()) {
                Event savedEvent = eventRepository.save(event);
                log.info("savedEvent={}", savedEvent);
            }
        }
    }

    public List<Event> getEventList() {
        return eventRepository.findAll();
    }

    public List<Event> getEventListByDate(String year, String month){
        return eventRepository.findByYearAndMonth(year, month);
    }

    public List<Event> getEventListByType(String[] typeList) {
        return eventRepository.findByTypes(typeList);
    }

    public List<Event> getEventListByTitle(String inputValue) {
        return eventRepository.findByTitleContaining(inputValue);
    }

}
