package com.office.todolist.security;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Log4j2
@RestController
@RequestMapping("/api/security")
public class SecurityController {
    @Autowired
    private SecurityService securityService;

//    @GetMapping("/create/token")
//    public Map<String, Object> createToken(@RequestParam(value = "subject") String subject){
//        log.info("createToken");
//        String token = securityService.createToken(subject, (2*1000*60));
//        Map<String, Object> map =new HashMap<>();
//        map.put("result", token);
//        return map;
//    }

//    @GetMapping("/get/subject")
//    public Map<String, Object> getSubject(@RequestParam(value = "token") String token) {
//        log.info("getSubject");
//        String subject = securityService.getSubject(token);
//        Map<String, Object> map =new HashMap<>();
//        map.put("result", subject);
//        return map;
//    }

    public Map<String, Object> createToken(String pw){
        log.info("createToken");
        String token = securityService.createToken(pw, (2*1000*60));
        Map<String, Object> map =new HashMap<>();
        map.put("result", token);
        return map;
    }

//    @GetMapping("/loginCheck")
//    public boolean loginCheck(@RequestParam(value = "token") String token) {
//        log.info("getSubject");
//
//        return securityService.loginCheck(token);
//
//    }
}
