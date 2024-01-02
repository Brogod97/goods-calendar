package goodscalendar.goodscalendar.crawling;

import goodscalendar.goodscalendar.domain.Event;
import goodscalendar.goodscalendar.domain.GoodsType;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
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
                List<WebElement> webElements = driver.findElements(By.cssSelector("div.event-list > ul > li"));

                for (WebElement e : webElements) {
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

            if(theater.equals("CGV")) {
                List<WebElement> webElements = driver.findElements(By.cssSelector("ul.sect-evt-item-list > li"));

                for (WebElement e : webElements) {
                    String title = e.findElement(By.cssSelector("a > div.evt-desc > p.txt1")).getText();
                    String thumbnail = e.findElement(By.cssSelector("a > div.evt-thumb > img")).getAttribute("src");

                    // http://www.cgv.co.kr/culture-event/event/ + detailViewUnited.aspx?seq=39257&menu=001
                    String eventLink = e.findElement(By.cssSelector("a")).getAttribute("href");

                    // TODO: date 값 yyyy-mm-dd로 변경 고려
                    String dueDate = e.findElement(By.cssSelector("a > div.evt-desc > p.txt2")).getText();
                    String[] split = dueDate.split("~");
                    String startDate = split[0];
                    String endDate = split[1];

                    if( title.contains("TTT") && !title.contains("TTT 콜렉팅북") ){
                        String type = GoodsType.TTT.name();
                        Event event = new Event(title, thumbnail, type, theater, eventLink, startDate, endDate);
                        eventList.add(event);
                    }
                }
            }


            if(theater.equals("LOTTE")) {
                List<WebElement> webElements = driver.findElements(By.cssSelector("ul.img_lst_wrap > li"));
                // https://event.lottecinema.co.kr/NLCHS/Event/EventTemplateInfo?eventId= + 201010016923769

                for (WebElement e : webElements) {
                    String title = e.findElement(By.cssSelector("a > img")).getAttribute("alt");

                    if(title.contains("시그니처 아트카드")){
                        String thumbnail = e.findElement(By.cssSelector("a > img")).getAttribute("src");
                        String dueDate = e.findElement(By.cssSelector("a > div.itm_date")).getText();
                        String[] split = dueDate.split("~");
                        String startDate = split[0];
                        String endDate = split[1];

                        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", e.findElement(By.cssSelector("a")));
                        String eventLink = driver.getCurrentUrl();
                        driver.navigate().back();

                        String type = GoodsType.AC.name();

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
