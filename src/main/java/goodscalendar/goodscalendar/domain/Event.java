package goodscalendar.goodscalendar.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
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
