const router = require("express").Router();
const passport = require("passport");
const User = require("../models/userModel");

// Add a new user to the database
router.post("/signup", (req, res) => {
    const { username, password, email } = req.body;
    User.create({ username, password, email })
      .then(user => {
        passport.authenticate('local', {successRedirect: '/' });
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

// Get a User's profile data
router.get("/info/:id", (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.send(500).json({error: err.message});
        });
});

// Mark a user as subscribed and add stripe customer/subscription IDs
router.post("/subscribe/:id", (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, {
        paid: true,
        stripe_sub: req.body.stripe_sub,
        stripe_cust: req.body.stripe_cust,
    })
        .then(res.status(201).json("Subscribed!"))
        .catch(err => {
            res.send(500).json({ error: err.message });
        });
});

// Mark a user as unsubscribed
router.post("/unsubscribe/:id", (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, {paid: false})
        .then(res.status(201).json("Unsubscribed!"))
        .catch(err => {
            res.send(500).json({error: err.message});
        })
})

module.exports = router;