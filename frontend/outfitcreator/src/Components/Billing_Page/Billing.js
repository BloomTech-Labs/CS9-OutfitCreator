import './billing.css';
import React from 'react';
import Checkout from './Checkout';
import Cancel from './Cancel';
import axios from 'axios';

class Billing extends React.Component {
    constructor() {
        super();
        this.state = {
            stripe: null,
            userID: null,
            subscribed: null,
            subscription: null,
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('authToken');
        if (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            const userdata = JSON.parse(window.atob(base64));
            this.setState({ userID: userdata.sub });
        }
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
            return (
                <div className='container--billing'>
                    {(this.state.subscribed == (false || null))
                    ?<Checkout stripe={this.state.stripe}/>
                    :<Cancel stripe = {this.state.stripe} subscription={this.state.subscription}/>
                    }
                </div>
            )};
};

export default Billing;