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

// UserSchema.methods.checkPassword(plainTextPW, this.password, (err, isMatch) => {
//     bcrypt.compare(passwordGuess, this.password, (err, isMatch) => {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// })

module.exports = mongoose.model("User", UserSchema);
