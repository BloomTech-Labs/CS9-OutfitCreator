import './billing.css';
import React from 'react';
import Checkout from './Checkout';
import Cancel from './Cancel';
import axios from 'axios';
import { ROOT_URL } from '../../config';

class Billing extends React.Component {
	constructor() {
		super();
		this.state = {
			stripe: null,
			userID: null,
			subscribed: null,
			subscription: null
		};
	}

	componentDidMount() {
		const user = this.props.getUserID();
		const authToken = localStorage.getItem('authToken');
		const requestOptions = {
			headers: {
				Authorization: authToken
			}
		};
		if (authToken) {
			axios
				.get(`${ROOT_URL.API}/user/info/${user}`, requestOptions)
				.then((res) => {
					this.setState({
						userID: res.data._id,
						subscribed: res.data.paid,
						subscription: res.data.stripe_sub
					});
				})
				.catch((err) => err);
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

	render() {
		return (
			<div className="container--billing">
				{this.state.subscribed === false || this.state.subscribed === null ? (
					<Checkout stripe={this.state.stripe} userID={this.state.userID} />
				) : (
					<Cancel
						stripe={this.state.stripe}
						userID={this.state.userID}
						subscription={this.state.subscription}
					/>
				)}
			</div>
		);
	}
}

export default Billing;
