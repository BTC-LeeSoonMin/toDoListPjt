import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import EditAttributesOutlinedIcon from '@mui/icons-material/EditAttributesOutlined';
import EditIcon from '@mui/icons-material/Edit';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import Input from '@mui/material/Input';
import Textarea from '@mui/joy/Textarea';


export default function CardModify() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [cardInfo, setCardInfo] = useState([]);
    let { cNo } = useParams();
    const navigate = useNavigate();

    const config = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    };

    useEffect(() => {
        console.log("[CardModify] useEffect!!");
        console.log("cNo : ", cNo);
        let msgData = {};

        axios.post("/api/card/cardInfoByCNo",
        msgData = {
            "c_no": cNo,
        },
            config,
        )
            .then(response => {
                // console.log(response.data)
                setCardInfo(response.data.cardDto);
                // console.log(response.data.cardDto.c_title);
                // console.log(response.data.cardDto.c_body);
                setTitle(response.data.cardDto.c_title);
                setBody(response.data.cardDto.c_body);
            }
            )
            .catch(error => console.log(error))
        }, []);
    

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
            case ("modify"):
                console.log('modify hello');

                msgData = {
                    "c_no": cNo,
                    "c_title": title,
                    "c_body": body,
                }
                await axios.post("/api/card/cardInfoModifyByCNo",
                    JSON.stringify(msgData),
                    config,
                )
                    .then(response => {
                        // console.log(response.data)
                        if(response.data > 0 ){
                            alert("수정 성공");
                            navigate("/")
                        } else {
                            alert("수정 실패");

                        }
                    })
                    .catch(error => console.log(error))
                break;
            case ("delete"):
                console.log('delete hello');


                if (window.confirm("정말 삭제 하실건가요?")) {
                    alert("삭제 완료");

                } else {
                    alert("삭제 실패");

                }
                break;
        }
    }

    return (
        <div >
            <div style={cardStyle}>
                <Card sx={{ maxWidth: 400, minWidth: 400, mt: 1.5, mb: 1.5 }}>
                    <CardContent>
                        <Box sx={{ flexGrow: 1, mb: 1.5 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={10.5}>
                                    <Input name="title" placeholder='  Input title' onChange={(e) => setTitle(e.target.value)} value={title || ''}/>
                                </Grid>
                                <Grid item xs={1}>
                                </Grid>
                            </Grid>
                        </Box>
                        <Textarea minRows={2} name="body" placeholder="What's your task?" onChange={(e) => setBody(e.target.value)} value={body || ''}/>
                    </CardContent>
                </Card>
            </div>
            <span style={buttonStyle}>
                <Button variant="outlined" color="success" onClick={() => buttonClickHendler('modify')}>수정</Button> &nbsp; &nbsp;
                <Button variant="outlined" color="error" onClick={() => buttonClickHendler('delete')}>삭제</Button>
            </span>
        </div>
    );
}
