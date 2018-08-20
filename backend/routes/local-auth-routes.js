const router = require("express").Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/userModel");

// LocalStrategy acts as middleware to check username and password 
// inputs against users in the database.
passport.use(new LocalStrategy(
  function(username, password, done) {
    // Use async function for awaiting promise in user.validPassword
    User.findOne({ username: username }, async function(err, user) {
      if (err) return done(err);
      if (!user) {
        return done(null, false);
      }
      if (!(await user.validPassword(password))) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));


// Allow passport to utilize sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Routes for local login and log out
router.post("/login", 
  passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

router.get("/logout", req => {
  req.logout();
});

module.exports = router;