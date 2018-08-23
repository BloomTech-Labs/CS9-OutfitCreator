const router = require("express").Router();

const { authenticate } = require("../config/passport-setup");
const users = require("../controllers/users");

router.post('/signup', users.signup);
router.post('/login', authenticate, users.login);
router.get('/logout', users.logout);

module.exports = router;