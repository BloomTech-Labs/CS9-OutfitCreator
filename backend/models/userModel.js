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

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 11, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
})

UserSchema.methods.validPassword = async function(passwordGuess) {
  return await bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model("User", UserSchema);
