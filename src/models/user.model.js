const mongoose = require("mongoose");
const Wardrobe = require("./wardrobe.model");
const { PASS_PHRASE } = require("../../config/keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: validator } = require("validator");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  avatar: {
    type: Buffer,
  },
});

//  virtual relationship between User and between Person and Wardrobe

userSchema.virtual("persons", {
  ref: "Person",
  localField: "_id",
  foreignField: "owner",
});
userSchema.virtual("wardrobe", {
  ref: "Wardrobe",
  localField: "_id",
  foreignField: "owner",
});

// ------------------------- hide password and tokens ---------------------------------

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  // delete userObject.avatar;

  return userObject;
};

// ------------------------- generate authentication token ---------------------------------

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, PASS_PHRASE, {
    expiresIn: "7 days",
  });

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// ------------------------- find user by email and password ---------------------------------

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("email and/or password is incorrect");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("email and/or password is incorrect");
  }

  return user;
};
// -------------------------- hashing the password --------------------------------------------

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});
// -------------------------- Remove wardrobes of removed user  --------------------------------------------

userSchema.pre("remove", async function (next) {
  const user = this;

  await Wardrobe.deleteMany({ owner: user._id });

  next();
});

// ----------------------------------------------------------

const User = mongoose.model("User", userSchema);

module.exports = User;
