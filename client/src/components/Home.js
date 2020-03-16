import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import SwipeCard from './SwipeCard';
import Menubar from './Menubar';

class Home extends Component {
    render() {
        return(
            <Grid 
                container 
                spacing={0} 
                alignItems="center"
                justify="center"
                style={{ height: '100vh' }}
            >
                {/* <Grid item align="center"> */}
                    <Menubar />
                    <SwipeCard />
                {/* </Grid> */}
            </Grid>

        );
    }
}

export default Home;