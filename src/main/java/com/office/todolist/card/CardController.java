package com.office.todolist.card;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Log4j2
@RestController
@RequestMapping("/api/card")
public class CardController {
    final private int CARD_INSERT_SUCCESS = 1;
    final private int CARD_INSERT_FAIL = 0;

    @Autowired
    CardService cardService;

    @PostMapping("/insert")
    public int cardInsert(@RequestBody Map<String, Object> msgMap, CardDto cardDto) {
        log.info("cardInsert");

        int result = -1;
        result = cardService.cardInsert(msgMap, cardDto);
        if (result > 0){
            log.info("card insert success");
            return CARD_INSERT_SUCCESS;
        } else {
            log.info("card insert fail");
            return CARD_INSERT_FAIL;
        }
    }

    @GetMapping("/cardAllList")
    public Object cardAllList(){
        log.info("cardList");


        List<CardDto> cardDtos = cardService.cardAllList();

        return cardDtos;
    }

    /*
        c_no가 일치하는 카드의 c_cnt_task 값을 반환
     */
    @PostMapping("/getCntTask")
    public Object getCntTask(@RequestBody Map<String, Object> msgMap, CardDto cardDto) {
        log.info("getCntTask");
        Map<String, Object> map = new HashMap<>();

        cardDto = cardService.getCntTask(msgMap, cardDto);

        map.put("getC_no", cardDto.getC_no());
        map.put("getCnt_task", cardDto.getC_cnt_task());
        return map;
    }

    @PostMapping("/cardInfoByCNo")
    public Object cardInfoByCNo(@RequestBody Map<String, Object> msgMap, CardDto cardDto){
        log.info("cardInfoByCNo");

        Map<String, Object> map = new HashMap<>();
        cardDto = cardService.getCardInfoByCNo(msgMap, cardDto);

        map.put("cardDto", cardDto);

        return map;
    }

    @PostMapping("/cardInfoModifyByCNo")
    public String cardInfoModifyByCNo(@RequestBody Map<String, Object> msgMap, CardDto cardDto){
        log.info("cardInfoModifyByCNo");

        int result = -1;
        result = cardService.cardInfoModifyByCNo(msgMap, cardDto);

        if(result > 0){
            log.info("CARD INFO MODIFY SUCCESS");

            return "1";
        } else {
            log.info("CARD INFO MODIFY FAIL");

            return "0";
        }
    }

    @PostMapping("/card_delete")
    public String cardDelete(@RequestBody Map<String, Object> msgMap, CardDto cardDto){
        log.info("cardDelete");

        int result = -1;
        result = cardService.cardDelete(msgMap, cardDto);

        if(result > 0){
            log.info("CARD DELETE SUCCESS");
            return "1";
        } else {
            log.info("CARD DELETE FAIL");
            return "0";
        }

    }
}
