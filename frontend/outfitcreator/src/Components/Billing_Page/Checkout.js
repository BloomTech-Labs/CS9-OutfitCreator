import "./billing.css";
import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import PaymentForm from "./PaymentForm";

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = { stripe: null };
  }

  render() {
    //TODO: add a user email
    return (
      <div className="Checkout">
        <StripeProvider stripe={this.props.stripe}>
          <Elements>
            <PaymentForm />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}

export default Checkout;
