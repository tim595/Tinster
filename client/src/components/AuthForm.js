import React, { Component } from 'react';
import { Paper, withStyles, Grid, TextField, Button, Snackbar, IconButton, CircularProgress, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, FormHelperText} from '@material-ui/core';
import { Face, Fingerprint, MailOutline } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import WcIcon from '@material-ui/icons/Wc';
import { Link } from "react-router-dom";

import { signIn, signUp, checkUsername } from '../actions/auth'

const styles = theme => ({
    margin: {
        margin: theme.spacing(2),
    },
    padding: {
        padding: theme.spacing(1)
    },
});

class AuthForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            emailInput: "",
            usernameInput: "",
            passwordInput: "",
            confirmPWInput: "",

            emailErrAttr: false,
            emailShowErrText: false,
            emailErrText: "",

            usernameErrAttr: false,
            usernameShowErrText: false,
            usernameErrText: "",

            passwordErrAttr: false,
            passwordShowErrText: false,
            passwordErrText: "",

            confirmPwErrAttr: false,
            confirmPwShowErrText: false,
            confirmPwErrText: "",

            checkboxErrAttr: false,
            checkboxShowErrText: false,

            radioErrAttr: false,
            radioShowErrText: false,

            genderRadio: "",

            selectedPreference: [],

            snackbarOpen: false,

            loading: false
        };
    }
    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value 
        })
    }

    handleCheckbox = e => {
        if ( e.target.type === "checkbox") {
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

    handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ snackbarOpen: false });
      };

    handleGenderRadio = e => {
        this.setState({
            genderRadio: e.target.value
        })
    };

    handleSubmit = async e => {
        e.preventDefault();
        const authType = this.props.signup ? "signup" : "signin";
        let response;
        if (authType === "signin") {
            this.setState({
                usernameErrAttr: false,
                usernameShowErrText: false,
                usernameErrText: "",
                passwordErrAttr: false,
                passwordShowErrText: false,
                passwordErrText: ""
            })
            
            if(this.state.usernameInput && this.state.passwordInput) {
                this.setState({
                    loading: true
                });
                response = await signIn(this.state.usernameInput, this.state.passwordInput);
                this.setState({
                    loading: false
                });
                if(response.success){
                    this.props.history.push("/home");
                }else if(!response.userExists && !response.error) {
                    this.setState({
                        usernameErrAttr: true,
                        usernameShowErrText: true,
                        usernameErrText: "User doesn't exist",
                    });
                }else if(response.passwordWrong && !response.error){
                    this.setState({
                        passwordErrAttr: true,
                        passwordShowErrText: true,
                        passwordErrText: "Wrong password",
                    });
                }else {
                    // db error
                    this.setState({ snackbarOpen: true });
                }
            }else {
                if(!this.state.passwordInput){
                    this.setState({
                        passwordErrAttr: true,
                        passwordShowErrText: true,
                        passwordErrText: "Password must not be empty",
                    });
                }
                if(!this.state.usernameInput) {
                    this.setState({
                        usernameErrAttr: true,
                        usernameShowErrText: true,
                        usernameErrText: "Username must not be empty",
                    });
                }
            }
        } else { // signup
            const isEmailInputValid = this.isEmailInputValid();
            const arePasswordInputsValid = this.arePasswordInputsValid();
            const areCheckboxesChecked = this.areCheckboxesChecked();
            const isRadioButtonChecked = this.isRadioButtonChecked();
            this.setState({
                loading: true
            });
            const isUserInputValid = await this.isUserInputValid();
            if( isEmailInputValid && 
                arePasswordInputsValid && 
                isUserInputValid && 
                areCheckboxesChecked &&
                isRadioButtonChecked ){
                
                response = await signUp(this.state.emailInput, this.state.usernameInput, this.state.passwordInput, this.state.genderRadio, this.state.selectedPreference );
                if(response.success){
                    this.props.history.push("/home");
                }
            }
            this.setState({
                loading: false
            });  
        }
    }

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

    isUserInputValid = async () => {
        this.setState({
            usernameErrAttr: false,
            usernameShowErrText: false,
            usernameErrText: ""
        })
        if (this.state.usernameInput === "") {
            this.setState({
                usernameErrAttr: true,
                usernameShowErrText: true,
                usernameErrText: "Username must not be empty"
            });
            return false;

        } else if (this.state.usernameInput.length > 20) {
            this.setState({
                usernameErrAttr: true,
                usernameShowErrText: true,
                usernameErrText: "Username can't be longer than 20 characters"
            });
            return false;

        } else if (!(await this.isUserNameAvailable())) {
            this.setState({
                usernameErrAttr: true,
                usernameShowErrText: true,
                usernameErrText: "Username is already taken"
            });
            return false;

        } else return true;
    }

    isUserNameAvailable = async () => {
        let response = await checkUsername(this.state.usernameInput);
        if (response.success) {
            if (!response.userExists) {
                return true;
            } else if (response.userExists) {
                return false;
            }
        }else {
            this.setState({ snackbarOpen: true });
        }
        // eventuell error ausgeben
    }

    arePasswordInputsValid = () => {
        this.setState({
            passwordErrAttr: false,
            passwordShowErrText: false,
            passwordErrText: "",
            confirmPwErrAttr: false,
            confirmPwShowErrText: false,
            confirmPwErrText: ""
        })

        if (this.state.passwordInput === "") {
            this.setState({
                passwordErrAttr: true,
                passwordShowErrText: true,
                passwordErrText: "Password must not be empty"
            })
            return false;

        } else if (this.state.passwordInput.length < 8) {
            this.setState({
                passwordErrAttr: true,
                passwordShowErrText: true,
                passwordErrText: "Password must be at least 8 characters long"
            })
            return false

        } else if (this.state.passwordInput !== this.state.confirmPWInput) {
            this.setState({
                confirmPwErrAttr: true,
                confirmPwShowErrText: true,
                confirmPwErrText: "Password confirmation doesn't match the password"
            })
            return false;

        } else return true;
    }

    areCheckboxesChecked = () => {
        this.setState({
            checkboxErrAttr: false,
            checkboxShowErrText: false,
        })
        if (this.state.selectedPreference.length === 0) {
            this.setState({
                checkboxErrAttr: true,
                checkboxShowErrText: true,
            })
            return false;

        } else return true;

    }

    isRadioButtonChecked = () => {
        this.setState({
            radioErrAttr: false,
            radioShowErrText: false,
        })
        if (this.state.genderRadio === "") {
            this.setState({
                radioErrAttr: true,
                radioShowErrText: true,
            })
            return false;

        } else return true;
    }

    render() {
        //TODO: Variablen eventuell außerhalb von render() deklarieren
        const { classes, signup } = this.props;
            
        return (
            <Grid 
                container 
                spacing={0} 
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '80vh' }}
            >
                <Grid item align="center">
                    <img alt="hamster_logo" className="hamster_logo" src="https://cdn2.iconfinder.com/data/icons/animals-nature-2/50/1F439-hamster-512.png"/>
                </Grid>
                <Grid item align="center">
                    <p className="logo_text">tinster</p>
                </Grid>
                <Grid item style={{ maxWidth: '500px', width: '100%'}}>
                    <Paper className={classes.padding}>
                        <form noValidate>
                            <div className={classes.margin}>
                                {signup && (
                                    <Grid container spacing={2} alignItems="flex-end">
                                        <Grid item>
                                            <MailOutline />
                                        </Grid>
                                        <Grid item xs>
                                            <TextField 
                                                error={this.state.emailErrAttr?true:false}
                                                helperText={this.state.emailShowErrText?this.state.emailErrText:false} 
                                                id="email" 
                                                label="Email" 
                                                type="email" 
                                                fullWidth 
                                                autoFocus 
                                                required  
                                                onChange={e => this.handleChange(e)} 
                                                value={this.state.input} 
                                                name="emailInput"/>
                                        </Grid>
                                    </Grid>
                                )}
                                <Grid container spacing={2} alignItems="flex-end">
                                    <Grid item>
                                        <Face />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField 
                                        error={this.state.usernameErrAttr?true:false}
                                        helperText={this.state.usernameShowErrText?this.state.usernameErrText:false} 
                                        id="username" 
                                        label="Username" 
                                        type="username" 
                                        fullWidth 
                                        autoFocus={signup?false:true} 
                                        required  
                                        onChange={e => this.handleChange(e)} 
                                        value={this.state.input} 
                                        name="usernameInput"/>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} alignItems="flex-end">
                                    <Grid item>
                                        <Fingerprint />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField 
                                        error={this.state.passwordErrAttr?true:false}
                                        helperText={this.state.passwordShowErrText?this.state.passwordErrText:false}
                                        id="password" 
                                        label="Password" 
                                        type="password" 
                                        fullWidth 
                                        required 
                                        onChange={e => this.handleChange(e)} 
                                        value={this.state.input} 
                                        name="passwordInput"/>
                                    </Grid>
                                </Grid>
                                {signup && (
                                    <>
                                        <Grid container spacing={2} alignItems="flex-end">
                                            <Grid item>
                                                <Fingerprint />
                                            </Grid>
                                            <Grid item xs>
                                                <TextField 
                                                error={this.state.confirmPwErrAttr?true:false}
                                                helperText={this.state.confirmPwShowErrText?this.state.confirmPwErrText:false} 
                                                id="passwort_confirm" 
                                                label="Confirm passwort" 
                                                type="password" 
                                                fullWidth required  
                                                onChange={e => this.handleChange(e)} 
                                                value={this.state.input} 
                                                name="confirmPWInput"/>
                                            </Grid>
                                        </Grid>
                                        <Grid container alignItems="center" justify="space-between">
                                            <Grid item>
                                                <WcIcon />
                                            </Grid>
                                            <Grid item container style={{ width:'92%', marginTop:'20px' }}  alignItems="center" justify="space-between">
                                                <Paper variant="outlined" style={{ padding: '10px', marginBottom: '5px'}}>
                                                    <Grid item>
                                                        <FormControl
                                                        error={this.state.radioErrAttr?true:false} 
                                                        component="fieldset">
                                                        <FormLabel component="legend">Gender *</FormLabel>
                                                            <RadioGroup row aria-label="gender" name="gender" value={this.state.genderRadio} onChange={this.handleGenderRadio}>
                                                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                            </RadioGroup>
                                                            <FormHelperText hidden={this.state.radioShowErrText?false:true} error>A gender must be selected</FormHelperText>
                                                        </FormControl>
                                                    </Grid>
                                                </Paper>
                                               <Paper variant="outlined" style={{ padding: '10px', marginBottom: '5px'}}>
                                                    <Grid item>
                                                        <FormControl 
                                                        error={this.state.checkboxErrAttr?true:false}
                                                        style={{display:'block'}}>
                                                            <FormLabel component="legend">Preference *</FormLabel>
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.handleCheckbox} name="female" />}
                                                                label="Female"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.handleCheckbox} name="male" />}
                                                                label="Male"
                                                            />
                                                            <FormHelperText hidden={this.state.checkboxShowErrText?false:true} error>Select at least one checkbox</FormHelperText>
                                                        </FormControl>
                                                    </Grid>
                                               </Paper>
                                            </Grid>
                                        </Grid>
                                    </>
                                )}
                                <Grid container alignItems="center" justify="space-between">
                                    <Grid item>
                                        <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                                    </Grid>
                                    <Grid item>
                                        {signup?(
                                            <Link to="/">
                                                <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Sign In!</Button>
                                            </Link>
                                        ):(
                                            <Link to="/signup">
                                                <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Not signed up ?</Button>
                                            </Link>
                                        )}
                                        
                                    </Grid>
                                </Grid>
                                <Grid container justify="center" style={{ marginTop: '10px' }}>
                                    <div className="loadingWrapper">
                                        <Button 
                                            type="submit"
                                            variant="outlined" 
                                            color="primary" 
                                            onClick={e => this.handleSubmit(e)} 
                                            disabled={this.state.loading}
                                            style={{ textTransform: "none" }}>{signup?"Sign Up":"Login"}
                                        </Button>
                                        {this.state.loading && <CircularProgress size={24} className="buttonProgress" />}
                                    </div>
                                </Grid>

                            </div>
                        </form>
                    </Paper>
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
        );
    }
}

export default withStyles(styles)(AuthForm);