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
		//TODO: add a user email
		return (
			<div className="Checkout">
				<h2>Subscribe to the Outfit Creator!</h2>
				<p>
					<b>With the pro version, you get great features like:</b>
				</p>
				<p>Unlimited item uploads</p>
				<p>More detailed saved outfit data</p>
				<p>Plan your outfits ahead and get reminders</p>
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
