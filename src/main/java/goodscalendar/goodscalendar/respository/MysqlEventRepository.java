package goodscalendar.goodscalendar.respository;

import goodscalendar.goodscalendar.domain.Event;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.*;

@Slf4j
@Repository
public class MysqlEventRepository implements EventRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final SimpleJdbcInsert jdbcInsert;

    @Autowired
    public MysqlEventRepository(DataSource dataSource) {
        jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
        this.jdbcInsert = new SimpleJdbcInsert(dataSource)
                .withTableName("event")
                .usingGeneratedKeyColumns("id");
    }

    public Event save(Event event) {
        SqlParameterSource param = new BeanPropertySqlParameterSource(event);
        Number key = jdbcInsert.executeAndReturnKey(param);
        event.setId(key.longValue());
        return event;
    }

    public Optional<Event> findById(long id) {
        String sql = "select * from event where id = :id";
        Map<String, Long> param = Map.of("id", id);
        Event event = jdbcTemplate.queryForObject(sql, param, eventRowMapper());
        return Optional.of(event);

    }

    public List<Event> findByTitle(String inputValue) {
        String sql = "select * from event where title like :inputValue";
        String wrappedTitle = "%" + inputValue + "%";
        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("inputValue", wrappedTitle);

        return jdbcTemplate.query(sql, param, eventRowMapper());

    }

    public List<Event> findByDate(String year, String month) {
        String sql = "select * from event where substring(startDate, 1, 4) = :year and SUBSTRING(startDate, 6, 2) = :month";
        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("year", year)
                .addValue("month", month);
        return jdbcTemplate.query(sql, param, eventRowMapper());
    }

    public List<Event> findByType(List<String> typeList) {
        String sql = "select * from event where goods_type in (:typeList)";

        SqlParameterSource param = new MapSqlParameterSource("typeList", typeList);

        return jdbcTemplate.query(sql, param, eventRowMapper());
    }

    public List<Event> findAll() {
        String sql = "select * from event";
        return jdbcTemplate.query(sql, eventRowMapper());
    }

    private RowMapper<Event> eventRowMapper() {
        return BeanPropertyRowMapper.newInstance(Event.class);
    }
}
