const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

require('dotenv').config();

const { ROOT_URL } = require('./root-urls.js');
const User = require('../models/userModel');
const secret = process.env.SECRET;

// Local Strategy
const localStrategy = new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
	// Use async function for awaiting promise in user.validPassword
	User.findOne({ 'local.email': email }, async function(err, user) {
		if (err) return done(err);
		if (!user) {
			return done(null, false);
		}
		if (!await user.validPassword(password)) {
			return done(null, false);
		}
		if (!user.verified) {
			return done({ message: 'Sorry, you must validate email first' }, false);
		}
		return done(null, user);
	});
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret
};

// Passport strategy for securing RESTful endpoints using JWT
const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
	User.findById(payload.sub)
		.select('-password')
		.then((user) => {
			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		})
		.catch((err) => {
			done(err, false);
		});
});

// Google OAuth Strategy
const googleStrategy = new GoogleStrategy(
	{
		callbackURL: '/auth/google/redirect',
		clientID: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET
	},
	(accessToken, refreshToken, profile, done) => {
		User.findOne({ $or: [ { 'google.id': profile.id }, { 'local.email': profile.emails[0].value } ] })
			.then((existingUser) => {
				if (existingUser) {
					if (existingUser.google.id == undefined) {
						existingUser.google.id = profile.id;
						existingUser.google.username = profile.displayName;
						existingUser.google.email = profile.emails[0].value;
						existingUser.google.thumbnail = profile._json.image.url;
						existingUser.save();
					}
					done(null, existingUser);
				} else {
					let newUser = new User({
						method: 'google',
						google: {
							id: profile.id,
							email: profile.emails[0].value,
							username: profile.displayName,
							thumbnail: profile._json.image.url
						}
					});
					newUser.local.email = profile.emails[0].value;
					newUser.local.username = profile.displayName;
					newUser.verified = true;
					newUser.save().then((newUser) => {
						done(null, newUser);
					});
				}
			})
			.catch((err) => {
				done(err, false, err.message);
			});
	}
);

const facebookStrategy = new FacebookStrategy(
	{
		callbackURL: '/auth/facebook/callback',
		clientID: process.env.FB_CLIENT_ID,
		clientSecret: process.env.FB_CLIENT_SECRET,
		profileFields: [ 'id', 'displayName', 'name', 'gender', 'photos', 'email' ]
	},
	(accessToken, refreshToken, profile, done) => {
		User.findOne({ $or: [ { 'facebook.id': profile.id }, { 'local.email': profile.emails[0].value } ] })
			.then((existingUser) => {
				if (existingUser) {
					if (existingUser.facebook.id == undefined) {
						existingUser.facebook.id = profile.id;
						existingUser.facebook.username = profile.displayName;
						existingUser.facebook.email = profile.emails[0].value;
						existingUser.facebook.picture = profile._json.picture.data.url;
						existingUser.facebook.token = accessToken;
						existingUser.save();
					}
					done(null, existingUser);
				} else {
					let newUser = new User({
						method: 'facebook',
						facebook: {
							id: profile.id,
							username: profile.displayName,
							email: profile.emails[0].value,
							picture: profile._json.picture.data.url,
							token: accessToken
						}
					});
					newUser.local.email = profile.emails[0].value;
					newUser.local.username = profile.displayName;
					newUser.verified = true;
					newUser.save().then((newUser) => {
						done(null, newUser);
					});
				}
			})
			.catch((err) => {
				done(err, false, err.message);
			});
	}
);
const githubStrategy = new GitHubStrategy(
	{
		callbackURL: '/auth/github/callback',
		clientID: process.env.GH_CLIENT_ID,
		clientSecret: process.env.GH_CLIENT_SECRET,
		scope: 'user'
	},
	(accessToken, refreshToken, profile, done) => {
		User.findOne({ $or: [ { 'github.id': profile.id }, { 'local.email': profile.emails[0].value } ] })
			.then((existingUser) => {
				if (existingUser) {
					if (existingUser.github.id === undefined) {
						existingUser.github.id = profile.id;
						existingUser.github.username = profile.username;
						existingUser.github.email = profile.emails[0].value;
						existingUser.github.thumbnail = profile._json.avatar_url;
						existingUser.save();
					}
					done(null, existingUser);
				} else {
					let newUser = new User({
						method: 'github',
						github: {
							id: profile.id,
							username: profile.username,
							email: profile.emails[0].value,
							thumbnail: profile._json.avatar_url
						}
					});
					newUser.local.email = profile.emails[0].value;
					newUser.local.username = profile.username;
					newUser.verified = true;
					newUser.save().then((newUser) => {
						done(null, newUser);
					});
				}
			})
			.catch((err) => {
				done(err, false, err.message);
			});
	}
);

// passport global middleware
passport.use(localStrategy);
passport.use(jwtStrategy);
passport.use(googleStrategy);
passport.use(facebookStrategy);
passport.use(githubStrategy);

// passport local middleware
const passportOptions = { session: false };
const googleOptions = { session: false, scope: [ 'profile', 'email' ] };
const facebookOptions = { session: false, scope: [ 'email' ] };
const githubOptions = { session: false, scope: [ 'user' ] };

const authenticate = passport.authenticate('local', passportOptions);
const restricted = passport.authenticate('jwt', passportOptions);
const googleAuthenticate = passport.authenticate('google', googleOptions);
const facebookAuthenticate = passport.authenticate('facebook', facebookOptions);
const githubAuthenticate = passport.authenticate('github', githubOptions);
const googleRedirectAuthenticate = passport.authenticate('google', passportOptions);
const facebookRedirectAuthenticate = passport.authenticate('facebook', passportOptions);
const githubRedirectAuthenticate = passport.authenticate('github', passportOptions);

function makeToken(user) {
	const timestamp = new Date().getTime();
	const payload = {
		iss: 'Closet Roulette',
		sub: user._id,
		iat: timestamp
	};
	const options = {
		expiresIn: '7d'
	};
	return jwt.sign(payload, secret, options);
}

// Issue Token
const signToken = (req, res) => {
	const timestamp = new Date().getTime();
	const payload = {
		sub: req.user._id,
		iat: timestamp,
		username: req.user.username
	};
	const options = {
		expiresIn: '7d'
	};
	jwt.sign(payload, secret, options, (err, token) => {
		if (err) {
			res.redirect(`${ROOT_URL.WEB}/login#err=${err}`);
		} else {
			res.redirect(`${ROOT_URL.WEB}/upload#token=${token}`);
		}
	});
};

module.exports = {
	authenticate,
	restricted,
	googleAuthenticate,
	googleRedirectAuthenticate,
	facebookAuthenticate,
	facebookRedirectAuthenticate,
	githubAuthenticate,
	githubRedirectAuthenticate,
	makeToken,
	signToken
};
