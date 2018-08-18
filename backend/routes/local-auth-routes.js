const router = require("express").Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/userModel");

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) return done(err); 
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Routes
router.post("/login", 
  passport.authenticate("local", { 
    successRedirect: "/Create",
    failureRedirect: "/",
    failureFlash: true 
  })
  , (req, res) => {
    res.json('Signed in as user ' + req.body.username + '?');
  }
);

router.get("/logout", (req, res) => {
  console.log('testing');
  req.logout();
  res.redirect("/");
});

module.exports = router;