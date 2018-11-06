import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { ROOT_URL } from './config';
import axios from 'axios';

import Landing from './Components/Landing_Page_v2/Landing';
// import Login from './Components/Landing_Page/Login';
import Navigation from './Components/Navigation_v2/Navigation';
import CreateOutfit from './Components/Create_Component/CreateOutfit';
import Upload from './Components/Upload_Page/Upload';
import Archive from './Components/Archive_Page/Archive';
import Settings from './Components/Settings_Page/Settings';
import OutfitEdit from './Components/Archive_Page/OutfitEdit';
import Closet from './Components/Closet_Page/Closet.js';
// import VerifyEmail from './Components/Landing_Page/VerifyEmail';

import './App.css';
import './Components/Landing_Page_v2/Landing.css';
import './Components/Navigation_v2/Navigation.css';

library.add(faShareAlt);

class App extends Component {
	constructor(props) {
    super(props);
    
     // Set window variable to prep for Material UI version update
     window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

		this.setAuthToken();
	}

	setAuthToken = () => {
		const token = localStorage.getItem('authToken');

		if (token) axios.defaults.headers.common.Authorization = token;
		else delete axios.defaults.headers.common.Authorization;
	};

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
		axios
			.get(`${ROOT_URL.API}/user/info/${this.getUserID()}`)
			.then((res) => {
				cb(res.data.paid);
			})
			.catch((err) => err);
	};

	// Used to activate Modal component
  // Pass this method down through props into the component that you 
  // would like to use the Modal component inside of. Then place the 
  // following line of code in the components constructor: 
  // `this.modal = props.modal.bind(this);`

  // See comments in Modal.js for component use instructions
	modal(content, action = () => this.modal()) {
		const state = { ...this.state };

		if (content) {
			state.content = content;
			state.action = () => {
				this.modal();
				action();
			};
			state.modal = true;
		} else {
			state.content = '';
			state.modal = false;
		}

		this.setState(state);
	}

	// signInSuccess = (data) => {
	// 	localStorage.setItem('authToken', `Bearer ${data.token}`);
	// };

	// toLandingPage = (e) => {
	// 	e.preventDefault();
	// 	window.location = `${ROOT_URL.WEB}/`;
	// };

	render() {
		return (
			<div className="App">
				<Switch>
					<Route exact path="/" render={(props) => <Landing {...props} modal={this.modal} />} />
					{/* <Route exact path='/login' render={props =>
            <div>
              <Landing {...props} />
              <div className='landingPage--faded'>
                <Login {...props} onSignin={this.signInSuccess} />
              </div>
            </div>
          } /> */}
					<Route
						exact
						path="/verify/:key?"
						render={(props) => (
							<div>
								<Landing {...props} modal={this.modal} />
								{/* <div className="landingPage--faded">
									<VerifyEmail {...props} />
								</div> */}
							</div>
						)}
					/>
					<Route
						path="/Create"
						render={(props) => (
							<div className="App">
								<CreateOutfit {...props} getUserID={this.getUserID} isUserPaid={this.isUserPaid} />
								<Navigation getUserID={this.getUserID} />
							</div>
						)}
					/>
					<Route
						path="/Archive"
						render={(props) => (
							<div>
								<Archive getUserID={this.getUserID} />
								<Navigation getUserID={this.getUserID} />
							</div>
						)}
					/>
					<Route
						path="/Settings"
						render={(props) => (
							<div>
								<Settings {...props} getUserID={this.getUserID} />
								<Navigation getUserID={this.getUserID} />
							</div>
						)}
					/>
					<Route
						path="/Upload"
						render={(props) => (
							<div>
								<Upload {...props} getUserID={this.getUserID} isUserPaid={this.isUserPaid} />
								<Navigation getUserID={this.getUserID} />
							</div>
						)}
					/>
					<Route
						path="/Edit"
						render={(props) => (
							<div>
								<OutfitEdit {...props} getUserID={this.getUserID} />
								<Navigation getUserID={this.getUserID} />
							</div>
						)}
					/>
					<Route
						path="/Closet"
						render={(props) => (
							<div className="App">
								<Closet {...props} getUserID={this.getUserID} />
								<Navigation getUserID={this.getUserID} />
							</div>
						)}
					/>
				</Switch>
			</div>
		);
	}
}

export default App;
