import React from 'react';
import './Billings.css';

class Billings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ccn: '',
            exp: '',
            cvv: '',
        }
    }

    handleInputCHange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <div className='container--billing'>
                <div className='billing--header'>
                    <h1>Billing </h1>
                    <h5>Payment Info </h5>
                </div>
                <form className='billing--form'>
                    <input
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
                    />
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

export default Billings;