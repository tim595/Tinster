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

            newUser: {},
            userAvailable: false,
            
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

        const response = await getNewUser(this.state.username, likesDislikes, this.state.selectedPreference);
        if(response.success) {
            let newUser = response.newUser;
            if (!newUser) {
                this.setState({
                    userAvailable: false
                })
            } else {
                newUser.age = this.calcAge(newUser.birthday);
                this.setState({
                    newUser: newUser,
                    userAvailable: true
                })
            }
        }else {
            console.log(response);
            // this.setState({ 
            //      snackbarOpen: true,
            //      snackbarMessage: "A MongoDB-Server error occurred"
            // })
        }
    }

    getUpdatedLikeDislike = (array) => {
        let likesDislikes = this.state.likes.concat(this.state.dislikes)
        this.setState({
            likesDislikes: likesDislikes
        })
    }

    updateLikes = (username) => {
        let likes = this.state.likes;
        likes.push(username);
        this.setState({
            likes: likes
        })
    }

    updateDislikes = (username) => {
        let dislikes = this.state.dislikes;
        dislikes.push(username);
        this.setState({
            dislikes: dislikes
        })
    }

    calcAge = (birthday) => {
        let date = new Date(birthday);
        let milliMonth = 1000 * 60 * 60 * 24 * 30.42;
        let ageInMonth = (new Date() - date) / milliMonth;
        
        return Math.floor(ageInMonth);
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
                    <SwipeCard userAvailable={this.state.userAvailable}
                        updateLikes={this.updateLikes} 
                        updateDislikes={this.updateDislikes} 
                        newUser={ this.state.newUser } 
                        getNewProfile={this.getNewProfile} 
                        triggerProfile={this.triggerProfile}
                    />
                </div>
                <div style={{ flex:1, margin: '5em 0 5em 1em' }}>
                    <ProfileCard newUser={ this.state.newUser } showProfile={this.state.showProfile} />
                </div>
            </div>
        )
    }
}

export default Home;