import "./billing.css";
import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import PaymentForm from "./PaymentForm";

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = { stripe: null };
  }
  // componentDidMount() {
  //     if (window.Stripe) {
  //         this.setState({stripe: window.Stripe("pk_test_vRQk70zZL34BhEqLJJtqp29z")})
  //     } else {
  //         document.querySelector('#stripe-js').addEventListener('load', () => {
  //             this.setState({stripe: window.Stripe("pk_test_vRQk70zZL34BhEqLJJtqp29z")});
  //         });
  //     }
  //}

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
