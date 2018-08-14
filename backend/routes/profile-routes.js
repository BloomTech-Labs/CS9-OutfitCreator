const router = require("express").Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

router.get("/", authCheck, (req, res) => {
  res.send(
    "Successfully logged in! This is your profile: " + req.user.username
  );
});

//create a profile page in frontend
module.exports = router;
