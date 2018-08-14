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
          <Route path='/Create'  render={ props =>
            <div className='App--create'>
              <Navigation />
              <Create />
            </div>
          } />
          <Route path='/Archive'  render={ props =>
            <div>
              <Navigation />
              <Archive />
            </div>
          } />
          <Route path='/Settings'  render={ props =>
            <div>
              <Navigation />
              <Settings />
            </div>
          } />
          <Route path='/Upload'  render={ props =>
            <div>
              <Navigation />
              <Upload />
            </div>
          } />
          <Route path='/Billing' component={Billings} />
        </Switch>
      </div>
    );
  }
}

export default App;
