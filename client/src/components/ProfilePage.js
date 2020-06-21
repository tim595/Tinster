import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import ProfileCard from './ProfileCard';
import Menubar from './Menubar';
import { receiveData } from '../actions/changeSettings';





class ProfilePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            userProfile: {}
        }
    }

    calcAge = (birthday) => {
        let date = new Date(birthday);
        let milliMonth = 1000 * 60 * 60 * 24 * 30.42;
        let ageInMonth = (new Date() - date) / milliMonth;
        
        return Math.floor(ageInMonth);
    }

    componentDidMount = async () => {
        const username = await localStorage.getItem("username");
        const profileData = await receiveData(username)
        profileData.res.age = this.calcAge(profileData.res.birthday)
        this.setState({
            userProfile: profileData.res
        })

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
                <ProfileCard newUser={ this.state.userProfile } item showProfile={ true }/>
            </Grid>
            
        );
    }
}

export default ProfilePage;