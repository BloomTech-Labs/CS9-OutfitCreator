const Outfit = require("./models/outfitModel");

// Add a new outfit to the database
server.post("/", (req, res) => {
    const { user, name, tags, worn, top, bottom, shoes } = req.body;
    Outfit.create({ user, name, tags, worn, top, bottom, shoes })
      .then(outfit => {
        res.status(201).json(outfit);
      })
      .catch(err => {
        res.send(500).json({ error: err.message });
      });
  });

// Get all outfits for a user
server.get("/:user", (req, res) => {
    const user = req.params.user;
    Outfit.find({
      user
    })
      .populate()
      .then(outfits => {
        res.status(200).json(outfits);
      })
      .catch(err => {
        res.send({ error: err.message });
      });
  });
  
  // Get a specific outfit by ID
server.get("/:id", (req, res) => {
    const id = req.params.id;
    Outfit.findById(id)
      .then(outfit => {
        res.status(200).json(outfit);
      })
      .catch(err => {
        res.send({ error: err.message });
      });
  });

  // Delete a specific outfit
  server.delete("/:id", (req, res) => {
    Outfit.findByIdAndRemove(req.params.id)
      .then(res.status(200).json(`successfully deleted outfit ${req.params.id}`))
      .catch(err => {
        res.send(500).json({ error: err.message });
      });
  });