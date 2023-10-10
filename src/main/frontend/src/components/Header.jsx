import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { loginedAdminState } from '../atom/LoginSession'
import { useRecoilState } from 'recoil';
import { Button } from '@mui/joy';
import { Link } from 'react-router-dom';

const Header = () => {
    const [accessToken, setAccessToken] = useRecoilState(loginedAdminState);
    // const [loginSession, setLoginSession] = useRecoilState(
    //     loginedAdminState,
    // );

    const buttonClickHendler = async (str) => {
        console.log("[CardModify] buttonClickHendler");
        let msgData = {};

        switch (str) {

            case ("SignOut"):
                console.log('SignOut hello');

                if (window.confirm("로그아웃을 원하십니까?")) {
                    setAccessToken(null);
                    localStorage.removeItem("refreshToken");

                }

                break;
        }
    }

    return (

        <header>
            <p>{accessToken}</p>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 1 }}
                        >
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to="/" >To Do List</Link>
                        </Typography>
                        {
                            accessToken != null ?

                                <>
                                    <Button variant="outlined" color="error" onClick={() => buttonClickHendler('SignOut')}>SignOut</Button>
                                    <Link to="/member/sign_up" >SignUp</Link> &nbsp;
                                </>

                                :
                                <>
                                    <Link to="/member/sign_up" >SignUp</Link> &nbsp;
                                    <Link to="/member/sign_in" >SignIn </Link>
                                </>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    );
}

export default Header;