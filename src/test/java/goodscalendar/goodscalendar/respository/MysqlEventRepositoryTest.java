package goodscalendar.goodscalendar.respository;

import goodscalendar.goodscalendar.domain.Event;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@Slf4j
@Transactional
@SpringBootTest
class MysqlEventRepositoryTest {

    @Autowired EventRepository repository;

    @Test
    void save() {
        //given
        Event event = new Event(1, "title", "thumbnail",
                "test", "theater", "link",
                "2024-02-07", "2024-02-07");
        //when
        repository.save(event);

        //then
        Event result = repository.findById(event.getId()).get();

        log.info("event={}", event);
        log.info("findEvent={}", result);
        assertThat(result).isEqualTo(event);
    }

    @Test
    void findByTitle() {
        //given
        Event event1 = new Event(1, "오리지널 티켓 <라푼젤>", "thumbnail",
                "type", "theater", "link",
                "2024-02-07", "2024-02-07");
        Event event2 = new Event(2, "TTT <라푼젤>", "thumbnail",
                "type", "theater", "link",
                "2024-02-07", "2024-02-07");
        Event event3 = new Event(3, "아트카드 <악마는 프라다를 입는다.>", "thumbnail",
                "type", "theater", "link",
                "2024-02-07", "2024-02-07");

        //when
        repository.save(event1);
        repository.save(event2);
        repository.save(event3);

        //then
        List<Event> result = repository.findByTitle("라푼젤");

        log.info("result={}", result);
        assertThat(result.size()).isEqualTo(2);
    }

    @Test
    void findByDate() {
        //given
        Event event1 = new Event(1, "오리지널 티켓 <라푼젤>", "thumbnail",
                "type", "theater", "link",
                "1999-01-01", "2024-02-07");
        Event event2 = new Event(2, "TTT <라푼젤>", "thumbnail",
                "type", "theater", "link",
                "1999-01-01", "2024-02-07");
        Event event3 = new Event(3, "아트카드 <악마는 프라다를 입는다.>", "thumbnail",
                "type", "theater", "link",
                "1999-02-14", "2024-02-07");

        //when
        repository.save(event1);
        repository.save(event2);
        repository.save(event3);

        //then
        List<Event> result = repository.findByDate("1999", "02");
        log.info("result={}", result);

        assertThat(result.size()).isEqualTo(1);
    }

    @Test
    void findByType() {
        //given
        Event event1 = new Event(991, "오리지널 티켓 <라푼젤>", "thumbnail",
                "OT", "theater", "link",
                "1999-01-01", "2024-02-07");
        Event event2 = new Event(992, "TTT <라푼젤>", "thumbnail",
                "TTT", "theater", "link",
                "1999-01-01", "2024-02-07");
        Event event3 = new Event(993, "아트카드 <악마는 프라다를 입는다.>", "thumbnail",
                "AC", "theater", "link",
                "1999-02-14", "2024-02-07");
        Event event4 = new Event(994, "TTT <이웃집 토토로>", "thumbnail",
                "TTT", "theater", "link",
                "1999-03-01", "2024-02-07");
        Event event5 = new Event(995, "아트카드 <귀를 기울이면>", "thumbnail",
                "AC", "theater", "link",
                "1999-02-14", "2024-02-07");

        //when
        repository.save(event1);
        repository.save(event2);
        repository.save(event3);
        repository.save(event4);
        repository.save(event5);

        //then
        List<Event> result = repository.findByType(Arrays.asList("TTT", "AC"));
        log.info("result={}", result);

        assertThat(result.size()).isEqualTo(4);
    }

    @Test
    void findAll() {
        //given
        Event event = new Event(1, "title", "thumbnail",
                "type", "theater", "link",
                "2024-02-07", "2024-02-07");
        //when
        repository.save(event);

        //then
        List<Event> result = repository.findAll();

        log.info("result.size()={}", result.size());
        assertThat(result.size()).isEqualTo(1);
    }
}