package goodscalendar.goodscalendar.respository;

import goodscalendar.goodscalendar.domain.Event;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MysqlEventRepositoryTest {
    @Autowired EventRepository mysqlEventRepository;

    @Commit
    @Test
    public void 저장() {
        //given
        Event event = new Event();
        event.setTitle("testTitle");
        event.setType("testType");
        event.setTheater("testTheater");
        event.setStartDate("2023-12-15");
        event.setEndDate("소진시");

        //when
        Event savedEvent = mysqlEventRepository.save(event);

        //then
        Event findEvent = mysqlEventRepository.findById(savedEvent.getId()).get();
        Assertions.assertThat(savedEvent.getTitle()).isEqualTo(findEvent.getTitle());

    }
}