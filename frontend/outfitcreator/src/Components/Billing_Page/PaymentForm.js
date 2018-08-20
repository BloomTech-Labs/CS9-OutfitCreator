import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
const keys = require("./config/keys");
// eslint-disable-next-line
const axios = require("axios");

class PaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = { complete: false };
        this.submit = this.submit.bind(this);
    }

    async submit(e) {
        //TODO: Refactor using Axios
        // axios.post(`${server}/pay/`, {
        // })
        console.log("submitting payment");
        let { token } = await this.props.stripe.createToken({ name: "Name" });
        let response = await fetch(`${keys.server}/pay/charge`, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: token.id
        });

        if (response.ok) {
            this.setState({ complete: true });
            // POST request to new endpoint to update subscription info
            // requires the user's mongoDB ID to be passed in

            //axios.post(`${server}/user/subscribe/${userID}`)
            //.then(res => {
            // does anything need to be updated on the client side?
            //}).catch(err => console.log(err));
        }
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