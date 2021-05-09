const mongoose = require("mongoose");

const clozetSchema = new mongoose.Schema({
  person: {
    type: String,
    // required: true,
  },
  item: {
    type: String,
    required: true,
  },
  season: {
    type: String,
    required: true,
  },

  size: {
    type: String,
    required: true,
  },

  in_storage: {
    type: Boolean,
    default: false,
  },
  storage_name: {
    type: String,
  },
  keeper: {
    type: Boolean,
    default: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  img: {
    type: Buffer,
    required: true,
  },
});

clozetSchema.methods.toJSON = function () {
  const clozet = this;
  const clozetObject = clozet.toObject();
  return clozetObject;
};

const Clozet = mongoose.model("Clozet", clozetSchema);
module.exports = Clozet;
