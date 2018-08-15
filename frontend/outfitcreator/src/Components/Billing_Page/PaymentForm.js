import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class PaymentForm extends Component {
    constructor(props){
        super(props);
        this.state = { complete: false };
        this.submit = this.submit.bind(this);
    }

    async submit() {
        let {token} = await this.props.stripe.createToken({name: "Name"});
        let response = await fetch("localhost:5000/pay/", {
            method: "POST",
            headers: {"Content-Type": "text/plain"},
            body: token.id
        });

        if (response.ok) this.setState({complete: true});
    }

    render() {
        if (this.state.complete) return (<h1>Payment Complete!</h1>)
        return (
            <div className="checkout">
                <p>Would you like to subscribe?</p>
                <CardElement/>
                <button onClick={this.submit}>Send</button>
            </div>
        )
    }
}

export default injectStripe(PaymentForm);