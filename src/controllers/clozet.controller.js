const Clozet = require("../models/clozet.model");
const sharp = require("sharp");
// ---------------------------------------------
const createClozet = async (req, res) => {
  const clozet = new Clozet({
    ...req.body,
    owner: req.user._id,
  });

  try {
    if (req.file) {
      const buffer = await sharp(req.file.buffer)
        .png()
        .resize({ width: 350, height: 350 })
        .toBuffer();
      clozet.img = buffer;
    }
    await clozet.save();
    res.status(201).send(clozet);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
};
// ---------------------------------------------
const updateClozet = async (req, res) => {
  const obj = { ...req.body };
  for (const key in obj) {
    if (obj[key] === "") {
      delete obj[key];
    }
  }
  const updates = Object.keys(obj);
  const allowedUpdates = [
    "person",
    "size",
    "season",
    "keeper",
    "in_storage",
    "storage_name",
  ];

  const isValidOperation = updates.every(
    (update) => allowedUpdates.includes(update) || "img"
  );
  const _id = req.params.id;

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const clozet = await Clozet.findOne({ _id, owner: req.user._id });

    updates.forEach(async (update) => (clozet[update] = req.body[update]));

    if (req.file) {
      const buffer = await sharp(req.file.buffer)
        .png()
        .resize({ width: 350, height: 350 })
        .toBuffer();
      clozet.img = buffer;
    }

    await clozet.save();
    res.send(clozet);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
};
// ---------------------------------------------
const listClozet = async (req, res) => {
  const _id = req.params.id;

  try {
    const clozet = await Clozet.findOne({ _id, owner: req.user._id });
    if (!clozet) {
      res.status(404).send();
    }
    res.send(clozet);
  } catch (e) {
    res.status(500).send(e);
  }
};
// ---------------------------------------------
const searchClozet = async (req, res) => {
  const obj = { ...req.body };
  for (const key in obj) {
    if (obj[key] === "") {
      delete obj[key];
    }
  }

  try {
    const clozet = await Clozet.find({ ...obj, owner: req.user._id });
    if (!clozet) {
      res.status(404).send();
    }
    res.send(clozet);
  } catch (e) {
    res.status(500).send(e);
  }
};
// ---------------------------------------------
const listAllClozets = async (req, res) => {
  try {
    const clozets = await Clozet.find({ owner: req.user._id });
    res.send(clozets);
    // await req.user.populate("clozets").execPopulate();
    // res.send(req.user.clozets);
  } catch (e) {
    res.status(500).send(e);
  }
};
// ---------------------------------------------
const deleteClozet = async (req, res) => {
  try {
    const clozet = await Clozet.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!clozet) {
      res.status(404).send();
    }
    res.send(clozet);
  } catch (e) {
    res.status(500).send(e);
  }
};
// ---------------------------------------------

module.exports = {
  createClozet,
  updateClozet,
  listClozet,
  searchClozet,
  listAllClozets,
  deleteClozet,
};
