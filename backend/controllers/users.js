const User = require("../models/userModel");
const { makeToken } = require("../config/passport-setup");

// Register a new user
exports.signup = (req, res) => {
    const { username, password, email } = req.body;
    // const newUser = { username, password, email };
    // console.log(newUser) 
    const user = new User({
        method: 'local',
        local: {
            username,
            password,
            email
        }
    });
    user.save().then(user => {
        console.log(user)
        const token = makeToken(user);
        res.status(200).json({ token });
    })
    .catch(err => {
        res.status(500).json(err);
    })
};

// Login
exports.login = (req, res) => {
    res.status(200).json({ token: makeToken(req.user), user: req.user })
}

// Logout
exports.logout = (req, res) => {
    // if (req.session) {
    //     req.session.destroy(err => {
    //         if(err) res.status(500).json({ error: 'error logging out' });
    //         else res.status(200).send('Logged Out');
    //     });
    // } else {
    //     res.send('User not logged in.');
    // }
    // const token = req.headers.authorization.slice(7)
    // User.findOne({ token })
    // .then(user => user.update({ $set: { token: null } })
    //   .then(() => res.send('Logged out successfully')))
    // .catch(err => next(err))
    console.log(req.headers);
}
