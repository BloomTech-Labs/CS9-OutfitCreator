const router = require("express").Router();
const User = require("../models/userModel");

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

router.post("/subscribe/:user", (req, res) => {
    const user = req.params.user;
    User.findByIdAndUpdate(user, {paid: true})
        .then(res.status(201).json("Subscribed!"))
        .catch(err => {
            res.send(500).json({ error: err.message });
        });
});

router.post("/unsubscribe/:user", (req, res) => {
    const user = req.params.user;
    User.findByIdAndUpdate(user, {paid: false})
        .then(res.status(201).json("Unsubscribed!"))
        .catch(err => {
            res.send(500).json({error: err.message});
        })
})

module.exports = router;