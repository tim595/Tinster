import React, { Component } from 'react';
import { Paper, withStyles, Grid, TextField, Button, Snackbar, IconButton, CircularProgress} from '@material-ui/core';
import { Face, Fingerprint, MailOutline } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import { Link, navigate } from '@reach/router';
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

            snackbarOpen: false,

            loading: false
        };
    }
    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value 
        })
    }

    handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ snackbarOpen: false });
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
                    navigate('/home');
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
            this.setState({
                loading: true
            });
            const isUserInputValid = await this.isUserInputValid();
            if(isEmailInputValid && arePasswordInputsValid && isUserInputValid){
                response = await signUp(this.state.emailInput, this.state.usernameInput, this.state.passwordInput);
                if(response.success){
                    navigate('/home');
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

    showDatabaseError = () => {}


    
    
    render() {
        //TODO: Variablen eventuell außerhalb von render() deklarieren
        const { classes, signup } = this.props;
            
        return (
            <Grid 
                container 
                spacing={0} 
                direction="column"
                // alignItems="center"
                justify="center"
                style={{ minHeight: '80vh' }}
            >
                <Grid item align="center">
                    <img alt="hamster_logo" className="hamster_logo" src="https://cdn2.iconfinder.com/data/icons/animals-nature-2/50/1F439-hamster-512.png"/>
                </Grid>
                <Grid item align="center">
                    <p className="logo_text">tinster</p>
                </Grid>
                <Grid item>
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