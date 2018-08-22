const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

require("dotenv").config();

const Guser = require("../models/gusermodel");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Guser.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      callbackURL: "/auth/google/redirect",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      // console.log('Callback firing');
      // console.log(profile);
      Guser.findOne({ "google.googleId": profile.id }).then(currentUser => {
        if (currentUser) {
          //console.log("user is: ", currentUser);
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

passport.use(
  new FacebookStrategy(
    {
      // options for google strategy
      callbackURL: "https://localhost:5000/auth/facebook/callback",
      clientID: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
      profileFields: ["id", "displayName", "name", "gender", "photos", "email"]
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      // console.log("Callback firing");
      // console.log(profile._json, profile);
      Guser.findOne({ "facebook.facebookId": profile.id }).then(currentUser => {
        if (currentUser) {
          //console.log("user is: ", currentUser);
          done(null, currentUser);
        } else {
          new Guser({
            "facebook.facebookId": profile.id,
            "facebook.username": profile.displayName,
            "facebook.picture": profile._json.picture.data.url,
            "facebook.token": accessToken,
            "facebook.email": profile.emails[0].value
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

passport.use(
  new GitHubStrategy(
    {
      // options for google strategy
      callbackURL: "/auth/github/callback",
      clientID: process.env.GH_CLIENT_ID,
      clientSecret: process.env.GH_CLIENT_SECRET,
      scope: "user"
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      // console.log('Callback firing');
      // console.log(profile);
      Guser.findOne({ "github.githubId": profile.id }).then(currentUser => {
        if (currentUser) {
          //console.log("user is: ", currentUser);
          done(null, currentUser);
        } else {
          new Guser({
            "github.githubId": profile.id,
            "github.username": profile.username,
            "github.thumbnail": profile._json.avatar_url,
            "github.email": profile.emails[0].value
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
