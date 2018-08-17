const express = require("express");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;
const User = require("./models/userModel");
const Item = require("./models/itemModel");
const Outfit = require("./models/outfitModel");
const Profile = require("./models/profileModel");

require('dotenv').config();

const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const passportSetup = require("./config/passport-setup");

const sessionOptions = {};

// API WISHLIST
// ---------------
// Middleware to protect most routes
// Edit an item's properties
// Edit an outfit's properties
// Delete a specific item
// Delete a specific outfit
// Get all items for a user
// Get all outfits for a user
// Create a new user profile
// Edit a user profile

// set up server
const server = express();
server.use(express.json());

//set up cookie-session
server.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: process.env.COOKIE_KEY
  })
);

// set up passport. Initialize
server.use(passport.initialize());
server.use(passport.session());

// set up routes
server.use("/auth", authRoutes);
server.use("/profile", profileRoutes);

mongoose.connect(process.env.DB_URI, {useNewUrlParser:true}).then(() => {
  console.log("Connected to MongoDB");
});

server.get("/", (req, res) => {
  res.status(200).json("Server running");
});

// API WISHLIST
// HOW WILL THE FOLLOWING WORK WITH OAUTH?
// POST - Register new User
// MIDDLEWARE - to protect routes by requiring user login
// POST - Log in as specific User
// PUT - Change User details

// Add a new item to the database
server.post("/item", (req, res) => {
  const { profile, name, image, type, tags } = req.body;
  Item.create({ profile, name, image, type, tags })
    .then(item => {
      res.status(201).json(item);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Add a new outfit to the database
server.post("/outfit", (req, res) => {
  const { profile, name, tags, worn, top, bottom, shoes } = req.body;
  Outfit.create({ profile, name, tags, worn, top, bottom, shoes })
    .then(outfit => {
      res.status(201).json(outfit);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Add an array of tags to a specific item
server.post("/item/:id/tags", (req, res) => {
  const { tags } = req.body;
  const id = req.params.id;
  Item.findById(id)
    .then(item => {
      item.tags = item.tags.concat(tags);
      item.save();
    })
    .then(res.status(200).json("success!"))
    .catch(err => {
      res.status(500).json({ error: err.message });
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

// Get all items with a certain tag
server.get("/search/:tag", (req, res) => {
    const tag = req.params.tag;
    const { id } = req.body;
    Item.find({
        tags: tag,
        profile: id
    })
    .populate()
    .then(items => {
        res.status(200).json(items);
    })
    .catch(err => {
        res.sent({error: err.message});
    });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
