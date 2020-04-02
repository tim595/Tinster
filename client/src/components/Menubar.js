import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from "react-router-dom";
import { logout } from '../actions/auth'; 


class Menubar extends Component {
    render() {
        return (
            <AppBar /* position="static" //eventuell bei mobile nutzen */ title="Tinster" style={{ background: 'lightblue' }}>
                <Toolbar>
                    <div style={{ width: '100%' }}>
                        <Box display="flex">    
                            <Box display="flex" justifyContent="flex-start" style={{ width: '33.33%'}}>
                                <Link style={{color: 'white'}} to="/settings">
                                    <IconButton color="inherit" aria-label="menu">
                                        <SettingsIcon />
                                    </IconButton>
                                </Link>
                            </Box>
                            <Box display="flex" justifyContent="center" style={{ width: '33.33%'}}>
                                <Link style={{color: 'white', textDecoration: 'none'}} to="/home">
                                    <Typography variant="h5" style={{fontFamily: 'chaletmedium', fontSize: '40px'}}>
                                        tinster
                                    </Typography>
                                </Link>
                            </Box>
                            <Box display="flex" justifyContent="flex-end" style={{ width: '33.33%'}}>
                                <Link style={{color: 'white'}} to="/profile">
                                    <IconButton color="inherit" aria-label="account of current user" aria-controls="menu-appbar">
                                        <AccountCircle />
                                    </IconButton>
                                </Link>
                                <Link style={{color: 'white'}} to="/">
                                    <IconButton color="inherit" aria-label="logout" aria-controls="menu-appbar" onClick={() => logout()}>
                                        <ExitToAppIcon />
                                    </IconButton>
                                </Link>
                            </Box>
                        </Box>
                    </div>
                </Toolbar>
            </AppBar>
      )
    }
  }

  export default Menubar;
