package com.office.todolist.card;

import lombok.Data;

@Data
public class CardDto {

    private int     c_no;
    private String  c_use_yn;
    private String  c_title;
    private String  c_body;
    private int     c_cnt_task;
    private int     c_pin;
    private String  c_reg_date;
    private String  c_mod_date;

}
