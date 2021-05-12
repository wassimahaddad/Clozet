const express = require("express");
const sharp = require("sharp");
const Clozet = require("../models/clozet.model");
const auth = require("../middleware/auth.middleware");
const { upload } = require("../middleware/multer.middleware");
const clozetRouter = new express.Router();
clozetRouter.use(express.json());

// --------------- create clozet item ---------------------------------------
clozetRouter.post(
  "/api/clozets",
  auth,
  upload.single("image"),
  async (req, res) => {
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
  }
);
// // ------------------- Update clozet ------------------------

clozetRouter.patch(
  "/api/clozets/:id",
  auth,
  upload.single("image"),
  async (req, res) => {
    const updates = Object.keys(req.body);
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
  }
);

// --------------- list clozet item ---------------------------------------
clozetRouter.get("/api/clozets/:id", auth, async (req, res) => {
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
});
// --------------- Clozet search ---------------------------------------
clozetRouter.post("/api/clozets/search", auth, async (req, res) => {
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
});
// --------------- list all clozet item ------------------------------------
clozetRouter.get("/api/clozets", auth, async (req, res) => {
  try {
    const clozets = await Clozet.find({ owner: req.user._id });
    res.send(clozets);
    // await req.user.populate("clozets").execPopulate();
    // res.send(req.user.clozets);
  } catch (e) {
    res.status(500).send(e);
  }
});
// --------------- Delete a clozet item ------------------------------------
clozetRouter.delete("/api/clozets/:id", auth, async (req, res) => {
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
});
// ------------------- End of routes ------------------------
module.exports = clozetRouter;
