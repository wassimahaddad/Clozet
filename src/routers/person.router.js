const express = require("express");
const Person = require("../models/person.model");
const auth = require("../middleware/auth.middleware");
const personRouter = new express.Router();
personRouter.use(express.json());

personRouter.post("/api/persons", auth, async (req, res) => {
  const person = new Person({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await person.save();
    res.status(201).send(person);
  } catch (e) {
    res.status(400).send(e);
  }
});
// ------------------- End of routes ------------------------
module.exports = personRouter;
