const router = require("express")();
const keys = require("../config/keys");
const cors = require('cors');
const stripe = require("stripe")(keys.stripe.secretkey);

router.use(require("body-parser").text());

// set up cors options
const corsOptions = {
    origin: '*'
  };
  
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