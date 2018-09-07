import React, { Component } from 'react';
import {
	Col,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink,
	Row
} from 'reactstrap';
import axios from 'axios';
import classnames from 'classnames';

import { ROOT_URL } from '../../config';
import Checkout from './Checkout';
import Cancel from './Cancel';
import './Settings.css';
import './billing.css';

class Settings extends Component {
	state = {
		oldPassword: '',
		newPassword: '',
		activeTab: '1',
		stripe: null,
		userID: null,
		subscribed: null,
		subscription: null
	};

	componentDidMount() {
		const userID = this.props.getUserID();
		const authToken = localStorage.getItem('authToken');
		const requestOptions = {
			headers: { Authorization: authToken }
		};

		if (authToken) {
			axios
				.get(`${ROOT_URL.API}/user/info/${userID}`, requestOptions)
				.then((res) => {
					this.setState(res.data);
					this.setState({
						userID: res.data._id,
						subscribed: res.data.paid,
						subscription: res.data.stripe_sub
					});
				})
				.catch((err) => err);
		} else {
			this.props.history.push('/');
		}

		// get user info from server to see if user is subscribed
		if (window.Stripe) {
			this.setState({ stripe: window.Stripe('pk_test_vRQk70zZL34BhEqLJJtqp29z') });
		} else {
			document.querySelector('#stripe-js').addEventListener('load', () => {
				this.setState({ stripe: window.Stripe('pk_test_vRQk70zZL34BhEqLJJtqp29z') });
			});
		}
	}

	updateUserInfo = () => {
		axios
			.put(`${ROOT_URL.API}/user/info/${this.state.userID}`, this.state)
			.then(() => {
				alert('Info updated');
			})
			.catch(() => {
				alert('Failed to updated Information');
			});
	};

	handleInputChange = (e) => {
		if ([ 'rEmails', 'rTexts' ].includes(e.target.name)) {
			this.setState({ [e.target.name]: e.target.checked });
		} else if (e.target.name === 'email') {
			const local = { ...this.state.local };
			local.email = e.target.value;
			this.setState({ local: local });
		} else this.setState({ [e.target.name]: e.target.value });
	};

	toggle = (tab) => {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	};

	render() {
		return this.state.local ? (
			<div className="settingsPage">
				<Nav pills className="settingsPage--login-nav">
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === '1' })}
							onClick={() => {
								this.toggle('1');
							}}
						>
							Settings
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === '2' })}
							onClick={() => {
								this.toggle('2');
							}}
						>
							Billing
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={this.state.activeTab}>
					<TabPane tabId="1">
						<Row>
							<Col sm="12">
								<Form>
									<FormGroup row>
										<Label for="userEmail" sm={4}>
											Email:
										</Label>
										<Col sm={8}>
											<Input
												type="email"
												name="email"
												id="userEmail"
												placeholder="user@gmail.com"
												value={this.state.local.email}
												onChange={this.handleInputChange}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label for="userPhone" sm={4}>
											Phone:
										</Label>
										<Col sm={8}>
											<Input
												type="text"
												name="phone"
												id="userPhone"
												placeholder="555-789-1234"
												value={this.state.phone}
												onChange={this.handleInputChange}
											/>
										</Col>
									</FormGroup>
									<FormGroup check inline>
										<Label check>
											<Input
												type="checkbox"
												name="rEmails"
												checked={this.state.rEmails}
												onClick={this.handleInputChange}
											/>
											Emails?
										</Label>
									</FormGroup>
									<FormGroup check inline>
										<Label check>
											<Input
												type="checkbox"
												name="rTexts"
												checked={this.state.rTexts}
												onClick={this.handleInputChange}
											/>
											Texts?
										</Label>
									</FormGroup>
									<FormGroup row>
										<Label for="userOldPassword" sm={5}>
											Old Password
										</Label>
										<Col sm={7}>
											<Input
												type="password"
												name="oldPassword"
												id="userOldPassword"
												placeholder="Enter old password"
												value={this.state.oldPassword}
												onChange={this.handleInputChange}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label for="usernewPassword" sm={5}>
											New Password
										</Label>
										<Col sm={7}>
											<Input
												type="password"
												name="newPassword"
												id="userNewPassword"
												placeholder="Enter new password"
												value={this.state.newPassword}
												onChange={this.handleInputChange}
											/>
										</Col>
									</FormGroup>
									<FormGroup check row>
										<Button className="button" onClick={this.updateUserInfo}>
											Save
										</Button>
									</FormGroup>
								</Form>
							</Col>
						</Row>
					</TabPane>
					<TabPane tabId="2">
						<Row>
							<Col sm="12">
								{this.state.subscribed === false || this.state.subscribed === null ? (
									<Checkout stripe={this.state.stripe} userID={this.state.userID} />
								) : (
									<Cancel
										stripe={this.state.stripe}
										userID={this.state.userID}
										subscription={this.state.subscription}
									/>
								)}
							</Col>
						</Row>
					</TabPane>
				</TabContent>
			</div>
		) : (
			<div>Loading...</div>
		);
	}
}

export default Settings;
