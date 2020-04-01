import axios from 'axios';

export const receiveData = async (username) => {
    const res = await axios.post('http://localhost:3001/api/changeSettings/receiveData', {
        userName: username
    });
    return res.data;
}

export const updateData = async (username, email) => {
    const res = await axios.post('http://localhost:3001/api/changeSettings/updateData', {
        userName: username,
        email: email
    });
    return res.data;
}