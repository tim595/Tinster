import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Match from './Match'
import Menubar from './Menubar';
import { receiveData } from '../actions/changeSettings';





class MatchPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            matchedUser: {}
        }
    }

    componentDidMount = async () => {
        const username = await localStorage.getItem("username");
        const profileData = await receiveData(username)
        this.setState({
            matchedUser: profileData.res
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
                <Match matchedUser={ this.state.matchedUser } item/>
            </Grid>
            
        );
    }
}

export default MatchPage;