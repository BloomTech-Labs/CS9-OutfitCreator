import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';


import Landing from './Components/Landing_Page/Landing';
import Navigation from './Components/Navigation';
import Create from './Components/Create_Component/Create';
import Upload from './Components/Upload';
import Archive from './Components/Archive';
import Settings from './Components/Settings';
import Billings from './Components/Billings';
import './App.css';

library.add(faShareAlt);

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
          <Route path='/Billing'  render={ props =>
            <div>
              <Navigation />
              <Billings />
            </div>
          } />
        </Switch>
      </div>
    );
  }
}

export default App;
