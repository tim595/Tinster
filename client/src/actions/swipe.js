import axios from 'axios';

export const getNewUser = async (username, likesDislikes, preference) => {
    const res = await axios.post('/api/swipe/getNewUser', {
        username: username,
        likesDislikes: likesDislikes,
        preference: preference 
    });
    return res.data;
}