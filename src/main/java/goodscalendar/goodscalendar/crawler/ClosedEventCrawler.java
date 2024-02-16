package goodscalendar.goodscalendar.crawler;

import goodscalendar.goodscalendar.domain.Event;
import goodscalendar.goodscalendar.domain.EventPage;
import goodscalendar.goodscalendar.domain.GoodsType;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.stereotype.Component;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class ClosedEventCrawler {
    private WebDriver driver;
    private static final String driverPath = "driver/chromedriver.exe";

    public void process(String theater) {
        // meagbox
        if (theater.equals(EventPage.MEGABOX.name())) {
            String filePath = "sql/megabox.sql";
            deleteExistFile(filePath);
            for (Event event : megabox()) {
                exportQueries(filePath, event);
            }
        }

        // cgv
        if (theater.equals(EventPage.CGV.name())) {
            String filePath = "sql/cgv.sql";
            deleteExistFile(filePath);
            for (Event event : cgv()) {
                exportQueries(filePath, event);
            }
        }

        // lotte
        if (theater.equals(EventPage.LOTTE.name())) {
            String filePath = "sql/lotte.sql";
            deleteExistFile(filePath);
            for(Event event : lotteCinema()) {
                exportQueries(filePath, event);
            };
        }
    }

    private List<Event> megabox() {
        List<Event> eventList = new ArrayList<>();
        driverInit("https://megabox.co.kr/event/end?searchText=%EC%98%A4%EB%A6%AC%EC%A7%80%EB%84%90%20%ED%8B%B0%EC%BC%93");

        // 더보기 버튼 클릭
        WebElement moreBtn = driver.findElement(By.cssSelector("div.btn-more > button.btn"));
        while (moreBtn.isDisplayed()) {
            try {
                moreBtn.click();
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            moreBtn = driver.findElement(By.cssSelector("div.btn-more > button.btn"));
        }

        // 이벤트 정보 크롤링
        List<WebElement> webElements = driver.findElements(By.cssSelector("div#event-list-wrap > div.inner-wrap > div.event-list.finish > ul > li"));
        for (WebElement e : webElements) {
            String title = e.findElement(By.cssSelector("a > p.tit")).getText();
            String thumbnail = e.findElement(By.cssSelector("a > p.img > img")).getAttribute("src");

            String eventId = e.findElement(By.cssSelector("a")).getAttribute("data-no");
            String eventLink = "https://www.megabox.co.kr/event/detail?eventNo=" + eventId;

            String[] dueDate = e.findElement(By.cssSelector("a > p.date")).getText().split(" ~ ");
            String startDate = dueDate[0];
            String endDate = dueDate[1];

            if (title.contains("오리지널 티켓") && !title.contains("오리지널 티켓북")) {
                String type = GoodsType.OT.name();
                String theater = EventPage.MEGABOX.name();
                Event event = new Event(title, type, theater, startDate, endDate, eventLink, thumbnail);
                eventList.add(event);
            }
        }
        closeDriver();

        return eventList;
    }

    private List<Event> cgv() {
        List<Event> eventList = new ArrayList<>();
        String eventPageURL = "http://www.cgv.co.kr/culture-event/event/end-list.aspx";
        driverInit(eventPageURL);

        int page = 1;
        while (page < 820) { // 816 - 176개 , 820 - 177개 // TODO: 조회 범위를 수동으로 지정하는 부분 수정
            // 현재 페이지 크롤링
            List<WebElement> elements = driver.findElements(By.cssSelector("div.sect-evt-entlist > ul > li"));
            for (WebElement li : elements) {
                String title = li.findElement(By.cssSelector("div.box-contents > a > strong")).getText();

                boolean isFilmMark = title.contains("필름마크") && !title.contains("필름마크북");
                boolean isTTT = title.contains("TTT");
                if ( isFilmMark || isTTT) {
                    String type = "";
                    String theater = EventPage.CGV.name();
                    String[] dueDate = li.findElement(By.cssSelector("div.box-contents > em.date")).getText().substring(4).split(" ~ ");
                    String startDate = dueDate[0];
                    String endDate = dueDate[1];
                    String eventLink = li.findElement(By.cssSelector("div.box-contents > a")).getAttribute("href");
                    String thumbnail = li.findElement(By.cssSelector("div.box-image > a > span.thumb-image > img")).getAttribute("src");

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

            // 다음 페이지 넘어가기
            try {
                driver.get(eventPageURL + "?page=" + ++page); //?page=2
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }

        return eventList;
    }

    private List<Event> lotteCinema() {
        List<Event> eventList = new ArrayList<>();
        driverInit("https://event.lottecinema.co.kr/NLCHS/Event/PastEventList");

        // 아트카드 검색어 입력
        WebElement searchInput = driver.findElement(By.xpath("//*[@id=\"contents\"]/div/div/fieldset/input"));
        searchInput.sendKeys("아트카드");
        WebElement searchButton = driver.findElement(By.xpath("//*[@id=\"contents\"]/div/div/fieldset/button"));
        searchButton.click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

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
        for (WebElement li : webElements) {
            String title = li.findElement(By.cssSelector("a > div.thm > img")).getAttribute("alt");
            String thumbnail = li.findElement(By.cssSelector("a > div.thm > img")).getAttribute("src");

            if (title.contains("아트카드") && !thumbnail.contains("https://cf.lottecinema.co.kr//Media/Event/de433fa26a3f4383976ceed9025aae30.png")) {
                String[] dueDate = li.findElement(By.cssSelector("a > div.itm_date")).getText().split(" ~ ");
                String startDate = dueDate[0];
                String endDate = dueDate[1];

                String eventLink = EventPage.LOTTE.getDesc();
                String type = GoodsType.AC.name();
                String theater = EventPage.LOTTE.name();

                Event event = new Event(title, type, theater, startDate, endDate, eventLink, thumbnail);
                eventList.add(event);
            }
        }
        closeDriver();

        return eventList;
    }

    private void deleteExistFile(String filePath) {
        File file = new File(filePath);
        if (file.exists()) {
            file.delete();
            log.info("기존 파일을 삭제하였습니다: {}", file.getName());
        }
    }

    private void exportQueries(String filePath, Event event) {
        String title = event.getTitle();
        if (title.contains("\n")) {
            title = title.substring(0, title.indexOf("\n")); // 줄바꿈 이후 제거
        }
        String goodsType = event.getGoodsType();
        String theater = event.getTheater();
        String startDate = event.getStartDate();
        String endDate = event.getEndDate();
        String eventLink = event.getLink();
        String thumbnail = event.getThumbnail();

        String query = """
                    insert into event(title, goods_type, theater, start_date, end_date, link, thumbnail) values ('%s', '%s', '%s', '%s', '%s', '%s', '%s');
                    """.formatted(title, goodsType, theater, startDate, endDate, eventLink, thumbnail);
        log.info("query = {}", query);

        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter(filePath, true));
            writer.write(query);
            writer.close();
            log.info("텍스트 파일이 성공적으로 생성되었습니다.");
        } catch (IOException e) {
            log.error("파일을 쓰는 중 오류가 발생했습니다", e);
        }
    }

    void driverInit(String url) {
        System.setProperty("webdriver.chrome.driver", driverPath);
//        ChromeOptions options = new ChromeOptions();
//        options.addArguments("--headless");
//        driver = new ChromeDriver(options);
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
