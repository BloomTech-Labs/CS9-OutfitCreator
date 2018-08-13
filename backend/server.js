const express = require('express');
const server = express();
const mongoose = require('mongoose');
server.use(express.json());

const port = 5000;
const User = require('./models/userModel');
const Item = require('./models/itemModel');
const Outfit = require('./models/outfitModel');


mongoose.connect('mongodb://user:password123@ds163630.mlab.com:63630/outfit-creator')

server.get('/', (req, res) => {
    res.status(200).json("Server running")
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})