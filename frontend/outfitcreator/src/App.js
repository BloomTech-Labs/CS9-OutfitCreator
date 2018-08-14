import React, { Component } from 'react';
import Landing from './Components/Landing_Page/Landing';
import './App.css';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/SignUp' />
        </Switch>
      </div>
    );
  }
}

export default App;
