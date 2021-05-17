const express = require("express");
const cors = require("cors");
const path = require("path");
require("./src/db/mongoose.db");
const route = require("./src/routes/index.route");

const app = express();
app.use(cors());

// const userRoute = require("./src/routes/user.route");
// const personRoute = require("./src/routes/person.route");
// const clozetRoute = require("./src/routes/clozet.route");

app.use(express.json());
app.use("/api/", route);
// app.use(userRoute);
// app.use(personRoute);
// app.use(clozetRoute);

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
