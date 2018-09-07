const User = require("../models/userModel");
const { makeToken } = require("../config/passport-setup");
const { generateSignupKey, sendEmail } = require('../config/mailer');
const { ROOT_URL } = require('../config/root-urls');

// Register a new user
exports.signup = (req, res) => {
  const { username, password, email } = req.body;

  User.findOne({ 'local.email': email })
    .then(existingUser => {
      // If user with that email exists
      if (existingUser) {
        // if user already signed up locally
        if (existingUser.local.password) {
          return res.status(409).json({ message: 'problem signing up' });
        } else {
          // else user signed up using social auth, link accounts
          existingUser.newPassword(password)
            .then((newPassword) => {
              const target = { 'local.email': email }
              const update = {
                local: { email, username, password: newPassword }
              };
              const options = { new: true, runValidators: true };
              // Update user and generate JWT. User is already verified by social-auth
              User.findOneAndUpdate(target, update, options)
                .exec()
                .then(user => {
                  const token = makeToken(user);
                  res.status(201).json({ token });
                })
                .catch(err => {
                  console.log(err);
                  return next(err);
                })
            })
            .catch(err => {
              console.log(err);
            })
        }
      } else {
        const key = generateSignupKey();
        const user = new User({
          method: 'local',
          local: {
            username,
            password,
            email
          },
          signupKey: key
        });
        user.save().then(user => {
          // Send verification email
          const subject = "Closet Roulette | Email Verification Required";
          const url = `${ROOT_URL.WEB}/verify/${key.key}`;
          const html = `Hi ${user.local.username},
                <br/>
                Thank you for registering for Closet Roulette!
                <br/><br/>
                Please verify your email by clicking this link: <a href="${url}">${url}</a>
                <br/>
                Have a pleasant day.`;
          const text = `Please click here to verify your email: ${url}`;
          sendEmail(email, subject, html, text)
            .then(() => {
              console.log('email sent (authentication.js > 124)');
            })
            .catch((err) => {
              console.log(err);
              return next(err);
            });

          const token = makeToken(user);
          res.status(201).json({ token });
        })
          .catch(err => {
            res.status(500).json(err);
          })
      }
    })
};

// Login
exports.login = (req, res) => {
  res.status(200).json({ token: makeToken(req.user), user: req.user })
}

// Logout
exports.logout = (req) => req.headers;

exports.verifyEmail = (req, res) => {
  const key = req.body.key;
  const target = {
    'signupKey.key': key,
    'signupKey.exp': { $gt: Date.now() }
  };
  const updates = {
    verified: true
  };
  const options = { new: true };

  User.findOneAndUpdate(target, updates, options)
    .exec()
    .then(user => {
      if (!user) {
        return res.status(400).json({ message: 'Sorry, your token has expired, please try again.' });
      } else {
        const token = makeToken(user);
        res.status(201).json({ token });
      }
    })
    .catch(err => {
      return res.status(400).json({ message: err });
    });
}
