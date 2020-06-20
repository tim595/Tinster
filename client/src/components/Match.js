import React, { Component } from 'react';
import { Grid, Avatar, Typography } from '@material-ui/core';


class Match extends Component {
    render() {
        const { matchedUser } = this.props;
        return(
            <>
                <Grid item>
                    <p className="match_text">Your Matches ❤</p>
                </Grid>
                <Grid container alignItems="center" justify="center">
                    <Avatar className="matchAvatar" src={matchedUser.image}/>
                    <Typography variant="h4" style={{marginLeft: '20px'}}>
                        <b>{matchedUser.username}</b>, {matchedUser.gender}
                    </Typography>
                </Grid>
            </>
        );
    }
}

export default Match;