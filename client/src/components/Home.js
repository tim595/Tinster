import React, { Component } from 'react';
// import { Grid } from '@material-ui/core';
import SwipeCard from './SwipeCard';
import Menubar from './Menubar';
import ProfileCard from './ProfileCard';


class Home extends Component {
    render() {
        return(
            <div className="homeDiv">
                <Menubar />
                <div style={{visibility: 'hidden', flex:1 }}>
                </div>
                <div style={{ flex:1, margin: '5em' }}>
                    <SwipeCard />
                </div>
                <div style={{ flex:1, margin: '5em' }}>
                    <ProfileCard />
                </div>
            </div>
        )
    }
}

export default Home;