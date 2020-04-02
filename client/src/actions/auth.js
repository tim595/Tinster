import axios from 'axios';

export const setAuhorizationToken = (token) => {
  if(token){
    // https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export const logout = () => {
   localStorage.clear();
   setAuhorizationToken(false)
}


export const signIn = async (username, password) => {
    const res = await axios.post('http://localhost:3001/api/auth/signIn', {
      username: username,
      password: password,
    });
    // console.log("res: ", res);
    localStorage.setItem("jwtToken", res.data.token);
    setAuhorizationToken(res.data.token);
    return res.data;
  };

export const signUp = async (email, username, password, gender, preference) => {
    const res = await axios.post('http://localhost:3001/api/auth/signUp', {
        email: email,
        username: username,
        password: password,
        gender: gender,
        preference: preference
    });
    // console.log("res: ", res);
    localStorage.setItem("jwtToken", res.data.token);
    setAuhorizationToken(res.data.token);
    return res.data;
};

export const checkUsername = async username => {
  const res = await axios.post('http://localhost:3001/api/auth/checkUsername', {
    username: username
  });
  return res.data;
}

export const checkToken = async () => {
  if (localStorage.jwtToken) {
    setAuhorizationToken(localStorage.jwtToken);
  }
  const res = await axios.get('http://localhost:3001/api/auth/checkToken');
  return res;
}