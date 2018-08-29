const router = require("express").Router();
const passport = require("passport");

const { authenticate, googleAuthenticate, googleRedirectAuthenticate, signToken } = require("../config/passport-setup");
const users = require("../controllers/users");


router.post('/signup', users.signup);
router.post('/login', authenticate, users.login);
router.get('/google', googleAuthenticate);
router.get('/google/redirect', googleRedirectAuthenticate, signToken);

// auth login
// router.get("/login", (req, res) => {
//   res.send("Please login");
// });

// auth logout
// router.get("/logout", (req, res) => {
//   // handle with passport
//   req.logout();
//   res.redirect("/");
// });

// // auth with google+
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"]
//   })
// );

// // callback route for google to redirect to
// router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
//   res.redirect("/profile");
// });

// auth with facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"]
  })
);

// callback route for facebook to redirect to
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/login"
  })
);

// auth with github
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user"]
  })
);

// callback route for github to redirect to
router.get("/github/callback", passport.authenticate("github"), (req, res) => {
  res.redirect("/profile");
});

// Google/Facebook/Github buttons to be implemented in React page
module.exports = router;
