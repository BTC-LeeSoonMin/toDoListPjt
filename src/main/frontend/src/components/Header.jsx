import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { loginedAdmin } from '../atom/LoginSession'
import { useRecoilState } from 'recoil';
import { Button } from '@mui/joy';

const SIGN_IN_FAIL = 0;

const Header = () => {
    const [loginSession, setLoginSession] = useRecoilState(loginedAdmin);

    const buttonClickHendler = async (str) => {
        console.log("[CardModify] buttonClickHendler");
        let msgData = {};

        switch (str) {

            case ("SignOut"):
                console.log('SignOut hello');

                setLoginSession(null);

                break;
        }
    }

    return (
        
        <header>
            <p>{loginSession}</p>
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
                            <Link href="/" underline="none" color="inherit">{"To Do List"} </Link>
                        </Typography>
                        {
                            loginSession != null ? 
                                                
                                            <>
                                                <Button variant="outlined" color="error" onClick={() => buttonClickHendler('SignOut')}>SignOut</Button>
                                            </>
                                                
                                              : 
                                            <>
                                                <Link href="/member/sign_up" underline="none" color="inherit">{"SignUp"} </Link> &nbsp;
                                                <Link href="/member/sign_in" underline="none" color="inherit">{"SignIn"} </Link>
                                             </>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    );
}

export default Header;