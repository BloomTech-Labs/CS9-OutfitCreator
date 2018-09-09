const router = require('express')();
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_KEY);

router.use(require('body-parser').text());

// set up cors options
const corsOptions = {
	origin: '*'
};

router.post('/charge', cors(corsOptions), async (req, res) => {
	stripe.customers
		.create({
			//this will return a new Customer object.
			//Store customer.id in database with user profile info
			email: 'test@example.com', //TODO: how to extract this data from the request?
			source: req.body.token
		})
		.then((customer) => {
			stripe.plans
				.create({
					product: {
						name: 'Outfit Creator',
						type: 'service'
					},
					nickname: 'outfit creator',
					currency: 'usd',
					interval: 'month',
					amount: 1000
				})
				.then((plan) => {
					stripe.subscriptions
						.create({
							customer: customer.id,
							items: [ { plan: plan.id } ]
						})
						.then((subscription) => {
							const data = { stripe_cust: customer.id, stripe_sub: subscription.id };
							res.status(200).json(data);
						})
						.catch((err) => err);
				})
				.catch((err) => err);
		})
		.catch((err) => err);
});

router.post('/cancel', cors(corsOptions), async (req, res) => {
	stripe.subscriptions.del(req.body.sub, { at_period_end: true });
	res.status(200).json('success');
});

module.exports = router;
