const router = require('express').Router();
const { restricted } = require('../config/passport-setup');
const User = require('../models/userModel');

// Get a User's profile data
router.get('/info/:id', restricted, (req, res) => {
	const id = req.params.id;
	User.findById(id)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((err) => {
			res.send(500).json({ error: err.message });
		});
});

// Edit a User's profile data
router.put('/info/:id', restricted, async (req, res) => {
	const id = req.params.id;
	const settingsInfo = { ...req.body };

	await User.findById(id)
		.then(async (user) => {
			const match = await user.validPassword(settingsInfo.oldPassword);
			if (match) {
				settingsInfo.local.password = await user.newPassword(settingsInfo.newPassword);
			}

			User.findByIdAndUpdate(id, settingsInfo)
				.then((user) => {
					res.status(201).json(user);
				})
				.catch((err) => {
					res.status(500).json({ error: err.message });
				});
		})
		.catch((err) => err);
});

// Mark a user as subscribed
router.post('/subscribe/:id', restricted, (req, res) => {
	const id = req.params.id;
	User.findByIdAndUpdate(id, {
		paid: true,
		stripe_sub: req.body.stripe_sub,
		stripe_cust: req.body.stripe_cust
	})
		.then(res.status(201).json('Subscribed!'))
		.catch((err) => {
			res.send(500).json({ error: err.message });
		});
});

// Mark a user as unsubscribed
router.post('/unsubscribe/:id', restricted, (req, res) => {
	const id = req.params.id;
	User.findByIdAndUpdate(id, { paid: false }).then(res.status(201).json('Unsubscribed!')).catch((err) => {
		res.send(500).json({ error: err.message });
	});
});

module.exports = router;
