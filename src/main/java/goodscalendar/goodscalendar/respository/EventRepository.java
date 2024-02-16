package goodscalendar.goodscalendar.respository;

import goodscalendar.goodscalendar.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByTitleContaining(String title);

    @Query("SELECT e FROM Event e WHERE SUBSTRING(e.startDate, 1, 4) = :year AND SUBSTRING(e.startDate, 6, 2) = :month")
    List<Event> findByYearAndMonth(@Param("year") String year, @Param("month") String month);

    @Query("SELECT e From Event e WHERE e.goodsType in (:typeList)")
    List<Event> findByTypes(@Param("typeList") String[] typeList);

}
