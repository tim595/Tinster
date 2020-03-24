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
                <div classNae="hiddenDiv" style={{visibility: 'hidden', flex:1 }}>
                </div>
                <div className="swipeCardDiv">
                    <SwipeCard />
                </div>
                <div style={{ flex:1, margin: '5em 0 5em 1em' }}>
                    <ProfileCard />
                </div>
            </div>
        )
    }
}

export default Home;