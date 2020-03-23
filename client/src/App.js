import React from 'react';
// import logo from './logo.svg';
import './css/App.css';
import AuthForm from './components/AuthForm';
import Home from './components/Home'
import Settings from './components/Settings'
import ProfilePage from './components/ProfilePage'
import { Container } from '@material-ui/core';
import { Router } from '@reach/router';


function App() {
  return (
      <Container maxWidth="xl">
        <Router>
          <AuthForm path="/" />
          <AuthForm signup path="/signup" />
          <Home path="/home" />
          <Settings path="/settings" />
          <ProfilePage path="/profile" />
        </Router>
     </Container>
  );
}

export default App;
