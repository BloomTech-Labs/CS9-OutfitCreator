const router = require('express').Router();

const {
	authenticate,
	googleAuthenticate,
	googleRedirectAuthenticate,
	facebookAuthenticate,
	facebookRedirectAuthenticate,
	githubAuthenticate,
	githubRedirectAuthenticate,
	signToken
} = require('../config/passport-setup');
const users = require('../controllers/users');

router.post('/signup', users.signup);
router.post('/login', authenticate, users.login);
router.get('/google', googleAuthenticate);
router.get('/google/redirect', googleRedirectAuthenticate, signToken);
router.get('/facebook', facebookAuthenticate);
router.get('/facebook/callback', facebookRedirectAuthenticate, signToken);
router.get('/github', githubAuthenticate);
router.get('/github/callback', githubRedirectAuthenticate, signToken);
router.post('/verify', users.verifyEmail);
router.post('/sendverifyemail', users.sendVerifyEmail);

module.exports = router;
