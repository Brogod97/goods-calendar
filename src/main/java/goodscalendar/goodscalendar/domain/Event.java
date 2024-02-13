package goodscalendar.goodscalendar.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Data
@Entity
public class Event {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String goodsType;
    private String theater;
    private String startDate;
    private String endDate;
    private String link;
    private String thumbnail;

    public Event() {
    }

    public Event(String title, String goodsType, String theater, String startDate, String endDate, String link, String thumbnail) {
        this.title = title;
        this.goodsType = goodsType;
        this.theater = theater;
        this.startDate = startDate;
        this.endDate = endDate;
        this.link = link;
        this.thumbnail = thumbnail;
    }
}
