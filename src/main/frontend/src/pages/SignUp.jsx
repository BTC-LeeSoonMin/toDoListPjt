import React, { useState } from 'react';
import Input from '@mui/joy/Input';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/joy/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';



const SignUp = () => {
    const [memberId, setMemberId] = useState("");
    const [memberPw, setMemberPw] = useState("");
    const [memberMail, setMemberMail] = useState("");
    const [memberPhone, setMemberPhone] = useState("");
    const navigate = useNavigate();

    const config = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    };

    const cardStyle = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
        // 기타 원하는 CSS 속성을 여기에 추가할 수 있습니다.
    };
    const buttonStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: "10px"
    }

    const buttonClickHendler = async (str) => {
        console.log("[CardModify] buttonClickHendler");
        let msgData = {};

        switch (str) {
            case ("signUp"):
                console.log('signUp hello');

                msgData = {
                    "m_id": memberId,
                    "m_pw": memberPw,
                    "m_mail": memberMail,
                    "m_phone": memberPhone,

                }
                await axios.post("/api/member/sign_up",
                    JSON.stringify(msgData),
                    config,
                )
                    .then(response => {
                        console.log("signUp result : "+response.data)
                        // if(response.data > 0 ){
                        //     alert("회원가입 성공");
                        //     navigate("/")
                        // } else {
                        //     alert("회원가입 실패");

                        // }
                    })
                    .catch(error => console.log(error))
                break;
            case ("cancel"):
                console.log('cancel hello');

                break;
        }
    }

    return(
        
        <div >
            <Typography level="h1" align="center" sx={{ mt: 2 }}>회원가입</Typography>
        <div style={cardStyle}>
            <Card sx={{ maxWidth: 400, minWidth: 400, mt: 1.5, mb: 1.5 }}>
                <CardContent>
                    <Box sx={{ flexGrow: 1, mb: 1.5 }}>
                        <Grid container spacing={1}>
                            <Grid item xs>
                                <Input name="id" placeholder='input member ID' onChange={(e) => setMemberId(e.target.value)} value={memberId || ''}/>
                                <Input name="pw" type="password" placeholder='input member PW' onChange={(e) => setMemberPw(e.target.value)} value={memberPw || ''}/>
                                <Input name="mail" placeholder='input member MAIL' onChange={(e) => setMemberMail(e.target.value)} value={memberMail || ''}/>
                                <Input name="phone" placeholder='input member PHONE' onChange={(e) => setMemberPhone(e.target.value)} value={memberPhone || ''}/>
                            </Grid>
                        </Grid>
                    </Box>
                    
                </CardContent>
            </Card>
        </div>
        <span style={buttonStyle}>
            <Button variant="outlined" color="success" onClick={() => buttonClickHendler('signUp')}>회원가입</Button> &nbsp; &nbsp;
            <Button variant="outlined" color="error" onClick={() => buttonClickHendler('cancel')}>취소</Button>
        </span>
    </div>
    );
}

export default SignUp;