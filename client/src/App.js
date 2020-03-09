import React from 'react';
// import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import { Container, Grid } from '@material-ui/core';
import Logo from './components/Logo';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Container maxWidth="sm">
      <Grid
        container
        // spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        // style={{ minHeight: '30px' }}
      >
      <Logo />
      <p className="logo_text">Tinster</p>
      </Grid>
      <Grid
        container
        spacing={0}
        direction="column"
        // alignItems="center"
        justify="center"
        // style={{ minHeight: '20vh' }}
      >
        <LoginForm />
      </Grid>
    </Container>
  );
}

export default App;
