package com.office.todolist.member;

import java.util.Map;

public interface IMemberService {

    public int memberSignUp(Map<String, Object> msgMap, MemberDto memberDto);

    public Map<String, Object> memberSignIn(Map<String, Object> msgMap, MemberDto memberDto);
}
