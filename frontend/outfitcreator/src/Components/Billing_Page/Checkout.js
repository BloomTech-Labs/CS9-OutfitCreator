import './billing.css';
import React from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import PaymentForm from './PaymentForm';

const Checkout = (props) => {
    return (
        <div className="Checkout">
            <StripeProvider apiKey="pk_test_vRQk70zZL34BhEqLJJtqp29z">
                <Elements>
                    <PaymentForm/>
                </Elements>
            </StripeProvider>
        </div>
    );
};

export default Checkout;