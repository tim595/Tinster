import React from 'react';
// import logo from './logo.svg';
import './App.css';
import AuthForm from './components/AuthForm';
import Home from './components/Home'
import { Container } from '@material-ui/core';
import { Router } from '@reach/router';


function App() {
  return (
      <Container maxWidth="sm">
        <Router>
          <AuthForm path="/" />
          <AuthForm signup path="/signup" />
          <Home path="/home" />
        </Router>
     </Container>
  );
}

export default App;
