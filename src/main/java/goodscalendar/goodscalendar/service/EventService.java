package goodscalendar.goodscalendar.service;

import goodscalendar.goodscalendar.domain.Event;
import goodscalendar.goodscalendar.respository.MysqlEventRepository;
import goodscalendar.goodscalendar.crawling.EventCrawler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class EventService {

    private final MysqlEventRepository mysqlEventRepository;
    private final EventCrawler eventCrawler;
    private WebDriver driver; // TODO: headless 적용하기
    private static final String driverPath = "driver/chromedriver.exe";

    public void saveEvent(String url, String theater) {
        driver = new ChromeDriver();
        System.setProperty("webdriver.chrome.driver", driverPath);
        log.info("driver 생성됨");

        List<Event> eventList = eventCrawler.process(driver, url, theater);

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

    //    public List<Event> getEventListByDate(){}

    //    public void getEventListByType(String[] inputValue) {}

    public List<Event> getEventListByTitle(String inputValue) {
        return mysqlEventRepository.findByTitle(inputValue);
    }




}
