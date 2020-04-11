import React from 'react';
// import logo from './logo.svg';
import './css/App.css';
import AuthForm from './components/AuthForm';
import Home from './components/Home'
import Settings from './components/Settings'
import ProfilePage from './components/ProfilePage'
import withAuth from "./components/withAuth";
import { Container } from '@material-ui/core';
import { Route, Switch, BrowserRouter } from "react-router-dom";


function App() {
  return (
      <Container maxWidth="xl">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={AuthForm}/>
            <Route exact path="/signup" render={props => {
                return (
                  <AuthForm
                    signup {...props}/>
                );
              }}
            />
            <Route path="/home" component={withAuth(Home)} />
            <Route path="/settings" component={withAuth(Settings)} />
            <Route path="/profile" component={withAuth(ProfilePage)} />
          </Switch>
        </BrowserRouter>
     </Container>
  );
}

export default App;
