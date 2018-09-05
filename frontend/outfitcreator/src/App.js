import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { ROOT_URL } from './config';
import axios from 'axios';

import Landing from './Components/Landing_Page/Landing';
import Login from './Components/Landing_Page/Login';
import Navigation from './Components/Navigation/Navigation';
import Create from './Components/Create_Component/Create';
import CreateLayers from './Components/Create_Component/CreateLayers';
import Upload from './Components/Upload_Page/Upload';
import Archive from './Components/Archive_Page/Archive';
import Settings from './Components/Settings_Page/Settings';
import Billing from './Components/Billing_Page/Billing';
import OutfitEdit from './Components/Archive_Page/OutfitEdit';
import Closet from './Components/Closet_Page/Closet.js';
import VerifyEmail from './Components/Landing_Page/VerifyEmail';
import './App.css';

library.add(faShareAlt);

class App extends Component {
  constructor(props) {
    super(props);

    this.setAuthToken();
  }

  setAuthToken = () => {
    const token = localStorage.getItem('authToken');
    
    if (token) axios.defaults.headers.common.Authorization = token;
    else delete axios.defaults.headers.common.Authorization;
  }

  getUserID() {
    const token = localStorage.getItem('authToken');

    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');

      return JSON.parse(window.atob(base64)).sub;
    }
  }

  // Return user paid status and execute call back function with value
  // i.e. isUserPaid(paid => console.log(paid)) logs paid status
  isUserPaid = (cb) => {
    return axios.get(`${ROOT_URL.API}/user/info/${this.getUserID()}`)
      .then(res => {
        cb(res.data.paid);
      })
      .catch(err => {
        console.log(err);
      });
  }

  toLandingPage = (e) => {
      e.preventDefault();
      window.location = `${ROOT_URL.WEB}/`;
      console.log(e.target);
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={props => 
            <Landing {...props} />
          } />
          <Route exact path='/login' render={props =>
            <div>
              <Landing {...props} />
              <div className='landingPage--faded'>
                <Login {...props} />
              </div>
            </div>
          } />

          <Route exact path='/verify/:key?' render={props =>
            <VerifyEmail {...props} />
          } />
          <Route path='/Create?' render={props =>
          {/* <Route path='/Create?' render={props =>
            <div className='App--create'>
              <Create {...props} getUserID={this.getUserID} />
              <Navigation getUserID={this.getUserID} />
            </div>
          } /> */}
          <Route path='/Create' render={props =>
            <div className='App--create-layers'>
              <CreateLayers {...props} getUserID={this.getUserID} isUserPaid={this.isUserPaid} />
              <Navigation getUserID={this.getUserID} />
            </div>
          } />
          <Route path='/Archive' render={props =>
            <div>
              <Archive getUserID={this.getUserID} />
              <Navigation getUserID={this.getUserID} />
            </div>
          } />
          <Route path='/Settings' render={props =>
            <div>
              <Settings {...props} getUserID={this.getUserID} />
              <Navigation getUserID={this.getUserID} />
            </div>
          } />
          <Route path='/Upload' render={props =>
            <div>
              <Upload getUserID={this.getUserID} isUserPaid={this.isUserPaid} />
              <Navigation getUserID={this.getUserID} />
            </div>
          } />
          <Route path='/Billing' render={props =>
            <div>
              <Billing {...props} getUserID={this.getUserID} />
              <Navigation getUserID={this.getUserID} />
            </div>
          } />
          <Route path='/Edit' render={props =>
            <div>
              <OutfitEdit {...props} getUserID={this.getUserID}/>
              <Navigation getUserID={this.getUserID} />
            </div>
          } />
          <Route path='/Closet' render={props =>
            <div className="App">
              <Closet {...props} getUserID={this.getUserID} />
              <Navigation getUserID={this.getUserID} />
            </div>
          } />
        </Switch>
      </div>
    );
  }
}

export default App;
