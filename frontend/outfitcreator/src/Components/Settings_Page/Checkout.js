import './billing.css';
import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import PaymentForm from './PaymentForm';

class Checkout extends React.Component {
	constructor() {
		super();
		this.state = { stripe: null };
	}

	render() {
		return (
			<div className="Checkout">
				<h2>Subscribe to the Outfit Creator!</h2>
				<div>
					<b>With the pro version, you get great features like:</b>
				</div>
				<div>Unlimited item uploads</div>
				<div>Improved category selection</div>
				<br />
				<div>
					<b>Enter your payment information below to get started!</b>
				</div>
				<StripeProvider stripe={this.props.stripe}>
					<Elements>
						<PaymentForm userID={this.props.userID} />
					</Elements>
				</StripeProvider>
			</div>
		);
	}
}

export default Checkout;
