import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Menubar from './Menubar';
import CloseIcon from '@material-ui/icons/Close';
import { Paper, withStyles, Button, CircularProgress, IconButton, Snackbar, TextField } from '@material-ui/core';
import { MailOutline } from '@material-ui/icons';
import { receiveData, updateData } from '../actions/changeSettings';

const styles = theme => ({
    margin: {
        margin: theme.spacing(2),
    },
    padding: {
        padding: theme.spacing(1)
    },
});

class Settings extends Component {
    constructor(props){
        super(props);
        this.state = {
            emailInput: "",
            snackbarOpen: false,
            setValues : true
        }
    }

    
    handleChange = e => {
        console.log(e.target.name);
        this.setState({
            [e.target.name] : e.target.value 
        })
    }

    handleSubmit = async e => {
        e.preventDefault();
        
        let userName = 'freddy';
        let response = await updateData(userName, this.state.emailInput);
        if(response.success) {
            console.log("noice");
        }
        else {
            this.setState({ snackbarOpen: true })
        }
    }

    getCurrentData = async() => {
        let userName = 'freddy'; //später auf aktuellen User ändern
        let response = await receiveData(userName);

        if(response.success) {
            this.setState({
                emailInput: response.res.email
                
            })
        } else {
            this.setState({ snackbarOpen: true});
        }
    }

    render() {
        const classes = this.props;

        if(this.state.setValues) {
            this.getCurrentData()
            this.setState({ setValues : false })
        }

        return(
            <div className="settingsDiv">
                <Menubar />
                <Grid 
                container 
                spacing={0} 
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '80vh' }}
                >
                    <Grid item style={{ maxWidth: '500px', width: '100%'}}>
                        <Paper className={classes.padding}>
                            <form noValidate>
                                <div className={classes.margin}>
                                    <Grid container spacing={2} alignItems="flex-end">
                                        <Grid item>
                                            <MailOutline />
                                        </Grid>
                                        <Grid item xs>
                                            <TextField 
                                                id="email" 
                                                label="E-Mail"
                                                type="email" 
                                                fullWidth 
                                                autoFocus 
                                                required  
                                                onChange={e => this.handleChange(e)} 
                                                value={this.state.emailInput}
                                                name="emailInput"/>
                                        </Grid>
                                    </Grid>
                                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                                    <div className="loadingWrapper">
                                        <Button 
                                            variant="outlined" 
                                            color="primary" 
                                            onClick={e => this.handleSubmit(e)}
                                            disabled={this.state.loading}
                                            style={{ textTransform: "none" }}>Submit changes
                                        </Button>
                                        {this.state.loading && <CircularProgress size={24} className="buttonProgress" />}
                                    </div>
                                </Grid>
                                </div>
                            </form> 
                        </Paper>
                    </Grid>
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
            </div>
            
        );
    }
}

export default withStyles(styles)(Settings);