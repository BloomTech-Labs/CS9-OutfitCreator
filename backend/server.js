const express = require("express");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;
const User = require("./models/userModel");
const Item = require("./models/itemModel");
const Outfit = require("./models/outfitModel");

// set up server
const server = express();
server.use(express.json());

mongoose
  .connect("mongodb://user:password123@ds163630.mlab.com:63630/outfit-creator")
  .then(() => {
    console.log("Connected to MongoDB");
  });

server.get("/", (req, res) => {
  res.status(200).json("Server running");
});

// Add a new user to the database
server.post("/signup", (req, res) => {
  const { username, password, email } = req.body;
  User.create({ username, password, email })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.send(500).json({ error: err.message });
    });
});

// Add a new item to the database
server.post("/item", (req, res) => {
  const { user, name, image, type, tags } = req.body;
  Item.create({ user, name, image, type, tags })
    .then(item => {
      res.status(201).json(item);
    })
    .catch(err => {
      res.send(500).json({ error: err.message });
    });
});

// Delete a specific item
server.delete("/item/:id", (req, res) => {
  Item.findByIdAndRemove(req.params.id)
    .then(res.status(200).json(`successfully deleted item ${req.params.id}`))
    .catch(err => {
      res.send(500).json({ error: err.message });
    });
});

// Add a new outfit to the database
server.post("/outfit", (req, res) => {
  const { user, name, tags, worn, top, bottom, shoes } = req.body;
  Outfit.create({ user, name, tags, worn, top, bottom, shoes })
    .then(outfit => {
      res.status(201).json(outfit);
    })
    .catch(err => {
      res.send(500).json({ error: err.message });
    });
});

// Delete a specific outfit
server.delete("/outfit/:id", (req, res) => {
  Outfit.findByIdAndRemove(req.params.id)
    .then(res.status(200).json(`successfully deleted outfit ${req.params.id}`))
    .catch(err => {
      res.send(500).json({ error: err.message });
    });
});

// Add an array of tags to a specific item
server.post("/item/tags/:id", (req, res) => {
  const { tags } = req.body;
  const id = req.params.id;
  Item.findById(id)
    .then(item => {
      item.tags = item.tags.concat(tags);
      item.save();
    })
    .then(res.status(200).json("success!"))
    .catch(err => {
      res.send(500).json({ error: err.message });
    });
});

// Get a specific item of clothing by ID
server.get("/item/:id", (req, res) => {
  const id = req.params.id;
  Item.findById(id)
    .then(item => {
      res.status(200).json(item);
    })
    .catch(err => {
      res.send({ error: err.message });
    });
});

// Get a specific outfit by ID
server.get("/outfit/:id", (req, res) => {
  const id = req.params.id;
  Outfit.findById(id)
    .then(outfit => {
      res.status(200).json(outfit);
    })
    .catch(err => {
      res.send({ error: err.message });
    });
});

// Get all of a user's items with a certain tag
server.get("/search/:user/:tag", (req, res) => {
  const { tag, user } = req.params;
  Item.find({
    tags: tag,
    user: user
  })
    .populate()
    .then(items => {
      res.status(200).json(items);
    })
    .catch(err => {
      res.send({ error: err.message });
    });
});

// Get all items for a user
server.get("/:user/items", (req, res) => {
  const user = req.params.user;
  Item.find({
    user
  })
    .populate()
    .then(items => {
      res.status(200).json(items);
    })
    .catch(err => {
      res.send({ error: err.message });
    });
});

// Get all outfits for a user
server.get("/:user/outfits", (req, res) => {
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

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
