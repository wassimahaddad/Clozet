const mongoose = require("mongoose");

const Person = mongoose.model("Person", {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  shirt_size: {
    type: String,
  },
  pants_size: {
    type: String,
  },
  dress_size: {
    type: String,
  },
  shoe_size: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = Person;
