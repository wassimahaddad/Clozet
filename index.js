const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("./src/db/mongoose.db");
const route = require("./src/routes/index.route");

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

app.use(express.json());
app.use("/api/", route);

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
