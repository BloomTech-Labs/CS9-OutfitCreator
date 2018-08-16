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
                <form className='billing--form'>
                    <label htmlFor='ccn' >Card Number</label>
                    <br />
                    <input
                        type='text'
                        id='ccn'
                        name='ccn'
                        required placeholder='Card Number'
                        className='billing--number'
                        autoComplete='cc-number'
                        value={this.state.ccn}
                        onChange={this.state.handleInputChange}
                    />
                    <br />
                    <label htmlFor='exp' >Expiration Date</label>
                    <br />
                    <input
                        type='date'
                        id='exp'
                        name='exp'
                        required placeholder='Expiration Date'
                        className='billing--exp'
                        autoComplete='cc-exp'
                        value={this.state.exp}
                        onChange={this.state.handleInputChange}
                    />
                    <br />
                    <label htmlFor='cvv' >CVV</label>
                    <br />
                    <input
                        type='password'
                        id='cvv'
                        name='cvv'
                        required placeholder='CVV'
                        className='billing--cvv'
                        autoComplete='cc-csc'
                        value={this.state.cvv}
                        onChange={this.state.handleInputChange}
                    />
                </form>
            </div>
        );
    }
};

export default Billings;