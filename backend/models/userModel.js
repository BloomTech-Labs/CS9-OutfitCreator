const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  googleId: String,
  // password: {
  //   type: String,
  //   required: true
  // }
});

// const GuserSchema = new Schema ({
//   username: String,
//   googleId: String
// });

// const Guser = mongoose.model('guser', GuserSchema);
// module.exports = Guser;

module.exports = mongoose.model("User", UserSchema);
