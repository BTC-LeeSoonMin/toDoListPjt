package com.office.todolist.card;

import com.office.todolist.member.MemberDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ICardDaoMapper {

    public int insertCardData(CardDto cardDto);

    List<CardDto> selectAllCard();

    int updateCntTask(CardDto cardDto);

    CardDto selectCntTask(CardDto cardDto);

    CardDto selectCardByCNo(CardDto cardDto);

    int updateCardInfoByCNo(CardDto cardDto);

    int deleteCard(CardDto cardDto);

    int updateCardPinUp(CardDto cardDto);

    int updateCardPinDown(CardDto cardDto);

}
