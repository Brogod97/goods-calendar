package goodscalendar.goodscalendar.respository;

import goodscalendar.goodscalendar.domain.Event;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.*;

@Repository
@Slf4j
public class MysqlEventRepository implements EventRepository{

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MysqlEventRepository(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public Event save(Event event) {
        SimpleJdbcInsert jdbcInsert = new SimpleJdbcInsert(jdbcTemplate);
        jdbcInsert.withTableName("event").usingGeneratedKeyColumns("id");

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("title", event.getTitle());
        parameters.put("thumbnail", event.getThumbnail());
        parameters.put("goods_type", event.getType());
        parameters.put("theater", event.getTheater());
        parameters.put("link", event.getLink());
        parameters.put("startDate", event.getStartDate());
        parameters.put("endDate", event.getEndDate());

        Number key = jdbcInsert.executeAndReturnKey(new MapSqlParameterSource(parameters));
        event.setId(key.longValue());
        return event;
    }

    public Optional<Event> findById(long id) {
        List<Event> result = jdbcTemplate.query("select * from event where id = ?", eventRowMapper(), id);
        return result.stream().findAny();
    }

    public List<Event> findByTitle(String inputValue) {
        String wrappedTitle = "%" + inputValue + "%";
        return jdbcTemplate.query("select * from event where title like ?", eventRowMapper(), wrappedTitle);
    }

    public List<Event> findByDate(String year, String month) {
        return jdbcTemplate.query("select * from event where substring(startDate, 1, 4) = ? and SUBSTRING(startDate, 6, 2) = ?", eventRowMapper(), year, month);
    }

    public List<Event> findByType(String[] type) {
//        Map<String, Object> paramMap = new HashMap<>();
//        paramMap.put("typeList", inputValue);
//        return jdbcTemplate.query("select * from event where goods_type in (:typeList)", paramMap, eventRowMapper());
        return null;
    }

    public List<Event> findAll() {
        return jdbcTemplate.query("select * from event", eventRowMapper());
    }

    private RowMapper<Event> eventRowMapper() {
        return (rs, rowNum) -> {
            Event event = new Event();
            event.setId(rs.getLong("id"));
            event.setTitle(rs.getString("title"));
            event.setThumbnail(rs.getString("thumbnail"));
            event.setType(rs.getString("goods_type"));
            event.setTheater(rs.getString("theater"));
            event.setLink(rs.getString("link"));
            event.setStartDate(rs.getString("startDate"));
            event.setEndDate(rs.getString("endDate"));
            return event;
        };
    }
}
