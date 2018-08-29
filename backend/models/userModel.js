const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 11;

const UserSchema = new mongoose.Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {
        username: {
            type: String,
            unique: true,
            lowercase: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
        }
    },
    google: {
        id: {
            type: String
        },
        username: {
            type: String,
            // unique: true,
            lowercase: true,
        },
        email: {
            type: String,
            lowercase: true,
            // unique: true,
        },
        thumbnail: {
            type: String
        }
    },
    facebook: {
        id: {
            type: String
        },
        username: {
            type: String,
            // unique: true,
            lowercase: true,
        },
        email: {
            type: String,
            lowercase: true,
            // unique: true,
        },
        picture: String,
        token: String
    },
    phone: {
        type: String,
        default: '',
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
    },
    rEmails: {
        type: Boolean,
        required: true,
        default: false,
    },
    rTexts: {
        type: Boolean,
        required: true,
        default: false,
    },
});

// Hash passwords when user is created
UserSchema.pre('save', function(next) {
    console.log('entered');
    if(this.method !== 'local') {
        next();
    }
    bcrypt.hash(this.local.password, saltRounds, (err, hash) => {
        if (err) return next(err);
        console.log('success');
        this.local.password = hash;
        console.log(this.local.password);
        next();
    });
})

// Method to check user inputted password against hashed password
UserSchema.methods.validPassword = async function(passwordGuess) {
    try {
        return await bcrypt.compare(passwordGuess, this.local.password);
    } catch(err) {
        console.log(err);
    }
};
  

module.exports = mongoose.model("User", UserSchema);
