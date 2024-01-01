package goodscalendar.goodscalendar.respository;

import goodscalendar.goodscalendar.domain.Event;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface EventRepository {
    Event save(Event event);
    Optional<Event> findById(long id);
    List<Event> findByTitle(String title);
    List<Event> findByDate(String year, String month);
    List<Event> findByType(String[] type);
    List<Event> findAll();
}
