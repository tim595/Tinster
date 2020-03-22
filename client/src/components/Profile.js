import React, { Component } from 'react';
import { Grid, Paper, Avatar, Typography } from '@material-ui/core';
import CakeIcon from '@material-ui/icons/Cake';
import DescriptionIcon from '@material-ui/icons/Description';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';


class Profile extends Component {
    render() {
        return(
            <Grid 
                container 
                spacing={0} 
                alignItems="center"
                justify="center"
                style={{ height: '100vh' }}
            >
            <Paper className="swipePaper">
                <Grid container style={{margin: 0}} spacing={3}>
                    <Grid style={{height: 'fit-content'}} item xs={12}>
                        <Avatar className="profileAvatar" src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"/>
                        <Typography style={{textAlign: 'center', marginTop:'10px'}} variant="h3">
                            <b>Freddy</b>, 14
                        </Typography>
                    </Grid>
                    <Grid item style={{ marginLeft: '1em', marginTop: '-4em'}} xs={6}>
                        <Typography variant="h6">
                            <CakeIcon className="profileIcon"/>14 Month
                        </Typography>
                        <Typography variant="h6" style={{marginTop: '1em'}}>
                            <HomeIcon className="profileIcon"/>1st St., Wakanda
                        </Typography>
                        <Typography variant="h6" style={{marginTop: '1em'}}>
                            <FavoriteIcon className="profileIcon"/>Female
                        </Typography>
                    </Grid>
                    <Grid item xs={5} style={{marginTop: '-4em'}}>
                        <Typography variant="h6">
                            <DescriptionIcon className="profileIcon"/><b>Description</b>
                            <p style={{fontSize: '18px', textAlign: 'justify'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </Typography>
                    </Grid>
                    
                </Grid>
            </Paper>
            </Grid>

        );
    }
}

export default Profile;