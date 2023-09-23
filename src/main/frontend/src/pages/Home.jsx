import React, { useState } from 'react';
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
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [cntTask, setCntTask] = useState(0);
    const [cntPin, setCntPin] = useState(0);

    const cardStyle = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
        // 기타 원하는 CSS 속성을 여기에 추가할 수 있습니다.
    };

    const iconClickHendler = async (str) => {
        console.log("[Home] iconClickHendler");
        switch (str) {
            case ("insert"):
                console.log('insert hello')
                // console.log(title)
                // console.log(body)

                const msgData = {

                    "title": title,
                    "body": body,
                }
                const config = {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                };
                await axios.post("/api/card/insert",
                    JSON.stringify(msgData),
                    config,
                )
                    .then(response => console.log(response.data))
                    .catch(error => console.log(error))
                break;
            case ("taskTogle"):
                console.log('taskTogle hello')
                setCntTask(cntTask + 1)
                break;
            case ("pin"):
                console.log('pin hello')
                setCntPin(cntPin + 1)
                break;
            case ("edit"):
                console.log('edit hello')
                break;
            case ("close"):
                console.log('close hello')
                break;
        }
    }

    return (
        <div style={cardStyle}>
            <div>
                <Card sx={{ maxWidth: 400, minWidth: 400, mt: 1.5, mb: 1.5 }}>
                    <CardContent>
                        <Box sx={{ flexGrow: 1, mb: 1.5 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={10.5}>
                                    <Input name="title" placeholder='  Input title' onChange={(e) => setTitle(e.target.value)} />
                                </Grid>
                                <Grid item xs={1}>
                                    <CreateOutlinedIcon onClick={() => iconClickHendler('insert')} sx={{ "&:hover": { cursor: "pointer" } }} />
                                </Grid>
                            </Grid>
                        </Box>
                        <Textarea minRows={2} name="body" placeholder="What's your task?" onChange={(e) => setBody(e.target.value)} />
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card sx={{ maxWidth: 400, minWidth: 400, mt: 1.5, mb: 1.5 }}>
                    <CardContent>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={0}>
                                <Grid item xs={10.7} sx={{ borderBottom: 1, mb: 1 }}>
                                </Grid>
                                <Grid item xs={1.3} sx={{ borderBottom: 1, mb: 1 }}>
                                    {
                                        cntTask % 2 === 0 ? <EditAttributesOutlinedIcon onClick={() => iconClickHendler('taskTogle')} />
                                            : <EditAttributesIcon onClick={() => iconClickHendler('taskTogle')} />
                                    }
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="h5" component="div">
                                        Heading1
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    {
                                        cntPin % 2 === 0 ? <PushPinOutlinedIcon onClick={() => iconClickHendler('pin')} sx={{ "&:hover": { cursor: "pointer" } }} />
                                            : <PushPinIcon onClick={() => iconClickHendler('pin')} sx={{ "&:hover": { cursor: "pointer" } }} />
                                    }
                                    <EditIcon onClick={() => iconClickHendler('edit')} sx={{ "&:hover": { cursor: "pointer" } }} />
                                    <CloseIcon onClick={() => iconClickHendler('close')} sx={{ "&:hover": { cursor: "pointer" } }} />
                                </Grid>
                            </Grid>
                        </Box>
                        <Typography sx={{ mt: 1.5 }} color="text.secondary">
                            1
                        </Typography>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}

export default Home;