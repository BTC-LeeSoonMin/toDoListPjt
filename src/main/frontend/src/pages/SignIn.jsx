// import React, { useEffect, useState } from 'react';
// import Input from '@mui/joy/Input';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/joy/Typography';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import { loginedAdminState } from '../atom/LoginSession'
// import { useRecoilState } from 'recoil';


// const SignIn = () => {
//     const [memberId, setMemberId] = useState("");
//     const [memberPw, setMemberPw] = useState("");
//     const [accessToken, setAccessToken] = useRecoilState(loginedAdminState);
//     const navigate = useNavigate();

//     let config = {
//         headers: {
//             'Content-Type': 'application/json; charset=utf-8'
//         }
//     };

//     // axios.interceptors.request.use(
//     //     function (config) {
//     //         console.log("config1 : ", config);
//     //         const refreshToken = localStorage.getItem("refreshToken");
//     //         console.log("refreshToken1 : ", refreshToken);
//     //         console.log("accessToken1 : ", accessToken);

//     //         //요청시 AccessToken 계속 보내주기
//     //         if (!accessToken) {
//     //             console.log("!accessToken");
//     //             config.headers.accessToken = null;
//     //             config.headers.refreshToken = null;
//     //             return config;
//     //         }

//     //         if (config.headers && accessToken) {
//     //             console.log("config.headers && accessToken");
//     //             config.headers.authorization = `Bearer ${accessToken}`;
//     //             config.headers.refreshToken = `Bearer ${refreshToken}`;
//     //             return config;
//     //         }
//     //         // Do something before request is sent
//     //         console.log("request start", config);
//     //     },
//     //     function (error) {
//     //         // Do something with request error
//     //         console.log("request error", error);
//     //         return Promise.reject(error);
//     //     }
//     // );

//     // // Add a response interceptor
//     // axios.interceptors.response.use(
//     //     function (response) {
//     //         // Any status code that lie within the range of 2xx cause this function to trigger
//     //         // Do something with response data
//     //         console.log("get response", response);
//     //         return response;
//     //     },
//     //     async (error) => {
//     //         const {
//     //             config,
//     //             response: { status },
//     //         } = error;
//     //         if (status === 401) {
//     //             if (error.response.data.message === "expired") {
//     //                 const originalRequest = config;
//     //                 const refreshToken = await localStorage.getItem("refreshToken");
//     //                 // token refresh 요청
//     //                 const { data } = await axios.post(
//     //                     `/api/member/refreshToken`, // token refresh api
//     //                     {},
//     //                     { headers: { authorization: `Bearer ${refreshToken}` } }
//     //                 );
//     //                 // 새로운 토큰 저장
//     //                 console.log("만료 후 재발급받은 토큰 : ", data.data.accessToken);
//     //                 // setLoginSession(data.data.accessToken);
//     //                 const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;
//     //                 await localStorage.multiSet([
//     //                     ["accessToken", newAccessToken],
//     //                     ["refreshToken", newRefreshToken],
//     //                 ]);
//     //                 originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
//     //                 // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
//     //                 return axios(originalRequest);
//     //             }
//     //         }
//     //         // Any status codes that falls outside the range of 2xx cause this function to trigger
//     //         // Do something with response error
//     //         console.log("response error", error);
//     //         return Promise.reject(error);
//     //     }
//     // )

//     const cardStyle = {
//         display: 'flex',
//         alignItems: 'center',
//         flexDirection: 'column'
//         // 기타 원하는 CSS 속성을 여기에 추가할 수 있습니다.
//     };
//     const buttonStyle = {
//         display: 'flex',
//         justifyContent: 'center',
//         marginBottom: "10px"
//     }
    
//     const buttonClickHendler = async (str) => {
//         console.log("[CardModify] buttonClickHendler");


//         let msgData = {};
//         let refToken = "";

//         switch (str) {
//             case ("signIn"):
//                 console.log('signIn hello');

//                 msgData = {
//                     "m_id": memberId,
//                     "m_pw": memberPw,

//                 }
//                 axios.post("/api/member/sign_in",
//                     JSON.stringify(msgData),
//                     config,
//                 )
//                     .then(response => {
//                         console.log("signIn result : ", response.data);
//                         if (response.data != "") {
//                             alert("로그인 성공");
//                             refToken = response.data.ACREToken.refreshToken;

