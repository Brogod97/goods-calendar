package goodscalendar.goodscalendar.crawler;

import goodscalendar.goodscalendar.domain.Event;
import goodscalendar.goodscalendar.domain.EventPage;
import goodscalendar.goodscalendar.domain.GoodsType;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Slf4j
public class EventCrawler {

    private WebDriver driver;
    private static final String driverPath = "driver/chromedriver.exe";

    public List<Event> process() throws Exception {
        List<Event> eventList = new ArrayList<>();

        megabox(eventList);
        cgv(eventList);
        lotteCinema(eventList);

        return eventList;
    }

    private void megabox(List<Event> eventList) {
        driverInit(EventPage.MEGABOX.getDesc());
        List<WebElement> webElements = driver.findElements(By.cssSelector("div.event-list > ul > li"));

        for (WebElement e : webElements) {
            String title = e.findElement(By.cssSelector("a > p.tit")).getText();
            String thumbnail = e.findElement(By.cssSelector("a > p.img > img")).getAttribute("src");

            String eventId = e.findElement(By.cssSelector("a")).getAttribute("data-no");
            String eventLink = "https://www.megabox.co.kr/event/detail?eventNo=" + eventId;

            ArrayList<String> dueDate = splitDueDate(e.findElement(By.cssSelector("a > p.date")).getText());
            String startDate = dueDate.get(0);
            String endDate = dueDate.get(1);

            if (title.contains("오리지널 티켓") && !title.contains("오리지널 티켓북")) {
                String type = GoodsType.OT.name();
                String theater = EventPage.MEGABOX.name();
                Event event = new Event(title, type, theater, startDate, endDate, eventLink, thumbnail);
                eventList.add(event);
            }
        }
        closeDriver();
    }

    private void cgv(List<Event> eventList) {
        driverInit(EventPage.CGV.getDesc());
        List<WebElement> webElements = driver.findElements(By.cssSelector("ul.sect-evt-item-list > li"));

        for (WebElement e : webElements) {
            String title = e.findElement(By.cssSelector("a > div.evt-desc > p.txt1")).getText();
            String thumbnail = e.findElement(By.cssSelector("a > div.evt-thumb > img")).getAttribute("src");
            String eventLink = e.findElement(By.cssSelector("a")).getAttribute("href");

            String date = e.findElement(By.cssSelector("a > div.evt-desc > p.txt2")).getText();
            if (!date.isBlank()) {
                ArrayList<String> dueDate = splitDueDate(date);
                String startDate = dueDate.get(0);
                String endDate = dueDate.get(1);

                if (title.contains("TTT") && !title.contains("TTT 콜렉팅북")) {
                    String type = GoodsType.TTT.name();
                    String theater = EventPage.CGV.name();
                    Event event = new Event(title, type, theater, startDate, endDate, eventLink, thumbnail);
                    eventList.add(event);
                }
            }
        }
        closeDriver();
    }

    // TODO: URL 세팅 수정
    private void lotteCinema(List<Event> eventList) {
        driverInit(EventPage.LOTTE.getDesc());
        List<WebElement> webElements = driver.findElements(By.cssSelector("ul.img_lst_wrap > li"));

        for (WebElement e : webElements) {
            String title = e.findElement(By.cssSelector("a > img")).getAttribute("alt");

            if (title.contains("아트카드")) {
                String thumbnail = e.findElement(By.cssSelector("a > img")).getAttribute("src");

                ArrayList<String> dueDate = splitDueDate(e.findElement(By.cssSelector("a > div.itm_date")).getText());
                String startDate = dueDate.get(0);
                String endDate = dueDate.get(1);

                /*
                ((JavascriptExecutor) driver).executeScript("arguments[0].click();", e.findElement(By.cssSelector("a")));
                String eventLink = driver.getCurrentUrl();
                driver.navigate().back();

                WebElement specificPage = e.findElement(By.cssSelector("a"));
                specificPage.click();
                String eventLink = driver.getCurrentUrl();
                driver.navigate().back();
                 */

                String eventLink = EventPage.LOTTE.getDesc();
                String type = GoodsType.AC.name();

                String theater = EventPage.LOTTE.name();
                Event event = new Event(title, type, theater, startDate, endDate, eventLink, thumbnail);
                eventList.add(event);
            }
        }
        closeDriver();
    }

    private ArrayList<String> splitDueDate(String dueDate) {
        ArrayList<String> result = new ArrayList<>();

        String[] split = dueDate.split("~");
        result.add(split[0].substring(0, 10));
        result.add(split[1].substring(0, 10));

        return result;
    }

    void driverInit(String url) {
        System.setProperty("webdriver.chrome.driver", driverPath);
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        driver = new ChromeDriver(options);
        log.info("Create Driver");
        driver.get(url);
    }

    private void closeDriver() {
        driver.close();
        driver.quit();
        log.info("Close Driver");
    }
}
