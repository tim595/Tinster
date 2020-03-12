import axios from 'axios';


export const signIn = async (username, password) => {
    const res = await axios.post('http://localhost:3001/api/auth/signIn', {
      username: username,
      password: password,
    });
    console.log("res: ", res.data);
    return res.data;
  };

export const signUp = async (email, username, password) => {
    const res = await axios.post('http://localhost:3001/api/auth/signUp', {
        email: email,
        username: username,
        password: password,
    });
    console.log("res: ", res.data);
    return res.data;
};

export const checkUsername = async username => {
  const res = await axios.post('http://localhost:3001/api/auth/checkUsername', {
    username: username
  });
  return res.data;
}