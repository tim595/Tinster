import React, { Component } from 'react';
import { Grid, Paper, Snackbar, IconButton } from '@material-ui/core';
import '../css/App.css';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpIcon from '@material-ui/icons/Help';
import CloseIcon from '@material-ui/icons/Close';
import { v4 as uuidv4 } from 'uuid';
import { like, dislike } from '../actions/likeDislike'

class SwipeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snackbarOpen: false
        }
    }

    handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ snackbarOpen: false });
      };

    addLike = async() => {
        let userName = localStorage.getItem("username");
        let swipeID = uuidv4(); // soll später die id/username des angezeigten users zurückgeben

        let response = await like( userName, swipeID );
        if(response.success) {
            this.props.getNewProfile();
        } else {
            this.setState({ snackbarOpen: true });
        }
    };

    addDislike = async() => {
        let userName = localStorage.getItem("username");
        let swipeID = uuidv4();

        let response = await  dislike( userName, swipeID );
        if(response.success) {
            this.props.getNewProfile();
        } else {
            this.setState({ snackbarOpen: true});
        }
    };






    render() {
        const { newUser, triggerProfile } = this.props;
        console.log(newUser.image === 'none'?"https://via.placeholder.com/400x600?text=NoImage":newUser.image);
        return(
            <Paper className="swipePaper">
                <Grid container direction="column" justify="center" alignItems="center">
                    <Grid className="swipeContainer">
                        <img src={newUser.image === 'none'?"https://source.unsplash.com/400x600/?hamster":newUser.image} alt="hamster_image"></img>
                    </Grid>
                    <Grid item style={{  width:'80%', marginTop:'5px'}}>
                        <p className="nameTag">{newUser.username + ", 14 Month"}</p>
                    </Grid>
                    <Grid item className="swipeButtons">
                            <CheckCircleIcon className="cardIcons" style={{color:'lightgreen'}} onClick={this.addLike} />
                            <CancelIcon className="cardIcons" style={{color:'orangered'}} onClick={this.addDislike}/>
                        <HelpIcon className="cardIcons" onClick={triggerProfile} style={{color:'lightblue'}} />
                    </Grid>
                    <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.snackbarOpen}
                    autoHideDuration={10000}
                    onClose={this.handleSnackClose}
                    message="A MongoDB-Server error occurred"
                    action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleSnackClose}>
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                    }
                />
                </Grid>
            </Paper>
        );
    }
}

export default SwipeCard;
