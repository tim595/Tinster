import axios from 'axios';

export const receiveData = async (username) => {
    const res = await axios.post('http://localhost:3001/api/changeSettings/receiveData', {
        userName: username
    });
    return res.data;
}

export const updateData = async ( imageFormObj ) => {
    const res = await axios.post('http://localhost:3001/api/changeSettings/updateData', imageFormObj);
    return res.data;
}