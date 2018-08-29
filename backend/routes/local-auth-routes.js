const router = require("express").Router();

const { authenticate, googleAuthenticate, googleRedirectAuthenticate, makeToken } = require("../config/passport-setup");
const users = require("../controllers/users");

// router.post('/signup', users.signup);
// router.post('/login', authenticate, users.login);
// router.get('/google', googleAuthenticate);
// router.get('/google/redirect', googleRedirectAuthenticate, makeToken);

module.exports = router;