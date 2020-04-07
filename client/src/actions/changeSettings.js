import axios from 'axios';


export const uploadImage = async ( imageFormObj ) => {

    const res = await axios.post('http://localhost:3001/api/changeSettings/updateData', imageFormObj);
    return res.data;
}