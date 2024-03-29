package goodscalendar.goodscalendar.crawler;

import goodscalendar.goodscalendar.domain.Event;
import goodscalendar.goodscalendar.domain.EventPage;
import goodscalendar.goodscalendar.domain.GoodsType;
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

    public List<Event> process(String url, String theater) {
        System.setProperty("webdriver.chrome.driver", driverPath);

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        driver = new ChromeDriver(options);
        log.info("Create Driver");

        driver.get(url);
        List<Event> eventList = new ArrayList<>();

        switch (theater) {
            case "MEGABOX":
                megabox(theater, eventList);
                break;

            case "CGV":
                CGV(theater, eventList);
                break;

            case "LOTTE":
                LotteCinema(theater, eventList);
                break;
        }

        closeDriver();

        return eventList;
    }

    private void megabox(String theater, List<Event> eventList) {
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
                Event event = new Event(title, thumbnail, type, theater, eventLink, startDate, endDate);
                eventList.add(event);
            }
        }
    }

    private void CGV(String theater, List<Event> eventList) {
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
                    Event event = new Event(title, thumbnail, type, theater, eventLink, startDate, endDate);
                    eventList.add(event);
                }
            }
        }
    }

    // TODO: URL 세팅 수정
    private void LotteCinema(String theater, List<Event> eventList) {
        List<WebElement> webElements = driver.findElements(By.cssSelector("ul.img_lst_wrap > li"));

        for (WebElement e : webElements) {
            String title = e.findElement(By.cssSelector("a > img")).getAttribute("alt");

            if (title.contains("아트카드")) {
                String thumbnail = e.findElement(By.cssSelector("a > img")).getAttribute("src");

                ArrayList<String> dueDate = splitDueDate(e.findElement(By.cssSelector("a > div.itm_date")).getText());
                String startDate = dueDate.get(0);
                String endDate = dueDate.get(1);

//                ((JavascriptExecutor) driver).executeScript("arguments[0].click();", e.findElement(By.cssSelector("a")));
//                String eventLink = driver.getCurrentUrl();
//                driver.navigate().back();

//                WebElement specificPage = e.findElement(By.cssSelector("a"));
//                specificPage.click();
//                String eventLink = driver.getCurrentUrl();
//                driver.navigate().back();

                String eventLink = EventPage.LOTTE.getDesc();
                String type = GoodsType.AC.name();

                Event event = new Event(title, thumbnail, type, theater, eventLink, startDate, endDate);
                eventList.add(event);
            }
        }
    }

    private ArrayList<String> splitDueDate(String dueDate) {
        ArrayList<String> result = new ArrayList<>();

        String[] split = dueDate.split("~");
        result.add(split[0].substring(0, 10));
        result.add(split[1].substring(0, 10));

        return result;
    }

    private void closeDriver() {
        driver.close();
        driver.quit();
        log.info("Close Driver");
    }
}
