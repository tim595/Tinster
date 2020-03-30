import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import ProfileCard from './ProfileCard';
import Menubar from './Menubar';





class ProfilePage extends Component {
    render() {
        return(
            <Grid
            container 
            spacing={0} 
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
            >
                <Menubar />
                <ProfileCard item showProfile={ true }/>
            </Grid>
            
        );
    }
}

export default ProfilePage;