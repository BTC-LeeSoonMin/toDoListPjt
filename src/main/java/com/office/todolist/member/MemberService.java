package com.office.todolist.member;

import com.office.todolist.card.ICardDaoMapper;
import com.office.todolist.security.SecurityController;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Log4j2
@Service
public class MemberService implements IMemberService{

    @Autowired
    IMemberDaoMapper iMemberDaoMapper;

    @Autowired
    SecurityController securityController;

    @Override
    public int memberSignUp(Map<String, Object> msgMap, MemberDto memberDto) {
        log.info("memberSignUp");

        memberDto.setM_id(msgMap.get("m_id").toString());
        memberDto.setM_pw(msgMap.get("m_pw").toString());
        memberDto.setM_mail(msgMap.get("m_mail").toString());
        memberDto.setM_phone(msgMap.get("m_phone").toString());

        return iMemberDaoMapper.insertMember(memberDto);

    }

    @Override
    public Map<String, Object> memberSignIn(Map<String, Object> msgMap, MemberDto memberDto) {
        log.info("memberSignIn");

        Map<String, Object> map = new HashMap<>();

        memberDto.setM_id(msgMap.get("m_id").toString());
        memberDto.setM_pw(msgMap.get("m_pw").toString());

        memberDto = iMemberDaoMapper.selectMember(memberDto);

        if (memberDto != null) {
            log.info("SIGNIN SUCCESS");
            msgMap = securityController.createToken(msgMap.get("m_pw").toString());
            map.put("ACREToken", msgMap);
//            msgMap = securityController.refrashToken(msgMap.get("m_pw").toString());
//            map.put("refrashToken", msgMap);
            return map;

        } else {
            log.info("SIGNIN FAIL");

            return null;
        }

    }

    public Map<String, Object> refreshToken(Map<String, Object> msgMap) {
        log.info("refreshToken");

        Map<String, Object> map = new HashMap<>();
        msgMap = securityController.createToken(msgMap.get("m_pw").toString());
        map.put("refreshToken", msgMap);
        return map;
    }
}
