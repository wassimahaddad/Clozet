const Person = require("../models/person.model");
// ---------------------------------------
const createPerson = async (req, res) => {
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
};
// ---------------------------------------
const deletePerson = async (req, res) => {
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
};
// ---------------------------------------
const listPerson = async (req, res) => {
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
};
// ---------------------------------------
const listAllPersons = async (req, res) => {
  try {
    const persons = await Person.find({ owner: req.user._id });
    res.send(persons);
  } catch (e) {
    res.status(500).send(e);
  }
};
// ---------------------------------------
const updatePerson = async (req, res) => {
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
};
// ---------------------------------------
module.exports = {
  createPerson,
  deletePerson,
  listPerson,
  listAllPersons,
  updatePerson,
};
