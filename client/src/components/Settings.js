import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { uploadImage } from '../actions/changeSettings'



class Settings extends Component {
    constructor(props){
        super(props);
        this.state = {
            img: null, 
        }
    }

    handleImageUpload = async e => {
        let username = 'freddy';
        let imageFormObj = new FormData();
        imageFormObj.append(username, e.target.files[0]);
        imageFormObj.append("username", username)
        
        this.setState({
            img: URL.createObjectURL(e.target.files[0])
        });
        const response = await uploadImage(imageFormObj);
        console.log(response);
    }

    render() {
        return(
            <Grid 
                container 
                spacing={0} 
                alignItems="center"
                justify="center"
                style={{ height: '100vh' }}
            >
                <Paper style={{width: '300px'}}>
                    <form>
                        <input type="file" name="avatar" onChange={(e) => this.handleImageUpload(e)} />
                        {/* <Button variant="outlined" color="primary" type="submit">Submit</Button> */}
                        <img src="uploads\freddy.jpeg" alt="profilePic"/>
                    </form>
                </Paper>
            </Grid>

        );
    }
}

export default Settings;