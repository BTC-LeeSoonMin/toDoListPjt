import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';



const Footer = () => {


    return(
        <footer>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                       
                        <Typography variant="body2" component="div" align="center" sx={{ flexGrow: 1 }}>
                        Copyright © ToDoList Corp. All Rights Reserved.
                        </Typography>
                        
                    </Toolbar>
                </AppBar>
            </Box>
        </footer>
    );
}

export default Footer;