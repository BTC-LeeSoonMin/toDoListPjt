package com.office.todolist.card;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Log4j2
@Service
public class CardService implements ICardService{

    @Autowired
    ICardDaoMapper iCardDaoMapper;

    @Override
    public int cardInsert(Map<String, Object> msgMap, CardDto cardDto) {
        log.info("cardInsert");

        cardDto.setC_title(msgMap.get("title").toString());
        cardDto.setC_body(msgMap.get("body").toString());

        return iCardDaoMapper.insertCardData(cardDto);
    }

    @Override
    public List<CardDto> cardAllList() {
        log.info("cardAllList");

        return iCardDaoMapper.selectAllCard();
    }

    public CardDto getCntTask(Map<String, Object> msgMap, CardDto cardDto) {
        log.info("getCntTask");

        cardDto.setC_no(Integer.parseInt(msgMap.get("c_no").toString()));
        int result = -1;
        result = iCardDaoMapper.updateCntTask(cardDto);
        if(result > 0){
                log.info("CntTask Update Success");
                cardDto = iCardDaoMapper.selectCntTask(cardDto);
            return cardDto;
        } else {
            log.info("CntTask Update Fail");
            return null;
        }

    }
}
