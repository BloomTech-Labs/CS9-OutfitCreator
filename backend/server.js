const express = require('express');
const server = express();
const mongoose = require('mongoose');
server.use(express.json());

const port = 5000;
const User = require('./models/userModel');
const Item = require('./models/itemModel');
const Outfit = require('./models/outfitModel');


mongoose.connect('mongodb://user:password123@ds163630.mlab.com:63630/outfit-creator').then(() => {
    console.log('Connected to MongoDB');
});

server.get('/', (req, res) => {
    res.status(200).json("Server running")
})

// API WISHLIST
// POST - Register new User
// MIDDLEWARE - password hashing with bcrypt
// POST - Log in as specific User
// PUT - Change User details
// GET - specific item of clothing by ID
// GET - outfit by ID
// GET - all items with a certain tag



server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

