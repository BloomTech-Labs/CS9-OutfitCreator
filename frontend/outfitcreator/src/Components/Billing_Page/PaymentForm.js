import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
const axios = require("axios");
require('dotenv').config();


class PaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = { complete: false };
        this.submit = this.submit.bind(this);
    }

    async submit(e) {
        let {token} = await this.props.stripe.createToken({name: "Token"});
        axios.post(`http://localhost:5000/pay/charge`, {
            token: token.id,
            email: 'test@testemail.com'
        })
        .then(res => {
            console.log(res.data);
            this.setState({complete: true});
            //axios request to set user as subscribed and store customer/subscription IDs.
            axios.post(`http://localhost:5000/user/subscribe/5b745597a48cb52b0c1baedf`, {
                stripe_sub: res.data.stripe_sub,
                stripe_cust: res.data.stripe_cust
            })
        })
        .catch(err => console.log(err));
        }

    render() {
        if (this.state.complete) return (<h1>Payment Complete!</h1>)
        return (
            <div className="checkout">
                <CardElement />
                <button className="button" onClick={this.submit}>Subscribe!</button>
            </div>
        )
    }
}

export default injectStripe(PaymentForm);