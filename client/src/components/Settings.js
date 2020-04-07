import React, { Component } from 'react';
import Menubar from './Menubar';
import CloseIcon from '@material-ui/icons/Close';
import { Grid, Paper, withStyles, Button, CircularProgress, IconButton, Snackbar, TextField, FormControl, FormLabel, FormControlLabel, Checkbox, FormHelperText } from '@material-ui/core';
import { MailOutline } from '@material-ui/icons';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import MessageIcon from '@material-ui/icons/Message';
import HomeIcon from '@material-ui/icons/Home';
import WcIcon from '@material-ui/icons/Wc';
import { receiveData, updateData } from '../actions/changeSettings';


const styles = theme => ({
    margin: {
        margin: theme.spacing(2),
    },
    padding: {
        padding: theme.spacing(1)
    }
});

class Settings extends Component {
    constructor(props){
        super(props);
        this.state = {
            emailInput: "",
            numberInput: "",
            descriptionInput: "",
            locationInput: "",
            snackbarOpen: false,
            snackbarMessage: "",

            emailErrAttr: false,
            emailShowErrText: false,
            emailErrText: "",

            numberErrAttr: false,
            numberShowErrText: false,
            numberErrText: "",

            descriptionErrAttr: false,
            descriptionShowErrText: false,
            descriptionErrText: "",

            locationErrAttr: false,
            locationShowErrText: false,
            locationErrText: "",

            preferenceErrAttr: false,
            preferenceShowErrText: false,

            male: false,
            female: false,

            selectedPreference: [],

            img: null
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value 
        })
    }

    handleCheckbox = e => {
        if ( e.target.type === "checkbox") {
            if(e.target.name === "female") {
                this.setState({
                    female: !this.state.female
                })
            } else if(e.target.name === "male") {
                this.setState({
                    male: !this.state.male
                })
            }
            var prefArr = [...this.state.selectedPreference];
            var index = prefArr.indexOf(e.target.name);
            if (index !== -1) {
              prefArr.splice(index, 1);
              this.setState({ selectedPreference: prefArr });
            } else {
              this.setState({ selectedPreference: [...this.state.selectedPreference, e.target.name] });
            }
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        const isEmailInputValid = this.isEmailInputValid();
        const isNumberInputValid = this.isNumberInputValid();
        const isDescriptionInputValid = this.isDescriptionInputValid();
        const isLocationValid = this.isLocationValid();
        const isPreferenceValid = this.isPreferenceValid();

        
        let username = 'freddy';

        let imageFormObj = new FormData();
        imageFormObj.append(username, this.state.img);
        imageFormObj.append("username", username)
        imageFormObj.append("email", this.state.emailInput)
        imageFormObj.append("number", this.state.numberInput)
        imageFormObj.append("description", this.state.descriptionInput)
        imageFormObj.append("location", this.state.locationInput)
        imageFormObj.append("preference", this.state.selectedPreference)

        if(isEmailInputValid && isNumberInputValid && isDescriptionInputValid && isLocationValid && isPreferenceValid) {
            console.log(this.state.selectedPreference);
            let response = await updateData(imageFormObj);
            if(response.success) {
                this.setState({ 
                    snackbarOpen: true,
                    snackbarMessage: "Profile has successfully been updated"
                 })
            }
            else {
                this.setState({ 
                    snackbarOpen: true,
                    snackbarMessage: "A MongoDB-Server error occurred"
                 })
            }
        }
    }

    handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ snackbarOpen: false });
      };

    isEmailInputValid = () => {
        this.setState({
            emailErrAttr: false,
            emailShowErrText: false,
            emailErrText: ""
        })
        if (this.state.emailInput === "") {
            this.setState({
                emailErrAttr: true,
                emailShowErrText: true,
                emailErrText: "Email must not be empty"
            })
            return false;

        } else if (!this.isEmailValid(this.state.emailInput)) {
            this.setState({
                emailErrAttr: true,
                emailShowErrText: true,
                emailErrText: "Email is invalid"
            })
            return false;

        } else return true;
    }

    isEmailValid = email => {
        let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return email.match(emailRegex)!=null?true:false;
    }

    isNumberInputValid = () => {
        this.setState({
            numberErrAttr: false,
            numberShowErrText: false,
            numberErrText: ""
        })

        if (isNaN(this.state.numberInput)) {
            this.setState({
                numberErrAttr: true,
                numberShowErrText: true,
                numberErrText: "Number is invalid"
            })
            return false;
        }
        else return true;
    }

    isDescriptionInputValid = () => {
        this.setState({
            descriptionErrAttr: false,
            descriptionShowErrText: false,
            descriptionErrText: ""
        })

        if(this.state.descriptionInput.length > 200) {
            this.setState({
                descriptionErrAttr: true,
                descriptionShowErrText: true,
                descriptionErrText: "Description can't be longer than 200 characters"
            })
            return false;
        } else return true;
    }

    isLocationValid = () => {
        this.setState({
            locationErrAttr: false,
            locationShowErrText: false,
            locationErrText: ""
        })
    
        if(this.state.locationInput.length > 30){
            this.setState({
                locationErrAttr: true,
                locationShowErrText: true,
                locationErrText: "Location can't be longer than 30 characters"
            })
            return false;
        } else return true
    }

    isPreferenceValid = () => {
        this.setState({
            preferenceErrAttr: false,
            preferenceShowErrText: false,
        })
        if(this.state.selectedPreference.length === 0) {
            this.setState({
                preferenceErrAttr: true,
                preferenceShowErrText: true,
            })  
            return false;
        } else return true;
    };

    getCurrentData = async() => {
        let username = 'freddy'; //später auf aktuellen User ändern
        let response = await receiveData(username);

        if(response.success) {
            this.setState({
                emailInput: response.res.email,
                numberInput: response.res.number,
                descriptionInput: response.res.description,
                locationInput: response.res.location,
                selectedPreference: response.res.preference
            })

            for(let i=0; i<this.state.selectedPreference.length; i++){
                let array = this.state.selectedPreference;
                let key = array[i];
                this.setState({
                    [key]: true
                })
            }
            
        } else {
            this.setState({ 
                snackbarOpen: true,
                snackbarMessage: "A MongoDB-Server error occurred"
             })
        }
    }

    handleImageUpload = e => {
        this.setState({
            img: e.target.files[0]
        });
    }

    componentDidMount = () => {
        this.getCurrentData()
    }

    render() {
        const classes = this.props;

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
                                <div className={classes.margin}  style={{margin: '15px'}}>
                                    <Grid container spacing={2} alignItems="flex-end">
                                        <Button
                                            variant="outlined" 
                                            color="primary"
                                            component="label">
                                            Upload Image
                                            <input
                                                type="file"
                                                style={{ display: "none" }}
                                                onChange={(e) => this.handleImageUpload(e)}
                                            />
                                        </Button>
                                        {/* <img src="uploads\freddy.jpeg" alt="profilePic"/> */}
                                    </Grid>
                                    <Grid container spacing={2} alignItems="flex-end">
                                        <Grid item>
                                            <MailOutline />
                                        </Grid>
                                        <Grid item xs>
                                            <TextField 
                                                style={{marginTop: '15px'}}
                                                error={this.state.emailErrAttr?true:false}
                                                helperText={this.state.emailShowErrText?this.state.emailErrText:false}
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

                                    <Grid container spacing={2} alignItems="flex-end">
                                        <Grid item>
                                            <PhoneAndroidIcon />
                                        </Grid>
                                        <Grid item xs>
                                            <TextField 
                                                style={{marginTop: '15px'}}
                                                error={this.state.numberErrAttr?true:false}
                                                helperText={this.state.numberShowErrText?this.state.numberErrText:false}
                                                id="number" 
                                                label="Phone number"
                                                type="text"
                                                fullWidth 
                                                autoFocus  
                                                onChange={e => this.handleChange(e)} 
                                                value={this.state.numberInput}
                                                name="numberInput"/>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <MessageIcon />
                                        </Grid>
                                        <Grid item xs>
                                            <TextField 
                                                style={{marginTop: '15px'}}
                                                error={this.state.descriptionErrAttr?true:false}
                                                helperText={this.state.descriptionShowErrText?this.state.descriptionErrText:false}
                                                multiline={true}
                                                rows={3}
                                                id="description" 
                                                label="Description"
                                                type="text"
                                                fullWidth 
                                                autoFocus  
                                                onChange={e => this.handleChange(e)} 
                                                value={this.state.descriptionInput}
                                                name="descriptionInput"/>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} alignItems="flex-end">
                                        <Grid item>
                                            <HomeIcon />
                                        </Grid>
                                        <Grid item xs>
                                            <TextField 
                                                style={{marginTop: '15px'}}
                                                error={this.state.locationErrAttr?true:false}
                                                helperText={this.state.locationShowErrText?this.state.locationErrText:false}
                                                id="location" 
                                                label="Location"
                                                type="text"
                                                fullWidth 
                                                autoFocus  
                                                onChange={e => this.handleChange(e)} 
                                                value={this.state.locationInput}
                                                name="locationInput"/>
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems="center">
                                            <Grid item>
                                                <WcIcon />
                                            </Grid>
                                            <Paper variant="outlined" style={{ margin: '10px', marginTop: '20px', paddingLeft: '10px'}}>
                                                    <Grid item container style={{ width:'92%', marginTop:'20px' }}>
                                                        <FormControl 
                                                        error={this.state.preferenceErrAttr?true:false}
                                                        style={{display:'block'}}>
                                                            <FormLabel component="legend">Preference *</FormLabel>
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.handleCheckbox} name="female" />}
                                                                label="Female"
                                                                checked={this.state.female}
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.handleCheckbox} name="male" />}
                                                                label="Male"
                                                                checked={this.state.male}
                                                            />
                                                            <FormHelperText hidden={this.state.preferenceShowErrText?false:true} error>Select at least one checkbox</FormHelperText>
                                                        </FormControl>
                                                    </Grid>
                                            </Paper>
                                    </Grid>

                                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                                    <div className="loadingWrapper">
                                        <Button 
                                            variant="outlined" 
                                            color="primary" 
                                            onClick={e => this.handleSubmit(e)}
                                            disabled={this.state.loading}
                                            style={{ textTransform: "none", marginBottom: '15px' }}>Submit changes
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
                    message={this.state.snackbarMessage}
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