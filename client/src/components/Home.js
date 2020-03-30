import React, { Component } from 'react';
// import { Grid } from '@material-ui/core';
import SwipeCard from './SwipeCard';
import Menubar from './Menubar';
import ProfileCard from './ProfileCard';


class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            showProfile: false
        }
    }
    triggerProfile = () => {
        this.setState({showProfile: !this.state.showProfile})
    }
    render() {
        return(
            <div className="homeDiv">
                <Menubar />
                <div className="hiddenDiv" style={{visibility: 'hidden', flex:1 }}>
                </div>
                <div className="swipeCardDiv">
                    <SwipeCard triggerProfile={this.triggerProfile}/>
                </div>
                <div style={{ flex:1, margin: '5em 0 5em 1em' }}>
                    <ProfileCard showProfile={this.state.showProfile} />
                </div>
            </div>
        )
    }
}

export default Home;