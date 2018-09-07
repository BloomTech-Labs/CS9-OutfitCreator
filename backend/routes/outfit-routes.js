const router = require('express').Router();
const { restricted } = require('../config/passport-setup');
const Outfit = require('../models/outfitModel');

// Add a new outfit to the database
router.post('/', (req, res) => {
	// Save items to outfit based on selection
	const { user, name, tags, worn, top, bottom, shoes } = req.body;
	Outfit.create({ user, name, tags, worn, top, bottom, shoes })
		.then((outfit) => {
			res.status(201).json(outfit);
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

// Get all outfits for a user
router.get('/:user', restricted, (req, res) => {
	const user = req.params.user;
	Outfit.find({
		user
	})
		.populate()
		.then((outfits) => {
			res.status(200).json(outfits);
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

// Get a specific outfit by ID
router.get('/:user/:id', restricted, (req, res) => {
	const id = req.params.id;
	Outfit.findById(id)
		.populate()
		.then((outfit) => {
			res.status(200).json(outfit);
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

// Update an outfit by id
router.put('/:user/:id', (req, res) => {
	const id = req.params.id;
	const newInfo = req.body;
	Outfit.findByIdAndUpdate(id, newInfo)
		.then((outfit) => {
			res.status(200).json(outfit);
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

// Delete a specific outfit
router.delete('/:id', restricted, (req, res) => {
	Outfit.findByIdAndRemove(req.params.id)
		.then(res.status(200).json(`successfully deleted outfit ${req.params.id}`))
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

// Edit a specific outfit
router.put('/:id', restricted, (req, res) => {
	const { id } = req.params;
	const { name, tags, top, bottom, shoes } = req.body;
	Outfit.findByIdAndUpdate(id, { name, tags, top, bottom, shoes })
		.then(res.status(200).json(`successfully updated outfit`))
		.catch((err) => {
			res.send(500).json({ error: err.message });
		});
});

// Mark a specific outfit as worn
router.post('/wear/:id', (req, res) => {
	const { id } = req.params;
	const { date } = req.body;
	Outfit.findById(id)
		.then((outfit) => {
			outfit.worn = outfit.worn.concat(date);
			outfit.save();
		})
		.then(res.status(200).json('success!'))
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

// Add an array of tags to a specific outfit
router.post('/tags/:id', restricted, (req, res) => {
	const { tags } = req.body;
	const id = req.params.id;
	Outfit.findById(id)
		.then((outfit) => {
			outfit.tags = outfit.tags.concat(tags);
			outfit.save();
		})
		.then(res.status(200).json('success!'))
		.catch((err) => {
			res.send(500).json({ error: err.message });
		});
});

// Get all of a user's outfits with a certain tag
router.get('/search/:user/:tag', restricted, (req, res) => {
	const { tag, user } = req.params;
	Outfit.find({
		tags: tag,
		user: user
	})
		.populate()
		.then((outfits) => {
			res.status(200).json(outfits);
		})
		.catch((err) => {
			res.send({ error: err.message });
		});
});

module.exports = router;
