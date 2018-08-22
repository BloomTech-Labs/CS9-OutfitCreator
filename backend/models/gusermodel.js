const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuserSchema = new Schema({
  google: {
    username: String,
    googleId: String,
    thumbnail: String,
    email: String
  },
  facebook: {
    username: String,
    facebookId: String,
    email: String,
    picture: String,
    token: String
  },
  github: {
    username: String,
    githubId: String,
    thumbnail: String,
    email: String
  }
});

const Guser = mongoose.model("guser", GuserSchema);
module.exports = Guser;
