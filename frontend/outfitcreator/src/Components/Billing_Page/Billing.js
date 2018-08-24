import './billing.css';
import React from 'react';
import Checkout from './Checkout';
import Cancel from './Cancel';

class Billing extends React.Component {
    constructor() {
        super();
        this.state = {
            stripe: null,
            subscribed: false,
        };
    }
    componentDidMount() {
        // get user info from server to see if user is subscribed
        if (window.Stripe) {
            this.setState({stripe: window.Stripe("pk_test_vRQk70zZL34BhEqLJJtqp29z")})
        } else {
            document.querySelector('#stripe-js').addEventListener('load', () => {
                this.setState({stripe: window.Stripe("pk_test_vRQk70zZL34BhEqLJJtqp29z")});
            });
        };
    }
    
    render() {
            //TODO: change subscription prop for Cancel button to a user profile reference.
            //TODO: conditional rendering -- show Cancel if already subscribed, otherwise Checkout
            return (
                <div className='container--billing'>
                    {this.state.subscribed
                    ?<Cancel stripe = {this.state.stripe} subscription='sub_DSE0Hm8zCEYQNK'/>
                    :<Checkout stripe={this.state.stripe}/>
                    }
                </div>
            )};
};

export default Billing;