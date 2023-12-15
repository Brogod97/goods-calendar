package goodscalendar.goodscalendar.domain;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    long id;
    String title;
    String type;
    String theater;
    String startDate;
    String endDate;
}
