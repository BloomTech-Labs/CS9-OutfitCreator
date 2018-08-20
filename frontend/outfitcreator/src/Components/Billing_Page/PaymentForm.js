import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
const axios = require("axios");
require('dotenv').config();


class PaymentForm extends Component {
    constructor(props){
        super(props);
        this.state = { complete: false };
        this.submit = this.submit.bind(this);
    }

    async submit(e) {
        //TODO: Refactor using Axios
        // axios.post(`${server}/pay/`, {
        // })
        console.log("submitting payment");
        let {token} = await this.props.stripe.createToken({name: "Token"});
        let response = await fetch(`http://localhost:5000/pay/charge`, {//TODO: change to config var
            method: "POST",
            headers: {"Content-Type": "text/plain"},
            body: token.id,
            email: 'test@testemail.com' //TODO: change to customer email
        });

        if (response.ok) {
            console.log(response.body);
            this.setState({complete: true});
            // Data from response.body that needs to be stored with user profile data:
            // Customer.id
            // Subscription.id (for cancellation)
            
            // TODO: Make a post to update user profile subscription status
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
                <CardElement/>
                <button className="button" onClick={this.submit}>Subscribe!</button>
            </div>
        )
    }
}

export default injectStripe(PaymentForm);