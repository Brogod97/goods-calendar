package goodscalendar.goodscalendar.crawling;

import goodscalendar.goodscalendar.domain.Event;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MegaboxCrawling {
    private WebDriver driver;
    private String url = "https://www.megabox.co.kr/event/megabox";
    private String driverPath = "driver/chromedriver.exe";

    public List<Event> process() {
        System.setProperty("webdriver.chrome.driver", driverPath);

        try {
            // TODO: headless 적용하기
            driver = new ChromeDriver();

            return getEventList();
        }
        finally {
            driver.close();
            driver.quit();
        }
    }

    private List<Event> getEventList() {
        driver.get(url);

        List<WebElement> elements = driver.findElements(By.cssSelector("div.event-list > ul > li"));
        List<Event> eventList = new ArrayList<>();

        for (WebElement e : elements) {
            String title = e.findElement(By.cssSelector("a > p.tit")).getText();
            String thumbnail = e.findElement(By.cssSelector("a > p.img > img")).getAttribute("src");

            // https://www.megabox.co.kr/event/detail?eventNo=eventId
            String eventId = e.findElement(By.cssSelector("a")).getAttribute("data-no");
            String eventLink = "https://www.megabox.co.kr/event/detail?eventNo=" + eventId;

            String dueDate = e.findElement(By.cssSelector("a > p.date")).getText();
            String[] split = dueDate.split("~");
            String startDate = split[0];
            String endDate = split[1];

            // TODO: 문자열 검색 변수 처리
            // TODO: type 세팅 필요
            if(title.contains("오리지널 티켓") && !title.contains("오리지널 티켓북")){
                Event event = new Event();
                event.setTitle(title);
                event.setThumbnail(thumbnail);
                event.setLink(eventLink);
                event.setStartDate(startDate);
                event.setEndDate(endDate);

                eventList.add(event);
            }
        }

        return eventList;
    }
}
