package goodscalendar.goodscalendar.respository;

import goodscalendar.goodscalendar.domain.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.*;

@Repository
public class MysqlEventRepository implements EventRepository{

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MysqlEventRepository(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public Event save(Event event) {
        SimpleJdbcInsert jdbcInsert = new SimpleJdbcInsert(jdbcTemplate);
        jdbcInsert.withTableName("event").usingGeneratedKeyColumns("id");

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("title", event.getTitle());
        parameters.put("type", event.getType());
        parameters.put("theater", event.getTheater());
        parameters.put("startDate", event.getStartDate());
        parameters.put("endDate", event.getEndDate());

        Number key = jdbcInsert.executeAndReturnKey(new MapSqlParameterSource(parameters));
        event.setId(key.longValue());
        return event;
    }

    @Override
    public Optional<Event> findById(long id) {
        List<Event> result = jdbcTemplate.query("select * from event where id = ?"
                , eventRowMapper(), id);
        return result.stream().findAny();
    }

    @Override
    public List<Event> findByTitle(String title) {
        return null;
    }

    @Override
    public List<Event> findByDate(Date date) {
        return null;
    }

    @Override
    public List<Event> findByType(String type) {
        return null;
    }

    @Override
    public List<Event> findAll() {
        return null;
    }

    private RowMapper<Event> eventRowMapper() {
        return (rs, rowNum) -> {
            Event event = new Event();
            event.setId(rs.getLong("id"));
            event.setTitle(rs.getString("title"));
            event.setType(rs.getString("type"));
            event.setTheater(rs.getString("theater"));
            event.setStartDate(rs.getString("startDate"));
            event.setEndDate(rs.getString("endDate"));
            return event;
        };
    }
}
