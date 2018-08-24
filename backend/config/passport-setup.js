const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

require("dotenv").config();

const Guser = require("../models/gusermodel");
const User = require("../models/userModel");
const secret = process.env.SECRET;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Guser.findById(id).then(user => {
    done(null, user);
  });
});

const localStrategy = new LocalStrategy(function(username, password, done) {
  // Use async function for awaiting promise in user.validPassword
  User.findOne({ username }, async function(err, user) {
    if (err) return done(err);
    if (!user) {
      return done(null, false);
    }
    if (!(await user.validPassword(password))) {
      return done(null, false);
    }
    return done(null, user);
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}

// Passport strategy for securing RESTful endpoints using JWT
const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub)
  .select('-password')
  .then(user => {
    if(user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
  .catch(err => {
    done(err, false);
  })
})

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    },
    (accessToken, refreshToken, profile, done) => {
      Guser.findOne({ "google.googleId": profile.id }).then(currentUser => {
        if (currentUser) {
          done(null, currentUser);
        } else {
          new Guser({
            "google.googleId": profile.id,
            "google.username": profile.displayName,
            "google.thumbnail": profile._json.image.url,
            "google.email": profile.emails[0].value
          })
            .save()
            .then(newUser => {
              done(null, newUser);
            });
        }
      });
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       callbackURL: "https://localhost:5000/auth/facebook/callback",
//       clientID: process.env.FB_CLIENT_ID,
//       clientSecret: process.env.FB_CLIENT_SECRET,
//       profileFields: ["id", "displayName", "name", "gender", "photos", "email"]
//     },
//     (accessToken, refreshToken, profile, done) => {
//       Guser.findOne({ "facebook.facebookId": profile.id }).then(currentUser => {
//         if (currentUser) {
//           done(null, currentUser);
//         } else {
//           new Guser({
//             "facebook.facebookId": profile.id,
//             "facebook.username": profile.displayName,
//             "facebook.picture": profile._json.picture.data.url,
//             "facebook.token": accessToken,
//             "facebook.email": profile.emails[0].value
//           })
//             .save()
//             .then(newUser => {
//               done(null, newUser);
//             });
//         }
//       });
//     }
//   )
// );

// passport.use(
//   new GitHubStrategy(
//     {
//       callbackURL: "/auth/github/callback",
//       clientID: process.env.GH_CLIENT_ID,
//       clientSecret: process.env.GH_CLIENT_SECRET,
//       scope: "user"
//     },
//     (accessToken, refreshToken, profile, done) => {
//       Guser.findOne({ "github.githubId": profile.id }).then(currentUser => {
//         if (currentUser) {
//           done(null, currentUser);
//         } else {
//           new Guser({
//             "github.githubId": profile.id,
//             "github.username": profile.username,
//             "github.thumbnail": profile._json.avatar_url,
//             "github.email": profile.emails[0].value
//           })
//             .save()
//             .then(newUser => {
//               done(null, newUser);
//             });
//         }
//       });
//     }
//   )
// );

// passport global middleware
passport.use(localStrategy);
passport.use(jwtStrategy);

// passport local middleware
const passportOptions = { session: false };
const authenticate = passport.authenticate('local', passportOptions);
const restricted = passport.authenticate('jwt', passportOptions);

function makeToken(user) {
  const timestamp = new Date().getTime();
  const payload = {
    sub: user._id,
    iat: timestamp,
    username: user.username
  };
  const options = {
    expiresIn: '24h'
  };
  return jwt.sign(payload, secret, options);
}

module.exports = { authenticate, restricted, makeToken }
