import React from 'react';
// import logo from './logo.svg';
import './App.css';
import AuthForm from './components/AuthForm';
import { Container } from '@material-ui/core';
import { Router } from '@reach/router';


function App() {
  return (
      <Container maxWidth="sm">
        <Router>
          <AuthForm path="/" />
          {/* <AuthForm path="/signin" /> */}
          <AuthForm signup path="/signup" />
        </Router>
     </Container>
  );
}

export default App;
