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

// Update an outfit by id
router.put('/:user/:id', (req, res) => {
  const id = req.params.id;
  const newInfo = req.body;
  Outfit.findByIdAndUpdate(id, newInfo)
  .then(outfit => {
    console.log(outfit)
    res.status(200).json(outfit);
  })
  .catch(err => {
    res.status(500).json({ error: err});
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

module.exports = router;
