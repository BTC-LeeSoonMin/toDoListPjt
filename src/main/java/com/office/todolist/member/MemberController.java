package com.office.todolist.member;

import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@Log4j2
@RestController
@RequestMapping("/api/member")
public class MemberController {

    @GetMapping("/token_api")
    public void tokenApi(){
        log.info("tokenApi");

    }

}
