import React, { Component } from 'react';
// import { Grid } from '@material-ui/core';
import SwipeCard from './SwipeCard';
import Menubar from './Menubar';
import ProfileCard from './ProfileCard';
import { receiveData } from '../actions/changeSettings';
import { getNewUser } from '../actions/swipe';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            showProfile: false,
            
            username: "",
            likes: [],
            dislikes: [],
            selectedPreference: [],
            
            loading: false
        }
    }
    triggerProfile = () => {
        this.setState({showProfile: !this.state.showProfile})
    }

    getUser = async () => {
        let response = await receiveData(localStorage.getItem("username"));
        if(response.success) {
            this.setState({
                username: response.res.username,
                likes: response.res.likes,
                dislikes: response.res.dislikes,                
                selectedPreference: response.res.preference
            })
        } else {
            // this.setState({ 
            //     snackbarOpen: true,
            //     snackbarMessage: "A MongoDB-Server error occurred"
            //  })
        }
    }

    getNewProfile = async () => {
        let likesDislikes = this.state.likes.concat(this.state.dislikes);

        let newUser = await getNewUser(this.state.username, likesDislikes, this.state.selectedPreference);
    }

    componentDidMount = () => {
        this.getUser().then(() => {
            this.getNewProfile();
        });
    }

    render() {
        return(
            <div className="homeDiv">
                <Menubar />
                <div className="hiddenDiv" style={{visibility: 'hidden', flex:1 }}>
                </div>
                <div className="swipeCardDiv">
                    <SwipeCard getNewProfile={this.getNewProfile} triggerProfile={this.triggerProfile}/>
                </div>
                <div style={{ flex:1, margin: '5em 0 5em 1em' }}>
                    <ProfileCard showProfile={this.state.showProfile} />
                </div>
            </div>
        )
    }
}

export default Home;