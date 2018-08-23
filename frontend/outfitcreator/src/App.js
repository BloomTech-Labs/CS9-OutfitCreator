import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';


import Landing from './Components/Landing_Page/Landing';
import Navigation from './Components/Navigation';
import Create from './Components/Create_Component/Create';
import Upload from './Components/Upload_Page/Upload';
import Archive from './Components/Archive_Page/Archive';
import Settings from './Components/Settings_Page/Settings';
import Billing from './Components/Billing_Page/Billing';
import OutfitEdit from './Components/Archive_Page/OutfitEdit';
import './App.css';

library.add(faShareAlt);

class App extends Component {
  constructor() {
    super();
    this.state = {
      userID: null,
    }
  }

  updateUserID = (ID) => {
    this.setState({userID: ID});
  }

  render() {
    return (
      <div className="App">

        <Switch>
          <Route exact path='/' render={props =>
            <div>
              <Landing {...props} userID={this.userID} login={this.updateUserID}/>
            </div>
          } />
          <Route path='/Create' render={props =>
            <div className='App--create'>
              <Create {...props} userID={this.userID}/>
              <Navigation />
            </div>
          } />
          <Route path='/Archive' render={props =>
            <div>
              <Archive {...props} userID={this.userID}/>
              <Navigation />
            </div>
          } />
          <Route path='/Settings' render={props =>
            <div>
              <Settings {...props} userID={this.userID}/>
              <Navigation />
            </div>
          } />
          <Route path='/Upload' render={props =>
            <div>
              <Upload {...props} userID={this.userID}/>
              <Navigation />
            </div>
          } />
          <Route path='/Billing' render={props =>
            <div>
              <Billing {...props} userID={this.userID}/>
              <Navigation />
            </div>
          } />
          <Route path='/Edit' render={props =>
            <div>
              <OutfitEdit {...props} userID={this.userID}/>
              <Navigation />
            </div>
          } />
        </Switch>
      </div>
    );
  }
}

export default App;
