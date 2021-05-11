const express = require("express");
const Person = require("../models/person.model");
const auth = require("../middleware/auth.middleware");
const personRouter = new express.Router();
personRouter.use(express.json());

// --------------- create person ---------------------------------------
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

// // ------------------- Update person ------------------------

personRouter.patch("/api/persons/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "age_group"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  const _id = req.params.id;

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const person = await Person.findOne({ _id, owner: req.user._id });
    updates.forEach(async (update) => (person[update] = req.body[update]));
    await person.save();
    res.send(person);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});
// --------------- list person ---------------------------------------
personRouter.get("/api/persons/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const person = await Person.findOne({ _id, owner: req.user._id });
    if (!person) {
      res.status(404).send();
    }
    res.send(person);
  } catch (e) {
    res.status(500).send(e);
  }
});
// --------------- list all persons ------------------------------------
personRouter.get("/api/persons", auth, async (req, res) => {
  try {
    const persons = await Person.find({ owner: req.user._id });
    res.send(persons);
  } catch (e) {
    res.status(500).send(e);
  }
});
// --------------- Delete a wardrobe item ------------------------------------
personRouter.delete("/api/persons/:id", auth, async (req, res) => {
  try {
    const person = await Person.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!person) {
      res.status(404).send();
    }
    res.send(person);
  } catch (e) {
    res.status(500).send(e);
  }
});
// ------------------- End of routes ------------------------
module.exports = personRouter;
