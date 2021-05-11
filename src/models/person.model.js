const mongoose = require("mongoose");

const Person = mongoose.model("Person", {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age_group: {
    type: String,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = Person;
