import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

import { ROOT_URL } from '../../config.js';
import CR_Logo from '../../media/images/cr_logo.png';
import { Icons } from '../../media/icons/index.js';

// Top fixed navigation component is used to navigate Closet Roulette
// User should have access to this component across entire application
// Composed of top nav bar and drawer nav for user options
// Condensed into full drawer nav for smaller screen sizes
class Navigation extends Component {
	constructor(props) {
		super(props);

		// State controls how the component is displayed
		this.state = {
			currentPage: props.location.pathname.slice(1),
			fullSideNav: false,
			navCollapsed: true,
			sideNavOpen: false
		};

		// Page and Option references for iteration

		this.mainPages = {
			upload: 'Add Item',
			closet: 'My Closet',
			create: 'New Outfit',
			archive: 'Outfit Archive',
		};

		this.userOptions = {
			settings: 'Settings',
			// billing: 'Billing',
			signout: 'Sign Out',
		};

		// Precompose lists to avoid reiterating over references

		this.mainPagesList = Object.keys(this.mainPages).map((page) => (
			<React.Fragment key={page}>
				<a href={`${ROOT_URL.WEB}/${page}`}>
					<ListItem button key={this.mainPages[page]}>
						<ListItemText primary={this.mainPages[page]} />
					</ListItem>
				</a>
				<Divider />
			</React.Fragment>
		));

		this.userOptionsList = Object.keys(this.userOptions).map((option) => (
			<React.Fragment key={option}>
				{option === 'signout' ? (
					<a href={`${ROOT_URL.WEB}/`}>
						<ListItem button key={this.userOptions[option]} onClick={this.signOut}>
							<ListItemText primary={this.userOptions[option]} />
						</ListItem>
					</a>
				) : (
					<a href={`${ROOT_URL.WEB}/${option}`}>
						<ListItem button key={this.userOptions[option]}>
							<ListItemText primary={this.userOptions[option]} />
						</ListItem>
						<Divider />
					</a>
				)}
			</React.Fragment>
		));

		this.setAuthToken();
	}

	// Verify user and set header for axios server requests
	setAuthToken = () => {
		const token = localStorage.getItem('authToken');
		if (token) axios.defaults.headers.common.Authorization = token;
		else delete axios.defaults.headers.common.Authorization;
	};

	// Initialize component structure and listen for resize event
	componentDidMount() {
		this.updateDimensions();
		window.addEventListener('resize', this.updateDimensions);
	}

	// Set state to influence component style
	updateDimensions = () => {
		if (window.innerWidth < 700) {
			this.setState({ navCollapseActive: true, fullSideNav: true });
		} else if (this.state.navCollapseActive) {
			this.setState({ navCollapseActive: false, fullSideNav: false });
		}
	};

	toggleDrawer = () => {
		this.setState({ sideNavOpen: !this.state.sideNavOpen });
	};

	signOut() {
		localStorage.removeItem('authToken');
	}

	render() {
		// Compose list for drawer nav based on state
		const sideList = (
			<List className="navigation-drawer-list">
				{this.state.fullSideNav ? this.mainPagesList : null}
				{this.userOptionsList}
			</List>
		);

		return (
			<div className="navigation-container">
				<img alt="closet roulette logo" className="navigation-logo" src={CR_Logo} />
				{this.state.navCollapseActive ? (
					<div className="navigation-pages clickable" onClick={this.toggleDrawer}>
						<p className="navigation-current-page">
							{this.mainPages[this.state.currentPage] || this.userOptions[this.state.currentPage]}
						</p>
					</div>
				) : (
					<div className="navigation-pages">
						{Object.keys(this.mainPages).map((page) => (
							<div className="clickable" key={page}>
								{this.state.currentPage === page ? (
									<span className="navigation-page-indicator" />
								) : null}
								<a href={`${ROOT_URL.WEB}/${page}`}>{this.mainPages[page]}</a>
							</div>
						))}
					</div>
				)}
				<img
					alt="user options icon"
					className="navigation-user clickable"
					onClick={this.toggleDrawer}
					src={Icons.userCircle}
				/>
				<Drawer anchor="right" open={this.state.sideNavOpen} onClose={this.toggleDrawer}>
					<div tabIndex={0} role="button" onClick={this.toggleDrawer} onKeyDown={this.toggleDrawer}>
						{sideList}
					</div>
				</Drawer>
			</div>
		);
	}
}

// Export with router so that we can use pathname in the constructor
export default withRouter(Navigation);
