import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

class Home extends Component {
    render() {
        return(
            <Grid 
                container 
                spacing={0} 
                direction="column"
                // alignItems="center"
                justify="center"
                style={{ minHeight: '80vh' }}
            >
                <Grid item align="center">
                    <img alt="hamster_logo" className="hamster_logo" src="https://cdn2.iconfinder.com/data/icons/animals-nature-2/50/1F439-hamster-512.png"/>
                </Grid>
                <Grid item align="center">
                    <p className="logo_text">Logged in ❤</p>
                </Grid>
            </Grid>

        );
    }
}

export default Home;