const router = require('express').Router();
const {
	authenticate,
	googleAuthenticate,
	googleRedirectAuthenticate,
	facebookAuthenticate,
	facebookRedirectAuthenticate,
	signToken
} = require('../config/passport-setup');
const users = require('../controllers/users');

router.post('/signup', users.signup);
router.post('/login', authenticate, users.login);
router.get('/google', googleAuthenticate);
router.get('/google/redirect', googleRedirectAuthenticate, signToken);
router.get('/facebook', facebookAuthenticate);
router.get('/facebook/callback', facebookRedirectAuthenticate, signToken);
router.post('/verify', users.verifyEmail);

// // auth with github
// router.get(
//   "/github",
//   passport.authenticate("github", {
//     scope: ["user"]
//   })
// );

// // callback route for github to redirect to
// router.get("/github/callback", passport.authenticate("github"), (req, res) => {
//   res.redirect("/profile");
// });

// Google/Facebook/Github buttons to be implemented in React page
module.exports = router;
