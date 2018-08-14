const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  googleId: String,
  password: {
    type: String,
    required: true
  }
});

 const User = mongoose.model("User", UserSchema);
 module.exports = User;
