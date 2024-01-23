package goodscalendar.goodscalendar.service;

import goodscalendar.goodscalendar.domain.Event;
import goodscalendar.goodscalendar.respository.EventRepository;
import goodscalendar.goodscalendar.crawling.EventCrawler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class EventService {

    private final EventRepository mysqlEventRepository;
    private final EventCrawler eventCrawler;

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
