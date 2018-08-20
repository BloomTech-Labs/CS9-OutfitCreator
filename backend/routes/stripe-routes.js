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
    email: ,
    source: ,
})

const subscription = stripe.plans.create({
    product: {
        name: 'Outfit Creator',
        type: 'service',
    },
    nickname: 'outfit creator',
    currency: 'usd',
    interval: 'month',
    amount: 1000,
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