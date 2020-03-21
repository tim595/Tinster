import axios from 'axios';

export const like = async ( userName, swipeID ) => {
    const res = await axios.post('http://localhost:3001/api/button/like', {
        userName: userName,
        swipeID: swipeID
    });
    return res.data;
}

export const dislike = async ( userName, swipeID ) => {
    const res = await axios.post('http://localhost:3001/api/button/dislike', {
        userName: userName,
        swipeID: swipeID
    });
    return res.data;
}