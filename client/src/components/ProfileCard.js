import React, { Component } from 'react';
import { Grid, Paper, Avatar, Typography } from '@material-ui/core';
import CakeIcon from '@material-ui/icons/Cake';
import DescriptionIcon from '@material-ui/icons/Description';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';


class ProfileCard extends Component {
    render() {
        const { newUser } = this.props;
        console.log(newUser);
        return(
            this.props.showProfile && (
                <Paper className="swipePaper">
                    <Grid container style={{margin: '10px', alignContent: 'flex-start'}} spacing={2}>
                        <Grid style={{height: 'fit-content', marginBottom: '1em'}} item xs={12}>
                            <Avatar className="profileAvatar" src={newUser.image}/>
                            <Typography style={{textAlign: 'center', marginTop:'10px'}} variant="h3">
                                <b>{newUser.username}</b>, 14
                            </Typography>
                        </Grid>
                        <Grid item md={6} sm={12}>
                            <Typography variant="h6">
                                <CakeIcon className="profileIcon"/>14 Month
                            </Typography>
                            {newUser.location && (
                            <Typography variant="h6" style={{marginTop: '1em'}}>
                                <HomeIcon className="profileIcon"/>{newUser.location}
                            </Typography>
                            )}
                            <Typography variant="h6" style={{marginTop: '1em'}}>
                                <FavoriteIcon className="profileIcon"/>{newUser.gender}
                            </Typography>
                        </Grid>
                        {newUser.description && (<Grid item md={6} sm={12}>
                            <Typography variant="h6">
                                <DescriptionIcon className="profileIcon"/><b>Description</b>
                            </Typography>
                            <Typography style={{fontSize: '16px', textAlign: 'justify'}}>
                                {newUser.description.replace(/(\r\n|\n|\r)/gm, "")}
                            </Typography>
                        </Grid>
                        )}
                    </Grid>
                </Paper>
            )
            
        );
    }
}

export default ProfileCard;