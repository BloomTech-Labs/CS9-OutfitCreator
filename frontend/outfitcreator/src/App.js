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
  getUserID() {
    const token = localStorage.getItem('authToken');

    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64)).sub;
    }
}

  signInSuccess = (data) => {
    console.log(data);
    this.setState({ user: data.user});
    localStorage.setItem('authToken', `Bearer ${data.token}`);
  }

  render() {
    return (
      <div className="App">

        <Switch>
          <Route exact path='/' render={props => <Landing {...props} onSignin={this.signInSuccess} />} />
          <Route path='/Create' render={props =>
            <div className='App--create'>
              <Create {...props} getUserID={this.getUserID} />
              <Navigation />
            </div>
          } />
          <Route path='/Archive' render={props =>
            <div>
              <Archive />
              <Navigation />
            </div>
          } />
          <Route path='/Settings' render={props =>
            <div>
              <Settings />
              <Navigation />
            </div>
          } />
          <Route path='/Upload' render={props =>
            <div>
              <Upload getUserID={this.getUserID} />
              <Navigation />
            </div>
          } />
          <Route path='/Billing' render={props =>
            <div>
              <Billing {...props} getUserID={this.getUserID}/>
              <Navigation />
            </div>
          } />
          <Route path='/Edit' render={props =>
            <div>
              <OutfitEdit />
              <Navigation />
            </div>
          } />
        </Switch>
      </div>
    );
  }
}

export default App;
