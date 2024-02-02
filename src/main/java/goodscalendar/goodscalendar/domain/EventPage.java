package goodscalendar.goodscalendar.domain;

public enum EventPage {
    CGV("http://www.cgv.co.kr/culture-event/event/defaultNew.aspx#2"),
    MEGABOX("https://www.megabox.co.kr/event/megabox"),
    LOTTE("https://event.lottecinema.co.kr/NLCHS/Event/DetailList?code=20");

    private String desc;
    EventPage(String desc) {
        this.desc = desc;
    }

    public String getDesc() {
        return desc;
    }
}
