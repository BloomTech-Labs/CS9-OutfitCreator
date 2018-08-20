import './billing.css';
import React from 'react';
import Checkout from './Checkout';

class Billing extends React.Component {
    constructor() {
        super();
        this.state = {stripe: null};
    }
    componentDidMount() {
        if (window.Stripe) {
            this.setState({stripe: window.Stripe("pk_test_vRQk70zZL34BhEqLJJtqp29z")})
        } else {
            document.querySelector('#stripe-js').addEventListener('load', () => {
                this.setState({stripe: window.Stripe("pk_test_vRQk70zZL34BhEqLJJtqp29z")});
            });
        };
    }
    
    render() {
        if (this.state.stripe == null){
            return (
                <div>
                    <h1>Having trouble loading Stripe...</h1>
                </div>
            )} else {
            return (
                <div>
                    <h2>Subscribe to the Outfit Creator!</h2>
                    <Checkout stripe={this.state.stripe}/>
                </div>
            )}
    };
};

export default Billing;