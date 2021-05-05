const mongoose = require("mongoose");
const { URI } = require("../../config/keys");

mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
