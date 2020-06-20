import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Match from './Match'
import Menubar from './Menubar';
import { receiveData } from '../actions/changeSettings';
import { getMatches } from '../actions/match';





class MatchPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            profileData: {},
            matchedUser: []
        }
    }

    componentDidMount = async () => {
        const username = await localStorage.getItem("username");
        const profileData = await receiveData(username);
        const matchedUser = await getMatches(username, profileData.res.likes);
        this.setState({
            profileData: profileData.res,
            matchedUser: matchedUser.matches
        });
    }
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
                <Grid item>
                    <p className="match_text">Your Matches ❤</p>
                    {this.state.matchedUser.length === 0?
                    <p className="match_text">No Matches Yet ☹</p>
                    : this.state.matchedUser.map((match, i) => <Match matchedUser={ match } key={i} />)}
                </Grid>
                {/* <Match matchedUser={ this.state.matchedUser } item/> */}
            </Grid>
            
        );
    }
}

export default MatchPage;