const express = require("express");
const cors = require("cors");
const path = require("path");
require("./src/db/mongoose.db");

const app = express();
app.use(cors());
const userRouter = require("./src/routers/user.router");
const personRouter = require("./src/routers/person.router");
const wardrobeRouter = require("./src/routers/wardrobe.router");

app.use(express.json());
app.use(userRouter);
app.use(personRouter);
app.use(wardrobeRouter);

const publicDirectory = path.join(__dirname, "client/build");
app.use(express.static(publicDirectory));

// -------------------------------------------
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
