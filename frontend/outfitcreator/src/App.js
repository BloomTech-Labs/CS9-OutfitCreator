import React, { Component } from 'react';
import Landing from './Components/Landing_Page/Landing';
import Navigation from './Components/Navigation';
import Create from './Components/Create';
import Upload from './Components/Upload';
import Archive from './Components/Archive_Page/Archive';
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
          <Route path='/Create'  render={ props =>
            <div className='App--create'>
              <Create />
              <Navigation />
            </div>
          } />
          <Route path='/Archive'  render={ props =>
            <div>
              <Archive />
              <Navigation />
            </div>
          } />
          <Route path='/Settings'  render={ props =>
            <div>
              <Settings />
              <Navigation />
            </div>
          } />
          <Route path='/Upload'  render={ props =>
            <div>
              <Upload />
              <Navigation />
            </div>
          } />
          <Route path='/Billing'  render={ props =>
            <div>
              <Billings />
              <Navigation />
            </div>
          } />
        </Switch>
      </div>
    );
  }
}

export default App;
