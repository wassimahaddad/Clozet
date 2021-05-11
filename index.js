const express = require("express");
const cors = require("cors");
const path = require("path");
require("./src/db/mongoose.db");

const app = express();
app.use(cors());

// ---------------------------------------------------------
// const indexRouter = require("./src/routers/index.router");
// app.use(indexRouter);
// ---------------------------------------------------------
const userRouter = require("./src/routes/user.router");
const personRouter = require("./src/routes/person.router");
const clozetRouter = require("./src/routes/clozet.router");

app.use(express.json());
app.use(userRouter);
app.use(personRouter);
app.use(clozetRouter);

const publicDirectory = path.join(__dirname, "client/build");
app.use(express.static(publicDirectory));

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// -------------------------------------------
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
