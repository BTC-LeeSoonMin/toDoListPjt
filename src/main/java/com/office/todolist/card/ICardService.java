package com.office.todolist.card;

import java.util.List;
import java.util.Map;

public interface ICardService {

    public int cardInsert(Map<String, Object> msgMap, CardDto cardDto);
    public List<CardDto> cardAllList();

}
