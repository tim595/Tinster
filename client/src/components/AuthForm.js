import React, { Component } from 'react';
import { Paper, withStyles, Grid, TextField, Button} from '@material-ui/core';
import { Face, Fingerprint, MailOutline } from '@material-ui/icons';
import { Link, navigate } from '@reach/router';
import { signIn, signUp } from '../actions/auth'

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
            confirmPWInput: ""
        };

    }
    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value 
        }, () => console.log(this.state))
    }

    handleSubmit = async e => {
        e.preventDefault();
        const authType = this.props.signup ? "signup" : "signin";
        let response;
        if(authType === "signin"){
            if(this.state.usernameInput && this.state.passwordInput) { // richtiger input check muss impl. werden
                response = await signIn(this.state.usernameInput, this.state.passwordInput);
                if(response.success){
                    navigate('/home');
                }
            }
        }else { // signup
            if(this.state.usernameInput &&
                this.state.emailInput &&
                this.state.passwordInput &&
                this.state.confirmPWInput &&
                this.state.passwordInput === this.state.confirmPWInput){
                    response = await signUp(this.state.emailInput, this.state.usernameInput, this.state.passwordInput);
                    if(response.success){
                        navigate('/home');
                    }
                }else {
                    console.log("wrong or empty input")
                }
        }

    }

    render() {

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
                    <p className="logo_text">Tinster</p>
                </Grid>
                <Grid item>
                    <Paper className={classes.padding}>
                            <div className={classes.margin}>
                                {signup && (
                                    <Grid container spacing={2} alignItems="flex-end">
                                        <Grid item>
                                            <MailOutline />
                                        </Grid>
                                        <Grid item xs>
                                            <TextField id="email" label="Email" type="email" fullWidth autoFocus required  onChange={e => this.handleChange(e)} value={this.state.input} name="emailInput"/>
                                        </Grid>
                                    </Grid>
                                )}
                                <Grid container spacing={2} alignItems="flex-end">
                                    <Grid item>
                                        <Face />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField id="username" label="Username" type="username" fullWidth autoFocus={signup?false:true} required  onChange={e => this.handleChange(e)} value={this.state.input} name="usernameInput"/>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} alignItems="flex-end">
                                    <Grid item>
                                        <Fingerprint />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField id="password" label="Password" type="password" fullWidth required onChange={e => this.handleChange(e)} value={this.state.input} name="passwordInput"/>
                                    </Grid>
                                </Grid>
                                {signup && (
                                    <Grid container spacing={2} alignItems="flex-end">
                                        <Grid item>
                                            <Fingerprint />
                                        </Grid>
                                        <Grid item xs>
                                            <TextField id="passwort_confirm" label="Confirm passwort" type="passwort_confirm" fullWidth required  onChange={e => this.handleChange(e)} value={this.state.input} name="confirmPWInput"/>
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
                                    <Button variant="outlined" color="primary" onClick={e => this.handleSubmit(e)} style={{ textTransform: "none" }}>Login</Button>
                                </Grid>
                            </div>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(AuthForm);