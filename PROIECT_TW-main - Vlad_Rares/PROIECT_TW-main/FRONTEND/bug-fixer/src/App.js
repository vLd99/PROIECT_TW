import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from "./components/home.js";
import Nav from "./components/nav.js";

import './App.css';
import Login from './components/login.js';
import Register from './components/register'
import Project from './components/project.js';
import Bug from './components/bug.js';
import FormBug from './components/formBug.js';
import FormBug2 from './components/formBug2.js'

class App extends Component {
  render() {
    return (
      <BrowserRouter >
        <Switch>

          <Route path="/" exact={true} component={() => {
            return (<div className="App"> <Nav /><Home /> </div>)
          }} />

          <Route path="/Login" exact={true} component={() => {
            return (<div className="App"> <Nav /><Login /> </div>)
          }} />

          <Route path="/Register" exact={true} component={() => {
            return (<div className="App"> <Nav /><Register /> </div>)
          }} />
          <Route path="/Project/:id" exact={true} component={()=>{
            return (<div className="App"><Nav/> <Project/></div>)
          }}/>
          <Route path="/Bug/:id" exact = {true} component={()=>{
            return (<div className="App"><Nav/> <Bug/></div>)
          }}/>
          <Route path="/formBug/:id" exact = {true} component={()=>{
            return (<div className="App"><Nav/> <FormBug/> </div>)
          }}/>
          <Route path="/formBug/" exact = {true} component={()=>{
            return (<div className="App"><Nav/> <FormBug2/> </div>)
          }}/>
          





        </Switch>
      </BrowserRouter>)
  }
}

export default App;
