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

    @Override
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

    @Override
    public CardDto getCardInfoByCNo(Map<String, Object> msgMap, CardDto cardDto) {
        log.info("getCardInfoByCNo");

        cardDto.setC_no(Integer.parseInt(msgMap.get("c_no").toString()));

        return iCardDaoMapper.selectCardByCNo(cardDto);
    }

    @Override
    public int cardInfoModifyByCNo(Map<String, Object> msgMap, CardDto cardDto) {
        log.info("cardInfoModifyByCNo");

        cardDto.setC_no(Integer.parseInt(msgMap.get("c_no").toString()));
        cardDto.setC_title(msgMap.get("c_title").toString());
        cardDto.setC_body(msgMap.get("c_body").toString());


        return iCardDaoMapper.updateCardInfoByCNo(cardDto);
    }

    @Override
    public int cardDelete(Map<String, Object> msgMap, CardDto cardDto) {
        log.info("cardDelete");

        cardDto.setC_no(Integer.parseInt(msgMap.get("c_no").toString()));

        return iCardDaoMapper.deleteCard(cardDto);
    }

    @Override
    public int cardPin(Map<String, Object> msgMap, CardDto cardDto) {
        log.info("cardPin");

        cardDto.setC_no(Integer.parseInt(msgMap.get("c_no").toString()));

        // 고정 된 카드인지 확인하기 위한 c_pin 현재 값 check
        cardDto = iCardDaoMapper.selectCardByCNo(cardDto);

        if(cardDto != null){
            if (cardDto.getC_pin() == 0) {
                log.info("1111> {}", iCardDaoMapper.updateCardPinUp(cardDto));
                return 1;

            } else {
                log.info("2222> {}", iCardDaoMapper.updateCardPinDown(cardDto));
                return 1;
            }
        } else {
            return 0;
        }
    }
}
