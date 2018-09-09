import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { ROOT_URL } from '../../config';
const axios = require('axios');
require('dotenv').config();

class PaymentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			complete: false,
			understood: false
		};
		this.submit = this.submit.bind(this);
	}

	async submit(e) {
		if (this.state.understood) {
			let { token } = await this.props.stripe.createToken({ name: 'Token' });
			axios
				.post(`${ROOT_URL.API}/pay/charge`, {
					token: token.id,
					email: 'test@testemail.com'
				})
				.then((res) => {
					this.setState({ complete: true });
					const authToken = localStorage.getItem('authToken');
					const requestOptions = {
						headers: {
							Authorization: authToken
						}
					};
					axios.post(
						`${ROOT_URL.API}/user/subscribe/${this.props.userID}`,
						{
							stripe_sub: res.data.stripe_sub,
							stripe_cust: res.data.stripe_cust
						},
						requestOptions
					);
				})
				.catch((err) => err);
		}
	}

	handleCheckbox = () => {
		this.setState({ understood: !this.state.understood });
	};

	render() {
		if (this.state.complete) return <h1>Payment Complete!</h1>;
		return (
			<div className="checkout">
				<CardElement />
				<div>
					<input
						type="checkbox"
						className="checkbox"
						checked={this.state.understood}
						ref="understood"
						onChange={this.handleCheckbox}
					/>
					I agree to subscribe at a cost of $10 per month
				</div>
				<br />
				<button className="button" onClick={this.submit}>
					Subscribe!
				</button>
			</div>
		);
	}
}

export default injectStripe(PaymentForm);
