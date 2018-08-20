const router = require("express")();
const keys = require("../config/keys");
const cors = require('cors');
const stripe = require("stripe")(keys.stripe.secretkey);

router.use(require("body-parser").text());

// set up cors options
const corsOptions = {
    origin: '*'
  };

const customer = stripe.customers.create({
    //this will return a new Customer object.
    //Store customer.id in database with user profile info
    //and be ready to submit that info  when creating the subscription
    email: 'ellen.nitchals@gmail.com', // should be passed along from the user-routes
    source: req.body, // this may need to be sent to the server separately, with the server response submitted here
})

const plan = stripe.plans.create({
    //this will return a new Plan object.
    //keep the plan.id handy for creating the subscription
    product: {
        name: 'Outfit Creator',
        type: 'service',
    },
    nickname: 'outfit creator',
    currency: 'usd',
    interval: 'month',
    amount: 1000,
})

const subscription = stripe.subscriptions.create({
    customer: '',
    items: [{plan: ''}]
})

router.post("/charge", cors(corsOptions), async (req, res) => {
    try {
        let {status} = await stripe.charges.create({
            amount: 1000, // $10 USD payment
            currency: "usd",
            description: "monthly subscription fee",
            source: req.body
        });

        res.json({status});
    } catch (err) {
        res.status(500).end();
    }
})

module.exports = router;