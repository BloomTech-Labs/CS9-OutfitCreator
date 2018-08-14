import React, { Component } from 'react';
import Landing from './Components/Landing_Page/Landing';
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

        <Switch>
          <Route exact path='/Landing' component={Landing} />
          <Route path='/' component={Navigation} />
          <Route path='/Create' component={Create} />
          <Route path='/Upload' component={Upload} />
          <Route path='/Archive' component={Archive} />
          <Route path='/Settings' component={Settings} />
          <Route path='/Billing' component={Billings} />
        </Switch>
      </div>
    );
  }
}

export default App;
