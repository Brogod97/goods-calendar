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

        for (WebElement li : webElements) {
            String title = li.findElement(By.cssSelector("a > p.tit")).getText();

            boolean isOriginalTicket = title.contains("오리지널 티켓") && !title.contains("오리지널 티켓북");
            if (isOriginalTicket) {
                String type = GoodsType.OT.name();
                String theater = EventPage.MEGABOX.name();
                String thumbnail = li.findElement(By.cssSelector("a > p.img > img")).getAttribute("src");

                String eventId = li.findElement(By.cssSelector("a")).getAttribute("data-no");
                String eventLink = "https://www.megabox.co.kr/event/detail?eventNo=" + eventId;

                String[] dueDate = li.findElement(By.cssSelector("a > p.date")).getText().split(" ~ ");
                String startDate = dueDate[0];
                String endDate = dueDate[1];

                Event event = new Event(title, type, theater, startDate, endDate, eventLink, thumbnail);
                eventList.add(event);
            }
        }
        closeDriver();
    }

    private void cgv(List<Event> eventList) {
        driverInit(EventPage.CGV.getDesc());

        WebElement moreBtn = driver.findElement(By.cssSelector("button.btn-item-more"));
        while(moreBtn.isDisplayed()) {
            try {
                moreBtn.click();
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }

        List<WebElement> webElements = driver.findElements(By.cssSelector("ul.sect-evt-item-list > li"));
        for (WebElement li : webElements) {
            String title = li.findElement(By.cssSelector("a > div.evt-desc > p.txt1")).getText();

            boolean isFilmMark = title.contains("필름마크") && !title.contains("필름마크북");
            boolean isTTT = title.contains("TTT") && !title.contains("TTT 콜렉팅북");
            if ( isFilmMark || isTTT) {
                String type = "";
                String theater = EventPage.CGV.name();
                String thumbnail = li.findElement(By.cssSelector("a > div.evt-thumb > img")).getAttribute("src");
                String eventLink = li.findElement(By.cssSelector("a")).getAttribute("href");
                String[] dueDate = li.findElement(By.cssSelector("a > div.evt-desc > p.txt2")).getText().split("~");
                String startDate = dueDate[0];
                String endDate = dueDate[1];

                if(isFilmMark) {
                    type = GoodsType.FM.name();
                }

                if(isTTT) {
                    type = GoodsType.TTT.name();
                }

                Event event = new Event(title, type, theater, startDate, endDate, eventLink, thumbnail);
                eventList.add(event);
            }
        }
        closeDriver();
    }

    // TODO: URL 세팅 수정
    private void lotteCinema(List<Event> eventList) {
        driverInit(EventPage.LOTTE.getDesc());

        // 하단 배너 닫기
        WebElement banner = driver.findElement(By.cssSelector("div.appbannermain_wrap.fixed"));
        if(banner.isDisplayed()) {
            WebElement closeButton = banner.findElement(By.cssSelector("button.btn_close"));
            closeButton.click();
        }

        // 더보기 버튼 클릭
        WebElement moreBtn;
        while (true) {
            try {
                moreBtn = driver.findElement(By.cssSelector("button.btn_txt_more"));
            } catch (org.openqa.selenium.NoSuchElementException e) {
                break;
            }

            if(moreBtn != null && moreBtn.isDisplayed()){
                try {
                    moreBtn.click();
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            } else {
                break;
            }
        }

        // 이벤트 크롤링
        List<WebElement> webElements = driver.findElements(By.cssSelector("ul.img_lst_wrap > li"));
        for (WebElement e : webElements) {
            String title = e.findElement(By.cssSelector("a > img")).getAttribute("alt");

            boolean isArtCard = title.contains("아트카드") && !title.contains("아트카드북");
            if (isArtCard) {
                String thumbnail = e.findElement(By.cssSelector("a > img")).getAttribute("src");

                String[] dueDate = e.findElement(By.cssSelector("a > div.itm_date")).getText().split(" ~ ");
                String startDate = dueDate[0];
                String endDate = dueDate[1];

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

    void driverInit(String url) {
        System.setProperty("webdriver.chrome.driver", driverPath);
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        driver = new ChromeDriver(options);
        driver = new ChromeDriver();
        log.info("Create Driver");
        driver.get(url);
    }

    private void closeDriver() {
        driver.close();
        driver.quit();
        log.info("Close Driver");
    }
}
