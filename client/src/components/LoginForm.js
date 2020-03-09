import React from 'react';
import { Paper, withStyles, Grid, TextField, Button} from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons';
// import { Face, Fingerprint } from '@material-ui/icons'
const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    },
});

class LoginTab extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username_input: "",
            passowrt_input: ""
        };

    }
    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value 
        }, () => console.log(this.state.username_input))
    }
    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.padding}>
                <div className={classes.margin}>
                    <Grid container spacing={4} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="Username" type="email" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={4} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="Password" type="password" fullWidth required onChange={e => this.handleChange(e)} name="username_input"/>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
                    </Grid>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(LoginTab);