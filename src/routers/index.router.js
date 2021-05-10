const express = require("express");
const path = require("path");
const cors = require("cors");
// require("../db/mongoose.db");
const app = express();
app.use(cors());
const indexRouter = new express.Router();
indexRouter.use(express.json());

const userRouter = require("./user.router");
const personRouter = require("./person.router");
const clozetRouter = require("./clozet.router");

app.use(express.json());
app.use(userRouter);
app.use(personRouter);
app.use(clozetRouter);

// const publicDirectory = path.join(__dirname, "client/build");
// app.use(express.static(publicDirectory));

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "client/build", "index.html"));
});

module.exports = indexRouter;
