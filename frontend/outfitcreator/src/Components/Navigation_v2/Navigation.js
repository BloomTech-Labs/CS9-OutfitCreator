import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

import { ROOT_URL } from '../../config.js';
import CR_Logo from '../../media/images/cr_logo.png';
import { Icons } from '../../media/icons/index.js';

class Navigation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentPage: props.location.pathname.slice(1),
			navCollapseActive: false,
			navCollapsed: true,
			settingsCollapsed: true
		};

		this.allPages = {
			upload: 'Add Item',
			closet: 'My Closet',
			create: 'New Outfit',
			archive: 'Outfit Archive'
		};

		this.setAuthToken();
	}

	setAuthToken = () => {
		const token = localStorage.getItem('authToken');
		if (token) axios.defaults.headers.common.Authorization = token;
		else delete axios.defaults.headers.common.Authorization;
	};

	componentDidMount() {
		this.updateDimensions();
		window.addEventListener('resize', this.updateDimensions);
	}

	updateDimensions = () => {
		if (window.innerWidth < 800) {
			this.setState({ collapseActive: true });
		} else if (this.state.collapseActive) {
			this.setState({ collapsed: true, collapseActive: false });
		}
	};

	// selectActivePage() {
	//   const current = document.querySelector(`.page-${this.state.currentPage}`);
	// }

	toggleNav = () => {};

	toggleSettings = () => {};

	navSettings() {}

	signOut() {
		localStorage.removeItem('authToken');
		window.location = `${ROOT_URL.WEB}/`;
	}

	render() {
		return (
			<div className="navigation-container">
				<img alt="closet roulette logo" className="navigation-logo" src={CR_Logo} />
				<div className={`navigation-pages`}>
					{this.state.collapseActive ? (
						<div className={`navigation-page page-${this.state.currentPage}`}>
							{this.allPages[this.state.currentPage]}
						</div>
					) : (
						Object.keys(this.allPages).map((page) => (
							<div className={`navigation-page page-${page}`} key={page}>
								{this.state.currentPage === page ? (
									<span className="navigation-page-indicator" />
								) : null}
								<span>
									<a href={`${ROOT_URL.WEB}/${page}`}>{this.allPages[page]}</a>
								</span>
							</div>
						))
					)}
				</div>
				<img alt="user options icon" className="navigation-user" src={Icons.userCircle} />
			</div>
		);
	}
}

export default withRouter(Navigation);
