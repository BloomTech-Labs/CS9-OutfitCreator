const router = require("express").Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

router.get("/", authCheck, (req, res) => {
  if (req.user.google.username !== undefined) {
    res.send(
      `Successfully logged in with Google+ OAuth! This is your profile: ${
        req.user.google.username
      } and email: ${req.user.google.email}`
    );
  } else if (req.user.facebook.username !== undefined) {
    res.send(
      `Successfully logged in with Facebook OAuth! This is your profile: ${
        req.user.facebook.username
      } and email: ${req.user.facebook.email}`
    );
  } else {
    res.send(
      `Successfully logged in with Github OAuth! This is your profile: ${
        req.user.github.username
      } and email: ${req.user.github.email}`
    );
  }
});

//create a profile page in frontend
module.exports = router;
