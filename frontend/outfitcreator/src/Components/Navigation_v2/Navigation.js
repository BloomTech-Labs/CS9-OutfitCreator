import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

import { ROOT_URL } from '../../config.js';
import CR_Logo from '../../media/images/cr_logo.png';
import { Icons } from '../../media/icons/index.js';
import './Navigation.css';

class Navigation extends Component {
	constructor(props) {
    super(props);

		this.state = {
      currentPage: props.location.pathname.slice(1),
    };
    
    this.allPages = {
      upload: 'Add Item',
      closet: 'My Closet',
      create: 'New Outfit',
      archive: 'Outfit Archive',
    };

		this.setAuthToken();
	}

	setAuthToken = () => {
		const token = localStorage.getItem('authToken');
		if (token) axios.defaults.headers.common.Authorization = token;
		else delete axios.defaults.headers.common.Authorization;
	};

	componentDidMount() {
    
	}

	selectActivePage() {

	}

	toggleNavbar = () => {

	};

	navSettings() {

	}

	signOut() {
		localStorage.removeItem('authToken');
		window.location = `${ROOT_URL.WEB}/`;
	}

	render() {
		return (
      <div className="navigation-container">
        <img alt="closet roulette logo" className="navigation-logo" src={CR_Logo}></img>
        <div className="navigation-pages">
          {Object.keys(this.allPages).map(page => (
            <div className={`navigation-page page-${page}`} key={page}>
              <h2><a href={`${ROOT_URL.WEB}/${page}`}>{this.allPages[page]}</a></h2>
            </div>
          ))}
        </div>
        <img alt="user options icon" className="navigation-user" src={Icons.userCircle}></img>
      </div>
    )
  }
}

export default withRouter(Navigation);
