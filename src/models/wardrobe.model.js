const mongoose = require("mongoose");

const wardrobeSchema = new mongoose.Schema({
  person: {
    type: String,
    required: true,
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
  buff: {
    type: Buffer,
  },
  img: {
    type: Buffer,
  },
});

wardrobeSchema.methods.toJSON = function () {
  const wardrobe = this;
  const wardrobeObject = wardrobe.toObject();
  return wardrobeObject;
};

const Wardrobe = mongoose.model("Wardrobe", wardrobeSchema);
module.exports = Wardrobe;
