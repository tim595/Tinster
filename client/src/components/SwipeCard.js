import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import '../css/App.css';

class SwipeCard extends Component {
    render() {
        return(
            <Paper className="swipePaper">
                <Grid 
                className="swipeContainer">
                    <span class="helper"></span>
                    <img src="https://source.unsplash.com/300x400/?hamster"></img>
                </Grid>
               
            </Paper>
        );
    }
}

export default SwipeCard;
