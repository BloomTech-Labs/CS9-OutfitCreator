const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuserSchema = new Schema({
  username: String,
  googleId: String,
  thumbnail: String
});

const Guser = mongoose.model("guser", GuserSchema);
module.exports = Guser;
