import './billing.css';
import React from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import PaymentForm from './PaymentForm';

const Billing = (props) => {
    return (
        <div>
            <StripeProvider apiKey="pk_test_LwL4RUtinpP3PXzYirX2jNfR">
                <Elements>
                    <PaymentForm/>
                </Elements>
            </StripeProvider>
        </div>
    );
};

export default Billing;