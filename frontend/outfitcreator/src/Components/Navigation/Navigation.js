import React, { Component } from 'react';
import { Collapse, Nav, NavLink } from 'reactstrap';
import { withRouter } from 'react-router';
import { ROOT_URL } from '../../config.js';
import axios from 'axios';
import './Navigation.css';

class Navigation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			collapsed: true,
			collapseActive: false,
			username: ''
		};

		this.setAuthToken();
	}

	setAuthToken = () => {
		const token = localStorage.getItem('authToken');

		if (token) axios.defaults.headers.common.Authorization = token;
		else delete axios.defaults.headers.common.Authorization;
	};

	componentDidMount() {
		this.selectActivePage();
		this.updateDimensions();

		window.addEventListener('resize', this.updateDimensions);

		if (localStorage.getItem('authToken') && !this.state.username) {
			const userID = this.props.getUserID();

			axios
				.get(`${ROOT_URL.API}/user/info/${userID}`)
				.then((res) => {
					this.setState({ username: res.data.local.username });
				})
				.catch((err) => err);
		}
	}

	updateDimensions = () => {
		this.selectActivePage();

		if (window.innerWidth < 850) {
			this.setState({ collapseActive: true });
		} else if (this.state.collapseActive) {
			this.setState({ collapsed: true, collapseActive: false });
		}
	};

	currentPageName = () => {
    const activePage = this.props.match.path.slice(1).toLowerCase();
		const pageLinks = document.querySelectorAll('.nav--item');
		let name = '';

		pageLinks.forEach((link) => {
			if (link.id === activePage) name = link.innerHTML;
		});

		return name;
	};

	selectActivePage() {
		const activePage = this.props.match.path.slice(1).toLowerCase();
		const pageLinks = document.querySelectorAll('.nav--item');

		pageLinks.forEach((link) => {
			if (link.id === activePage) {
				link.classList.add('nav--active');
			} else {
				link.classList.remove('nav--active');
			}
		});
	}

	toggleNavbar = () => {
		this.selectActivePage();

		const navMin = document.querySelector('.navigation--minimize');
		const sideNav = document.querySelector('.navigation--pages');
		const delay = 250;

		if (this.state.collapsed) {
			navMin.classList.toggle('change');
			sideNav.classList.toggle('sideNav--expanded');
			setTimeout(() => {
				navMin.classList.toggle('cross');
			}, delay);
		} else {
			navMin.classList.toggle('cross');
			setTimeout(() => {
				sideNav.classList.toggle('sideNav--expanded');
				navMin.classList.toggle('change');
			}, delay);
		}

		this.setState({
			collapsed: !this.state.collapsed
		});
	};

	navSettings() {
		window.location = `${ROOT_URL.WEB}/settings`;
	}

	signOut() {
		localStorage.removeItem('authToken');
		window.location = `${ROOT_URL.WEB}/`;
	}

	render() {
		return this.state.collapseActive ? (
			<div className="navigation--container">
				<div className="navigation--minimize" onClick={this.toggleNavbar}>
					<div className="bar1" />
					<div className="bar2" />
					<div className="bar3" />
				</div>
				<div className="navigation--current-page nav--active">{this.currentPageName()}</div>
				<Nav className="navigation--pages">
					<Collapse isOpen={!this.state.collapsed}>
						<NavLink href="/upload">
							<button id="upload" className="nav--item">Add Item</button>
						</NavLink>
						<NavLink href="/closet">
							<button id="closet" className="nav--item">My Closet</button>
						</NavLink>
						<NavLink href="/create">
							<button id="create" className="nav--item nav--active">New Outfit</button>
						</NavLink>
						<NavLink href="/archive">
							<button id="archive" className="nav--item">Outfit Archive</button>
						</NavLink>
					</Collapse>
				</Nav>
				<div className="navigation--user-options">
					<div onClick={this.navSettings} className="navigation--user">
						{this.state.username}
					</div>
					<div onClick={this.signOut} className="navigation--logout">
						logout
					</div>
				</div>
			</div>
		) : (
			<div className="navigation--container">
				<div className="navigation--site-title">Closet Roulette</div>
				<Nav className="navigation--pages">
					<NavLink href="/upload">
						<button id="upload" className="nav--item">Add Item</button>
					</NavLink>
					<NavLink href="/closet">
						<button id="closet" className="nav--item">My Closet</button>
					</NavLink>
					<NavLink href="/create">
						<button id="create" className="nav--item">New Outfit</button>
					</NavLink>
					<NavLink href="/archive">
						<button id="archive" className="nav--item">Outfit Archive</button>
					</NavLink>
				</Nav>
				<div className="navigation--user-options">
					<div onClick={this.navSettings} className="navigation--user">
						{this.state.username}
					</div>
					<div onClick={this.signOut} className="navigation--logout">
						logout
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Navigation);
