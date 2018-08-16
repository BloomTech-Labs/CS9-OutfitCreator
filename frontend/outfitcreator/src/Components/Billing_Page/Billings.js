import React from 'react';
import './Billings.css';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    injectStripe
} from 'react-stripe-elements';

const createOptions = (fontSize, padding) => {
    return {
        style: {
            base: {
                fontSize,
                color: '#424770',
                letterSpacing: '0.025em',
                fontFamily: 'Source Code Pro, monospace',
                '::placeholder': {
                    color: '#aab7c4',
                },
                padding,
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };
};

class Billings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ccn: '',
            exp: '',
            cvv: '',
        }
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        if (this.props.stripe) {
            this.props.stripe
                .createToken()
                .then((payload) => console.log('[token]', payload));
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
    };

    handleInputCHange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <div className='container--billing'>
                <div className='billing--header'>
                    <h1>Billing </h1>
                    <h5 className='billing--info'>Payment Info </h5>
                </div>
                <form className='billing--form' onSubmit={this.handleSubmit}>
                    {/* <input
                        type='text'
                        id='ccn'
                        name='ccn'
                        placeholder='Card Number'
                        className='billing--input billing--number'
                        required autocomplete="cc-number"
                        value={this.state.ccn}
                        onChange={this.state.handleInputChange}
                    />
                    <input
                        type='date'
                        id='exp'
                        name='exp'
                        placeholder="MM-YYYY"
                        className='billing--input billing--exp'
                        autoComplete='cc-exp'
                        value={this.state.exp}
                        onChange={this.state.handleInputChange}
                    />
                    <input
                        type='password'
                        id='cvv'
                        name='cvv'
                        required placeholder='CVV'
                        className='billing--input billing--cvv'
                        autocomplete="cc-csc"
                        value={this.state.cvv}
                        onChange={this.state.handleInputChange}
                    /> */}
                    <label>
                        Card number
          <CardNumberElement
                            className='billing--input'
                            {...createOptions(this.props.fontSize)}
                        />
                    </label>
                    <label>
                        Expiration date
          <CardExpiryElement
                            className='billing--input'
                            {...createOptions(this.props.fontSize)}
                        />
                    </label>
                    <label>
                        CVC
          <CardCVCElement
                            className='billing--input'
                            {...createOptions(this.props.fontSize)}
                        />
                    </label>
                </form>
                <div className='billing--consent'>
                    <label>
                        <input
                            type='checkbox'
                            name='consent'
                            value={this.state.accept}
                        />
                        I understand that this is a monthly subscription of $20
                </label>
                </div>
                <button >Buy Now</button>
            </div>
        );
    }
};

export default injectStripe(Billings);