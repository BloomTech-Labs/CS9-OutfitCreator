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
  state = {
    user: null,
    token: null
  }

  signInSuccess = (data) => {
    this.setState({ user: data.user});
    localStorage.setItem('authToken', `Bearer ${data.token}`);
    this.updateToken();
  }

  updateToken = () => {
    const token = localStorage.getItem('authToken');
    this.setState({ token })
  }

  render() {
    return (
      <div className="App">

        <Switch>
          <Route exact path='/' render={props => <Landing {...props} onSignin={this.signInSuccess} />} />
          <Route path='/Create' render={props =>
            <div className='App--create'>
              <Create {...props} />
              <Navigation token={this.state.token} user={this.state.user} />
            </div>
          } />
          <Route path='/Archive' render={props =>
            <div>
              <Archive token={this.state.token} user={this.state.user}/>
              <Navigation />
            </div>
          } />
          <Route path='/Settings' render={props =>
            <div>
              <Settings />
              <Navigation token={this.state.token} user={this.state.user} />
            </div>
          } />
          <Route path='/Upload' render={props =>
            <div>
              <Upload />
              <Navigation token={this.state.token} user={this.state.user} />
            </div>
          } />
          <Route path='/Billing' render={props =>
            <div>
              <Billing />
              <Navigation token={this.state.token} user={this.state.user} />
            </div>
          } />
          <Route path='/Edit' render={props =>
            <div>
              <OutfitEdit token={this.state.token} user={this.state.user}/>
              <Navigation />
            </div>
          } />
        </Switch>
      </div>
    );
  }
}

export default App;
