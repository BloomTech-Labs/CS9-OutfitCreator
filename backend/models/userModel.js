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
    phone: {
        type: String,
    },
    paid: {
        type: Boolean,
        required: true,
        default: false,
    },
    stripe_cust: {
        type: String,
    },
    stripe_sub: {
        type: String,
    }
});

// Hash passwords when user is created
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 11, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
})

// Hash password guess and check against user password
UserSchema.methods.validPassword = function(passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};
  

module.exports = mongoose.model("User", UserSchema);
