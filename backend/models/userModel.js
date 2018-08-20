const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    paid: {
        type: Boolean,
        required: true,
        default: false,
    }
});

// UserSchema.pre('create', function(next) {
//     bcrypt.hash(this.password, 11, (err, hash) => {
//         if (err) return next(err);
//         this.password = hash;
//         next();
//     });
// })

// UserSchema.methods.validPassword = async function(passwordGuess, cb) {
//   const match = await bcrypt.compare(passwordGuess, this.password);
//   return match;
// };

UserSchema.methods.validPassword = function(passwordGuess) {
  return this.password === passwordGuess;
}
  

module.exports = mongoose.model("User", UserSchema);
