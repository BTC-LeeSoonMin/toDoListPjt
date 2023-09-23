package com.office.todolist.card;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Log4j2
@RestController
@RequestMapping("/api/card")
public class CardController {

    @Autowired
    CardService cardService;

    @PostMapping(value={"/insert"}, consumes = "application/json; charset=utf-8")
    public void cardInsert(@RequestBody Map<String, Object> msgMap) {
        log.info("cardInsert");
        log.info(msgMap.get("title"));
        log.info(msgMap.get("body"));

    }


}
