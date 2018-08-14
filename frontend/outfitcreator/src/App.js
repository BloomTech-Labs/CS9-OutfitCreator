import React, { Component } from 'react';
import logo from './logo.svg';
import Landing from './Components/Landing';
import Navigation from './Components/Navigation';
import Create from './Components/Create';
import Upload from './Components/Upload';
import Archive from './Components/Archive';
import Settings from './Components/Settings';
import Billings from './Components/Billings';
import './App.css';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <Switch>
          <Route exact path='/Landing' component={Landing} />
          <Route path='/' component={Navigation} />
          <Route path='/Create' component={Create} />
          <Route path='/Upload' component={Upload} />
          <Route path='/Archive' component={Archive} />
          <Route path='/Settings' component={Settings} />
          <Route path='/Billing' component={Billings} />
        </Switch>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
