package goodscalendar.goodscalendar.service;

import lombok.Data;

@Data
public class EventSearchCond {
    private String[] types;
    private String inputValue;
    private String year;
    private String month;
}
