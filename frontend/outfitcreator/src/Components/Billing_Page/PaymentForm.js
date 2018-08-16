import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

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
        let {token} = await this.props.stripe.createToken({name: "Name"});
        let response = await fetch("http://localhost:5000/pay/charge", {
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
                <button className="button" onClick={this.submit}>Send</button>
            </div>
        )
    }
}

export default injectStripe(PaymentForm);