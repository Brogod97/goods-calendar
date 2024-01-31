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
@Service
public class EventService {

    private final EventRepository mysqlEventRepository;
    private final EventCrawler eventCrawler;

    @Transactional
    public void saveEvent(String url, String theater) {

        List<Event> eventList = eventCrawler.process(url, theater);
        for (Event event : eventList) {
            if(mysqlEventRepository.findByTitle(event.getTitle()).isEmpty()) {
                Event savedEvent = mysqlEventRepository.save(event);
                log.info("savedEvent={}", savedEvent);
            }
        }
    }

    public List<Event> getEventList() {
        return mysqlEventRepository.findAll();
    }

    public List<Event> getEventListByDate(String year, String month){
        return mysqlEventRepository.findByDate(year, month);
    }

    public List<Event> getEventListByType(List<String> typeList) {
        return mysqlEventRepository.findByType(typeList);
    }

    public List<Event> getEventListByTitle(String inputValue) {
        return mysqlEventRepository.findByTitle(inputValue);
    }

}
