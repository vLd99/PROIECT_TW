import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from "./components/home.js";
import Nav from "./components/nav.js";
import { BottomNavigation } from '@material-ui/core';
import './App.css';
import Login from './components/login.js';
import Register from './components/register'

class App extends Component {
 
  render() {
    return (
      <BrowserRouter >
        <Switch>

          <Route path="/" exact={true} component={() => {
            return (<div className="App"> <Nav /><Home  /><BottomNavigation/> </div>)
          }} />

          <Route path="/Login" exact={true} component={() => {
            return (<div className="App"> <Nav /><Login /> </div>)
          }} />

          <Route path="/Register" exact={true} component={() => {
            return (<div className="App"> <Nav /><Register /> </div>)
          }} />


        </Switch>
      </BrowserRouter>)
  }
}

export default App;
