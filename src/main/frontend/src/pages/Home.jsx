import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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

function Home() {
    const [cardList, setCardList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [updateState, setUpdateState] = useState(0);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [cntTask, setCntTask] = useState(1);
    const [cntPin, setCntPin] = useState(0);
    const navigate = useNavigate();

    const config = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    };

    useEffect(() => {
        console.log("[Home] useEffect!!");
        console.log("cntTask1 : ", cntTask);

        axios.get("/api/card/cardAllList",
            config,
        )
            .then(response => {
                // console.log(response.data)
                setCardList(response.data);
                setIsLoading(false);
            }
            )
            .catch(error => console.log(error))

    }, [cntTask, updateState]);

    if (isLoading) {
        // 데이터가 로딩 중인 동안 보여줄 컴포넌트나 로딩 스피너 등을 렌더링
        return <h1>Loading...</h1>;
    }

    const cardStyle = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
        // 기타 원하는 CSS 속성을 여기에 추가할 수 있습니다.
    };

    const iconClickHendler = async (str, cNo) => {
        console.log("[Home] iconClickHendler");
        let msgData = {};

        switch (str) {
            case ("insert"):
                console.log('insert hello');

                msgData = {
                    "title": title,
                    "body": body,
                }
                await axios.post("/api/card/insert",
                    JSON.stringify(msgData),
                    config,
                )
                    .then(response => {
                        console.log("hle : " + response.data)
                        if (response.data === 1) {
                            alert("글 작성에 성공했습니다.")
                            setTitle("");
                            setBody("");
                            setUpdateState(updateState + 1);
                        } else {
                            alert("글 작성에 실패했습니다.")
                        }
                    })
                    .catch(error => console.log(error))
                break;
            case ("taskTogle"):
                console.log('taskTogle hello')
                msgData = {
                    "c_no": cNo,
                }
                await axios.post("/api/card/getCntTask",
                    msgData,
                    config,
                )
                    .then(response => {
                        setCntTask(response.data.getCnt_task)
                    }
                    )
                    .catch(error => console.log(error))
                break;
            case ("pin"):
                console.log('pin hello')
                // setCntPin(cntPin + 1)
                break;
            case ("edit"):
                console.log('edit hello')
                navigate("/card/card_modify/" + cNo);

                break;
            case ("delete"):
                console.log('delete hello');
                msgData = {
                    "c_no": cNo,
                }
                if (window.confirm("정말 삭제 하시겠습니까?")) {
                    await axios.post("/api/card/card_delete",
                        msgData,
                        config,
                    )
                        .then(response => {
                            console.log(response.data);
                            setUpdateState(updateState + 1);
                        }
                        )
                        .catch(error => console.log(error))
                } else {
                    alert("삭제를 취소 하셨습니다.")
                }

                break;
        }
    }

    return (
        <div style={cardStyle}>
            {
                console.log("return TP")
            }
            <div>
                <Card sx={{ maxWidth: 400, minWidth: 400, mt: 1.5, mb: 1.5 }}>
                    <CardContent>
                        <Box sx={{ flexGrow: 1, mb: 1.5 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={10.5}>
                                    <Input name="title" placeholder='  Input title' onChange={(e) => setTitle(e.target.value)} value={title} />
                                </Grid>
                                <Grid item xs={1}>
                                    <CreateOutlinedIcon onClick={() => iconClickHendler('insert')} sx={{ "&:hover": { cursor: "pointer" } }} />
                                </Grid>
                            </Grid>
                        </Box>
                        <Textarea minRows={2} name="body" placeholder="What's your task?" onChange={(e) => setBody(e.target.value)} value={body} />
                    </CardContent>
                </Card>
            </div>
            {
                cardList.map((item, key) => (
                    <div key={key}>
                        <Card sx={{ maxWidth: 400, minWidth: 400, mt: 1.5, mb: 1.5 }}>
                            <CardContent>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={10.7} sx={{ borderBottom: 1, mb: 1 }}>
                                            {item.c_reg_date}
                                        </Grid>
                                        <Grid item xs={1.3} sx={{ borderBottom: 1, mb: 1 }}>
                                            {
                                                item.c_cnt_task % 2 === 0 ?
                                                    <EditAttributesOutlinedIcon onClick={() => iconClickHendler('taskTogle', item.c_no)} sx={{ "&:hover": { cursor: "pointer" } }} />
                                                    : <EditAttributesIcon onClick={() => iconClickHendler('taskTogle', item.c_no)} sx={{ "&:hover": { cursor: "pointer" } }} />
                                            }
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Typography variant="h5" component="div">
                                                {item.c_title}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            {
                                                item.c_pin % 2 === 0 ?
                                                    <PushPinOutlinedIcon onClick={() => iconClickHendler('pin')} sx={{ "&:hover": { cursor: "pointer" } }} />
                                                    : <PushPinIcon onClick={() => iconClickHendler('pin')} sx={{ "&:hover": { cursor: "pointer" } }} />
                                            }
                                            <EditIcon onClick={() => iconClickHendler('edit', item.c_no)} sx={{ "&:hover": { cursor: "pointer" } }} />
                                            <CloseIcon onClick={() => iconClickHendler('delete', item.c_no)} sx={{ "&:hover": { cursor: "pointer" } }} />
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Typography sx={{ mt: 1.5 }} color="text.secondary">
                                    {item.c_body}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                ))
            }
        </div>
    );
}

export default Home;