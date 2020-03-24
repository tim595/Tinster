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
        let userName = 'freddy'; // eigene id/username aus der aktuellen session entnehmen
        let swipeID = uuidv4(); // soll später die id/username des angezeigten users zurückgeben

        let response = await like( userName, swipeID );
        if(response.success) {
            // irgendwas, um die nächste Swipecard zu zeigen
        } else {
            this.setState({ snackbarOpen: true });
        }
    };

    addDislike = async() => {
        let userName = 'freddy';
        let swipeID = uuidv4();

        let response = await  dislike( userName, swipeID );
        if(response.success) {

        } else {
            this.setState({ snackbarOpen: true});
        }
    };




    render() {
        return(
            <Paper className="swipePaper">
                <Grid container direction="column" justify="center" alignItems="center">
                    <Grid className="swipeContainer">
                        <img src="https://source.unsplash.com/400x600/?hamster" alt="hamster_image"></img>
                    </Grid>
                    <Grid item style={{  width:'80%', marginTop:'5px'}}>
                        <p className="nameTag">Freddy, 14 Month</p>
                    </Grid>
                    <Grid item className="swipeButtons">
                        <CheckCircleIcon className="cardIcons" style={{color:'lightgreen'}} />
                        <CancelIcon className="cardIcons" style={{color:'orangered'}}/>
                        <HelpIcon className="cardIcons" onClick={this.props.triggerProfile} style={{color:'lightblue'}} />
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
