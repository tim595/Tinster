import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Box from '@material-ui/core/Box';
import SettingsIcon from '@material-ui/icons/Settings';
import { navigate } from '@reach/router';


class Menubar extends Component {
    render() {
        return (
            <AppBar /* position="static" //eventuell bei mobile nutzen */ title="Tinster" style={{ background: 'lightblue' }}>
                <Toolbar>
                    <div style={{ width: '100%' }}>
                        <Box display="flex">    
                            <Box display="flex" justifyContent="flex-start" style={{ width: '33.33%'}}>
                                <IconButton color="inherit" aria-label="menu" onClick={() => navigate("/settings")}>
                                    <SettingsIcon />
                                </IconButton>
                            </Box>
                            <Box display="flex" justifyContent="center" style={{ width: '33.33%'}}>
                                <Typography variant="h5" style={{fontFamily: 'chaletmedium', fontSize: '40px'}}>
                                    tinster
                                </Typography>
                            </Box>
                            <Box display="flex" justifyContent="flex-end" style={{ width: '33.33%'}}>
                                <IconButton color="inherit" aria-label="account of current user" aria-controls="menu-appbar" onClick={() => navigate("/profile")}>
                                    <AccountCircle />
                                </IconButton>
                            </Box>
                        </Box>
                    </div>
                </Toolbar>
            </AppBar>
      )
    }
  }

  export default Menubar;
