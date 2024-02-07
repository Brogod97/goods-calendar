package goodscalendar.goodscalendar.domain;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Event {
    long id;
    String title;
    String thumbnail;
    String type;
    String theater;
    String link;
    String startDate;
    String endDate;

    public Event(String title, String thumbnail, String type, String theater, String link, String startDate, String endDate) {
        this.title = title;
        this.thumbnail = thumbnail;
        this.type = type;
        this.theater = theater;
        this.link = link;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
