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

class Navigation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentPage: props.location.pathname.slice(1),
			fullSideNav: false,
			navCollapsed: true,
			sideNavOpen: false
		};

		this.mainPages = {
			upload: 'Add Item',
			closet: 'My Closet',
			create: 'New Outfit',
			archive: 'Outfit Archive'
		};

		this.userOptions = {
			settings: 'Settings',
			billing: 'Billing',
			signout: 'Sign Out'
		};

		this.mainPagesList = Object.keys(this.mainPages).map((page) => (
			<React.Fragment key={page}>
				<a href={`${ROOT_URL.WEB}/${page}`}>
					<ListItem className="navigation-divide" button key={this.mainPages[page]}>
						<ListItemText primary={this.mainPages[page]} />
					</ListItem>
				</a>
				<Divider />
			</React.Fragment>
		));

		this.userOptionsList = Object.keys(this.userOptions).map((option) => (
			<React.Fragment key={option}>
				{option === 'signout' ? (
					<ListItem
						className="navigation-divide"
						button
						key={this.userOptions[option]}
						onClick={this.signOut}
					>
						<ListItemText primary={this.userOptions[option]} />
					</ListItem>
				) : (
					<a href={`${ROOT_URL.WEB}/${option}`}>
						<ListItem className="navigation-divide" button key={this.userOptions[option]}>
							<ListItemText primary={this.userOptions[option]} />
						</ListItem>
					</a>
				)}
				<Divider />
			</React.Fragment>
		));

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
		if (window.innerWidth < 600) {
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
		window.location = `${ROOT_URL.WEB}/`;
	}

	render() {
		const sideList = (
			<div className="navigation-side-nav">
				<List>
					{this.state.fullSideNav ? this.mainPagesList : null}
					{this.userOptionsList}
				</List>
			</div>
		);

		return (
			<div className="navigation-container">
				<img alt="closet roulette logo" className="navigation-logo" src={CR_Logo} />
				{this.state.navCollapseActive ? (
					<div className="navigation-pages clickable" onClick={this.toggleDrawer}>
						<div className={`navigation-page page-${this.state.currentPage}`}>
							{this.mainPages[this.state.currentPage]}
						</div>
					</div>
				) : (
					<div className="navigation-pages">
						{Object.keys(this.mainPages).map((page) => (
							<div className={`navigation-page page-${page} clickable`} key={page}>
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

export default withRouter(Navigation);
