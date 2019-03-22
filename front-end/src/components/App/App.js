import React, { Component } from 'react';
import './App.css';
import Login from '../Login/Login';
import MainNavigation from '../MainNavigation/MainNavigation';
import { Route } from 'react-router-dom';
import ComicViewer from '../MainNavigation/Discover/ComicViewer/ComicViewer';
import LoginError from "../Login/LoginError";

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      showDashboard: false
    }
  }

  handleLogin = (loginFlag) => {
    this.setState({
      showDashboard: loginFlag
    })
  }

  render() {
    return (
      <div>
        <Route exact path='/login' component={Login} />
        <Route exact path='/login/error' component={LoginError} />
        <Route exact path='/home' component={MainNavigation} />
        <Route exact path='/viewer' component={ComicViewer} />
      </div>
    );
  }
}

export default App;
