const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require('cors');
const cloudinary = require('cloudinary');

const port = process.env.PORT || 5000;
const User = require("./models/userModel");

const keys = require("./config/keys");

require('dotenv').config();

const cookieSession = require("cookie-session");
const passport = require("passport");
//const passportSetup = require("./config/passport-setup");

const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const stripeRoutes = require("./routes/stripe-routes");
const userRoutes = require("./routes/user-routes");
const outfitRoutes = require("./routes/outfit-routes");
const itemRoutes = require("./routes/item-routes");

// set up server
const server = express();
const corsOptions = {
  origin: "*",
  credentials: true
}

// set up middlewares
server.use(cors(corsOptions));
server.use(helmet());
server.use(express.json());
server.use(cors());

//set up cookie-session
server.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: process.env.COOKIE_KEY
  })
);

// const upload = multer({
//   dest: './uploads/',
//   rename: (fieldname, filename) => {
//     return (filename + '.png');
//   },
// });


// set up passport. Initialize
server.use(passport.initialize());
server.use(passport.session());

// set up routes
server.use("/auth", authRoutes);
server.use("/profile", profileRoutes);
server.use("/pay", stripeRoutes);
server.use("/user", userRoutes)
server.use("/items", itemRoutes);
server.use("/outfits", outfitRoutes);

mongoose.connect(process.env.DB_URI, {useNewUrlParser:true}).then(() => {

  console.log("Connected to MongoDB");
});

server.get("/", (req, res) => {
  res.status(200).json("Server running");
});


// Add a new user to the database
// QUESTION: Is this being used anywhere??
server.post("/signup", (req, res) => {
  const { username, password, email } = req.body;
  User.create({ username, password, email })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});



// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
