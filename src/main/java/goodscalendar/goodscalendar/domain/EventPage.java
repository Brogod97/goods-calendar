package goodscalendar.goodscalendar.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum EventPage {
    MEGABOX("https://www.megabox.co.kr/event/megabox"),
    CGV("http://www.cgv.co.kr/culture-event/event/defaultNew.aspx#2"),
    LOTTE_CINEMA("https://event.lottecinema.co.kr/NLCHS/Event/DetailList?code=20");

    private final String desc;
}
