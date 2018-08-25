const Outfit = require("../models/outfitModel");

const router = require("express").Router();

// Add a new outfit to the database
router.post("/", (req, res) => {
  const { user, name, tags, worn, top, bottom, shoes } = req.body;
  Outfit.create({ user, name, tags, worn, top, bottom, shoes })
    .then(outfit => {
      res.sendStatus(201).json(outfit);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Get all outfits for a user
router.get("/:user", (req, res) => {
  const user = req.params.user;
  Outfit.find({
    user
  })
    .populate()
    .then(outfits => {
      res.status(200).json(outfits);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Get a specific outfit by ID
router.get("/:user/:id", (req, res) => {
  const id = req.params.id;
  Outfit.findById(id)
    .populate()
    .then(outfit => {
      res.status(200).json(outfit);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Delete a specific outfit
router.delete("/:id", (req, res) => {
  Outfit.findByIdAndRemove(req.params.id)
    .then(res.status(200).json(`successfully deleted outfit ${req.params.id}`))
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Edit a specific outfit
router.put("/:id", (req, res) => {
  const {id} = req.params;
  const { name, tags, top, bottom, shoes } = req.body;
  Outfit.findByIdAndUpdate(id, {name, tags, top, bottom, shoes})
    .then(res.status(200).json(`successfully updated outfit`))
    .catch(err => {
      res.send(500).json({error: err.message});
    });
});

// Mark a specific outfit as worn
router.post("/wear/:id", (req, res) => {
  const {id} = req.params;
  const { date } = req.body;
  Outfit.findById(id)
    .then(outfit => {
      outfit.worn = outfit.worn.concat(date);
      outfit.save();
    })
    .then(res.status(200).json("success!"))
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Add an array of tags to a specific outfit
router.post("/tags/:id", (req, res) => {
  const { tags } = req.body;
  const id = req.params.id;
  Outfit.findById(id)
    .then(outfit => {
      outfit.tags = outfit.tags.concat(tags);
      outfit.save();
    })
    .then(res.status(200).json("success!"))
    .catch(err => {
      res.send(500).json({ error: err.message });
    });
});

// Get all of a user's outfits with a certain tag
router.get("/search/:user/:tag", (req, res) => {
  const { tag, user } = req.params;
  Outfit.find({
    tags: tag,
    user: user
  })
    .populate()
    .then(outfits => {
      res.status(200).json(outfits);
    })
    .catch(err => {
      res.send({ error: err.message });
    });
});

module.exports = router;
