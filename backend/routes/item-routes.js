const Item = require('../models/itemModel');
const router = require('express').Router();

require('dotenv').config();
router.post('/', (req, res) => {
	const { user, name, image, type, subtype, tags } = req.body;

	Item.create({ user, name, image, type, subtype, tags })
		.then((item) => {
			res.status(201).json(item);
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

// Get all items for a user
router.get('/user/:user', (req, res) => {
	const user = req.params.user;
	Item.find({
		user
	})
		.populate()
		.then((items) => {
			res.status(200).json(items);
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

// Get all items for a user filtered by a type
router.get('/type/:user/:type', (req, res) => {
	const { user, type } = req.params;
	Item.find({
		user
	})
		.populate()
		.then((items) => {
			const filteredItems = items.filter((item) => item.type == type);
			res.status(200).json(filteredItems);
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

// Get all items for a user filtered by a subtype
router.get('/type/:user/sub/:subtype', (req, res) => {
	const { user, subtype } = req.params;
	Item.find({
		user
	})
		.populate()
		.then((items) => {
			const filteredItems = items.filter((item) => item.subtype == subtype);
			res.status(200).json(filteredItems);
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

// Get a specific item of clothing by ID
router.get('/:user/:id', (req, res) => {
	const id = req.params.id;
	Item.findById(id)
		.then((item) => {
			res.status(200).json(item);
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

// Delete a specific item
router.delete('/:id', (req, res) => {
	Item.findByIdAndRemove(req.params.id)
		.then(res.status(200).json(`successfully deleted item ${req.params.id}`))
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

// Edit a specific item
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { name, type, tags } = req.body;
	Item.findByIdAndUpdate(id, { name, type, tags })
		.then(res.status(200).json(`successfully updated item`))
		.catch((err) => {
			res.send(500).json({ error: err.message });
		});
});

// Add an array of tags to a specific item
router.post('/tags/:id', (req, res) => {
	const { tags } = req.body;
	const id = req.params.id;
	Item.findById(id)
		.then((item) => {
			item.tags = item.tags.concat(tags);
			item.save();
		})
		.then(res.status(200).json('success!'))
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

// Delete a specific tag from a specific item
// This is not currently working -- needs troubleshooting
// When it's working, add a similar route to Outfits
router.post('/tags/delete/:id/:tag', (req, res) => {
	const { id, tag } = req.params;
	Item.findById(id)
		.then((item) => {
			if (item.tags.indexOf(tag) != -1) {
				let tags = item.tags.splice(item.tags.indexOf(tag), 1, 'test');
				item.tags = tags;
			}
			item.save();
		})
		.then(res.status(200).json('success!'))
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

// Get items by type for a user
router.get('/type/:user/:type', (req, res) => {
	const { user, type } = req.params;
	Item.find({
		type,
		user
	})
		.populate()
		.then((items) => {
			res.status(200).json(items);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Items could not be retreived at this time.' });
		});
});

// Get items by SUBtype for a user
router.get('/subtype/:user/:subtype', (req, res) => {
	const { user, subtype } = req.params;
	Item.find({
		subtype,
		user
	})
		.populate()
		.then((items) => {
			res.status(200).json(items);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Items could not be retreived at this time.' });
		});
});

// Get all of a user's items with a certain tag
router.get('/search/:user/:tag', (req, res) => {
	const { tag, user } = req.params;
	Item.find({
		tags: tag,
		user: user
	})
		.populate()
		.then((items) => {
			res.status(200).json(items);
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

module.exports = router;
