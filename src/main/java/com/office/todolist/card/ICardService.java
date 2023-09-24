package com.office.todolist.card;

import java.util.List;
import java.util.Map;

public interface ICardService {

    public int cardInsert(Map<String, Object> msgMap, CardDto cardDto);

    public List<CardDto> cardAllList();

    public CardDto getCntTask(Map<String, Object> msgMap, CardDto cardDto);

    public CardDto getCardInfoByCNo(Map<String, Object> msgMap, CardDto cardDto);

    public int cardInfoModifyByCNo(Map<String, Object> msgMap, CardDto cardDto);

}
