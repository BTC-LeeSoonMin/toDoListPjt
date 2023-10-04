package com.office.todolist.member;

import com.office.todolist.card.ICardDaoMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Log4j2
@Service
public class MemberService implements IMemberService{

    @Autowired
    IMemberDaoMapper iMemberDaoMapper;

    @Override
    public int memberSignUp(Map<String, Object> msgMap, MemberDto memberDto) {
        log.info("memberSignUp");

        memberDto.setM_id(msgMap.get("m_id").toString());
        memberDto.setM_pw(msgMap.get("m_pw").toString());
        memberDto.setM_mail(msgMap.get("m_mail").toString());
        memberDto.setM_phone(msgMap.get("m_phone").toString());

        return iMemberDaoMapper.insertMember(memberDto);

    }
}
