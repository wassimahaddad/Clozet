const express = require("express");
const router = express.Router();

const userRoute = require("./user.route");
const clozetRoute = require("./clozet.route");
const personRoute = require("./person.route");

router.use("/users", userRoute);
router.use("/clozets", clozetRoute);
router.use("/persons", personRoute);

module.exports = router;
