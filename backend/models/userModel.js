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
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
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
      lowercase: true,
    },
    email: {
      type: String,
      lowercase: true,
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
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      lowercase: true,
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
  verified: {
    type: Boolean,
    default: false
  },
  signupKey: {
    key: String,
    ts: String,
    exp: String
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

// Hash passwords before saving to database
UserSchema.pre('save', function (next) {
  if (this.method !== 'local') {
    next();
  }
  bcrypt.hash(this.local.password, saltRounds, (err, hash) => {
    if (err) return next(err);
    this.local.password = hash;
    next();
  });
})

// Hash passwords on update
UserSchema.pre('update', function (next) {
  if (!this.isModified('local.password')) return next();
  bcrypt.hash(this.local.password, saltRounds, (err, hash) => {
    if (err) return next(err);
    this.local.password = hash;
    next();
  });
})

// Method to check user inputed password against hashed password
UserSchema.methods.validPassword = async function (passwordGuess) {
  try {
    return await bcrypt.compare(passwordGuess, this.local.password);
  } catch (err) {
    return err;
  }
};

UserSchema.methods.newPassword = async function (password) {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (err) {
    return err;
  }
};


module.exports = mongoose.model("User", UserSchema);
