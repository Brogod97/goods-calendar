package goodscalendar.goodscalendar.crawling;

import goodscalendar.goodscalendar.domain.Event;
import goodscalendar.goodscalendar.domain.GoodsType;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Slf4j
public class EventCrawler {
    public List<Event> process(WebDriver driver, String url, String theater) {

        try {
            driver.get(url);
            List<Event> eventList = new ArrayList<>();


            if(theater.equals("MEGABOX")){
                List<WebElement> elements = driver.findElements(By.cssSelector("div.event-list > ul > li"));

                for (WebElement e : elements) {
                    String title = e.findElement(By.cssSelector("a > p.tit")).getText();
                    String thumbnail = e.findElement(By.cssSelector("a > p.img > img")).getAttribute("src");

                    // https://www.megabox.co.kr/event/detail?eventNo=12345
                    String eventId = e.findElement(By.cssSelector("a")).getAttribute("data-no");
                    String eventLink = "https://www.megabox.co.kr/event/detail?eventNo=" + eventId;

                    // TODO: date 값 yyyy-mm-dd로 변경 고려
                    String dueDate = e.findElement(By.cssSelector("a > p.date")).getText();
                    String[] split = dueDate.split("~");
                    String startDate = split[0];
                    String endDate = split[1];

                    if(title.contains("오리지널 티켓") && !title.contains("오리지널 티켓북")){
                        String type = GoodsType.OT.name();
                        Event event = new Event(title, thumbnail, type, theater, eventLink, startDate, endDate);
                        eventList.add(event);
                    }
                }
            }

            return eventList;
        }
        finally {
            driver.close();
            driver.quit();
            log.info("driver.quit()");
        }
    }
}
