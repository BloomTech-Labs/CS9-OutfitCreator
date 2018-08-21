const Outfit = require("../models/outfitModel");

const router = require("express").Router();

// Add a new outfit to the database
router.post("/", (req, res) => {
  const { user, name, tags, worn, top, bottom, shoes } = req.body;
  console.log(user, name, tags, worn, top, bottom, shoes);
  Outfit.create({ user, name, tags, worn, top, bottom, shoes })
    .then(outfit => {
      res.sendStatus(201).json(outfit);
    })
    .catch(err => {
      res.json({ error: err.message });
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
      res.json({ error: err.message });
    });
});

// Get a specific outfit by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Outfit.findById(id)
    .then(outfit => {
      res.status(200).json(outfit);
    })
    .catch(err => {
      res.json({ error: err.message });
    });
});

// Delete a specific outfit
router.delete("/:id", (req, res) => {
  Outfit.findByIdAndRemove(req.params.id)
    .then(res.status(200).json(`successfully deleted outfit ${req.params.id}`))
    .catch(err => {
      res.json({ error: err.message });
    });
});

module.exports = router;
