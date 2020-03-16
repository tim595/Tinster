import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import '../css/App.css';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpIcon from '@material-ui/icons/Help';


class SwipeCard extends Component {
    render() {
        return(
            <Paper className="swipePaper">
                <Grid container direction="column" justify="center" alignItems="center">
                    <Grid className="swipeContainer">
                        <img src="https://source.unsplash.com/400x600/?hamster" alt="hamster_image"></img>
                    </Grid>
                    <Grid item>
                        <p className="nameTag">Freddy, 14 Month</p>
                    </Grid>
                    <Grid item className="swipeButtons">
                        <CheckCircleIcon className="cardIcons" style={{color:'lightgreen'}} />
                        <CancelIcon className="cardIcons" style={{color:'orange'}}/>
                        <HelpIcon className="cardIcons" style={{color:'lightblue'}} />
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default SwipeCard;
