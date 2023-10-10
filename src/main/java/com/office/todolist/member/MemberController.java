package com.office.todolist.member;

import com.office.todolist.security.SecurityController;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Log4j2
@RestController
@RequestMapping("/api/member")
public class MemberController {

    private final static int SIGN_UP_SUCCESS = 1;
    private final static int SIGN_UP_FAIL = 0;

    @Autowired
    MemberService memberService;



    @PostMapping("/sign_up")
    public int memberSignUp(@RequestBody Map<String, Object> msgMap, MemberDto memberDto) {
        log.info("memberSignUp");

        int result = -1;
        result = memberService.memberSignUp(msgMap, memberDto);
        if (result > 0) {
            log.info("SIGNUP SUCCESS");

            return SIGN_UP_SUCCESS;

        } else {
            log.info("SIGNUP FAIL");

            return SIGN_UP_FAIL;
        }

    }

    @PostMapping("/sign_in")
    public Map<String, Object> memberSignIn(@RequestBody Map<String, Object> msgMap, MemberDto memberDto){
        log.info("memberSignIn");

        return memberService.memberSignIn(msgMap, memberDto);

    }

    @PostMapping("/refreshToken")
    public Map<String, Object> refreshToken(@RequestBody Map<String, Object> msgMap) {
        log.info("refrashToken");

        return memberService.refreshToken(msgMap);

    }

}
