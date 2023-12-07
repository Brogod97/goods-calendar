package goodscalendar.goodscalendar.board;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BoardController {

    @GetMapping("/api/data")
    public String test() {
        return "Hello, world!";
    }
}