//                             setAccessToken(response.data.ACREToken.accessToken);
//                             window.localStorage.setItem("refreshToken", refToken);

//                             navigate("/");
//                         } else {
//                             alert("로그인 실패");

//                         }
//                     })
//                     .catch(error => console.log(error))
//                 break;
//             case ("cancel"):
//                 console.log('cancel hello');

//                 break;
//         }
//     }

//     return (

//         <div >
//             <Typography level="h1" align="center" sx={{ mt: 2 }}>로그인</Typography>
//             <div style={cardStyle}>
//                 <Card sx={{ maxWidth: 400, minWidth: 400, mt: 1.5, mb: 1.5 }}>
//                     <CardContent>
//                         <Box sx={{ flexGrow: 1, mb: 1.5 }}>
//                             <Grid container spacing={1}>
//                                 <Grid item xs>
//                                     <Input name="id" placeholder='input member ID' onChange={(e) => setMemberId(e.target.value)} value={memberId || ''} />
//                                     <Input name="pw" type="password" placeholder='input member PW' onChange={(e) => setMemberPw(e.target.value)} value={memberPw || ''} />
//                                 </Grid>
//                             </Grid>
//                         </Box>

//                     </CardContent>
//                 </Card>
//             </div>
//             <span style={buttonStyle}>
//                 <Button variant="outlined" color="success" onClick={() => buttonClickHendler('signIn')}>로그인</Button> &nbsp; &nbsp;
//                 <Button variant="outlined" color="error" onClick={() => buttonClickHendler('cancel')}>취소</Button>
//             </span>
//         </div>
//     );
// }

// export default SignIn;
// // export {SignIn, api};

import React, { useEffect, useState } from 'react';
import Input from '@mui/joy/Input';
import axios from "axios";
import api from "../components/JWT";
import { useNavigate } from "react-router-dom";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/joy/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { loginedAdminState } from '../atom/LoginSession'
import { useRecoilState } from 'recoil';


const SignIn = () => {
    const [memberId, setMemberId] = useState("");
    const [memberPw, setMemberPw] = useState("");
    const [accessToken, setAccessToken] = useRecoilState(loginedAdminState);
    const navigate = useNavigate();

    let config = {
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
        console.log("[SignIn] buttonClickHendler");


        let msgData = {};
        let refToken = "";

        switch (str) {
            case ("signIn"):
                console.log('signIn hello');

                msgData = {
                    "m_id": memberId,
                    "m_pw": memberPw,

                }
                api.post("/api/member/sign_in",
                    JSON.stringify(msgData),
                    config,
                )
                    .then(response => {
                        console.log("signIn result : ", response.data);
                        if (response.data != "") {
                            alert("로그인 성공");
                            refToken = response.data.ACREToken.refreshToken;

                            setAccessToken(response.data.ACREToken.accessToken);
                            window.localStorage.setItem("refreshToken", refToken);

                            navigate("/");
                        } else {
                            alert("로그인 실패");

                        }
                    })
                    .catch(error => console.log(error))
                break;
            case ("cancel"):
                console.log('cancel hello');

                break;
        }
    }

    return (

        <div >
            <Typography level="h1" align="center" sx={{ mt: 2 }}>로그인</Typography>
            <div style={cardStyle}>
                <Card sx={{ maxWidth: 400, minWidth: 400, mt: 1.5, mb: 1.5 }}>
                    <CardContent>
                        <Box sx={{ flexGrow: 1, mb: 1.5 }}>
                            <Grid container spacing={1}>
                                <Grid item xs>
                                    <Input name="id" placeholder='input member ID' onChange={(e) => setMemberId(e.target.value)} value={memberId || ''} />
                                    <Input name="pw" type="password" placeholder='input member PW' onChange={(e) => setMemberPw(e.target.value)} value={memberPw || ''} />
                                </Grid>
                            </Grid>
                        </Box>

                    </CardContent>
                </Card>
            </div>
            <span style={buttonStyle}>
                <Button variant="outlined" color="success" onClick={() => buttonClickHendler('signIn')}>로그인</Button> &nbsp; &nbsp;
                <Button variant="outlined" color="error" onClick={() => buttonClickHendler('cancel')}>취소</Button>
            </span>
        </div>
    );
}

export default SignIn;
// export {SignIn, api};

