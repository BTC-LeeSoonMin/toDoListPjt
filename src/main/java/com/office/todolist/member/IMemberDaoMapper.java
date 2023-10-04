package com.office.todolist.member;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IMemberDaoMapper {

    int insertMember(MemberDto memberDto);

}
