import './billing.css';
import React from 'react';
import Checkout from './Checkout';

const Billing = (props) => {
    return (
        <div>
            <h2>Subscribe to the Outfit Creator!</h2>
            <Checkout/>
        </div>
    );
};

export default Billing;