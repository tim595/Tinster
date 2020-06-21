import axios from 'axios';


export const getMatches = async (username, likes) => {
    const res = await axios.post('/api/match/getMatches', {
        username: username,
        userLiked: likes
    });
    return res.data;
}