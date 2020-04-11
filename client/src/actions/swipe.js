import axios from 'axios';

export const getNewUser = async (username, likesDislikes, preference) => {
    const res = axios.post('http://localhost:3001/api/swipe/getNewUser', {
        username: username,
        likesDislikes: likesDislikes,
        preference: preference 
    });
    return res.data;
}