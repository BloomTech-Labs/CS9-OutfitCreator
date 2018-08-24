const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 5000; // HTTPS: changed port to use https on 5000
const User = require("./models/userModel");

require("dotenv").config();

// const cookieSession = require("cookie-session");
const passport = require("passport");
// const passportSetup = require("./config/passport-setup");

const localAuthRoutes = require("./routes/local-auth-routes");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const stripeRoutes = require("./routes/stripe-routes");
const userRoutes = require("./routes/user-routes");
const outfitRoutes = require("./routes/outfit-routes");
const itemRoutes = require("./routes/item-routes");

// // HTTPS: set up
// const path = require("path");
// const fs = require("fs");
// const https = require("https");
// // HTTPS: certifications
// const certification = {
//   key: fs.readFileSync(path.resolve("./ssl/server.key")),
//   cert: fs.readFileSync(path.resolve("./ssl/server.crt"))
// };

// set up server
const server = express();
const originUrl = process.env.NODE_ENV === 'production' ? `https://lambda-outfit-creator.herokuapp.com` : `http://localhost:3000`
const corsOptions = {
  origin: (originUrl),
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// set up middlewares
server.use(cors(corsOptions));
server.use(helmet());
server.use(express.urlencoded({ extended:false }));
server.use(express.json());

// //set up cookie-session
// server.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [process.env.COOKIE_KEY]
//   })
// );

// const upload = multer({
//   dest: './uploads/',
//   rename: (fieldname, filename) => {
//     return (filename + '.png');
//   },
// });

// set up passport. Initialize
// server.use(passport.initialize());
// server.use(passport.session());

// Allow passport to utilize sessions
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });

mongoose
  .connect(
    process.env.DB_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

server.get("/", (req, res) => {
  res.status(200).json("Server running");
});



// set up routes
server.use("/local-auth", localAuthRoutes);
server.use("/auth", authRoutes);
server.use("/profile", profileRoutes);
server.use("/pay", stripeRoutes);
server.use("/user", userRoutes);
server.use("/items", itemRoutes);
server.use("/outfits", outfitRoutes);

// Add a new user to the database
// QUESTION: Is this being used anywhere??
// server.post("/signup", (req, res) => {
//   const { username, password, email } = req.body;
//   User.create({ username, password, email })
//     .then(user => {
//       passport.authenticate('local', { successRedirect: '/' });
//       res.status(201).json(user);
//     })
//     .catch(err => {
//       res.status(500).json({ error: err.message });
//     })
// });

//HTTPS: server start
// https.createServer(certification, server).listen(5000);

// Catch-all error handler
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ err });
})

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
