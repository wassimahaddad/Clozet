const express = require("express");
const sharp = require("sharp");
const Wardrobe = require("../models/wardrobe.model");
const auth = require("../middleware/auth.middleware");
const { upload } = require("../middleware/multer.middleware");
const wardrobeRouter = new express.Router();
wardrobeRouter.use(express.json());

// --------------- create wardrobe item ---------------------------------------
wardrobeRouter.post("/api/wardrobes", auth, async (req, res) => {
  const wardrobe = new Wardrobe({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await wardrobe.save();
    res.status(201).send(wardrobe);
  } catch (e) {
    res.status(400).send(e);
  }
});
// // ------------------- Update wardrobe ------------------------

wardrobeRouter.patch(
  "/api/wardrobes/:id",
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
      const wardrobe = await Wardrobe.findOne({ _id, owner: req.user._id });

      updates.forEach(async (update) => (wardrobe[update] = req.body[update]));

      if (req.file) {
        const buffer = await sharp(req.file.buffer)
          .png()
          .resize({ width: 350, height: 350 })
          .toBuffer();
        wardrobe.img = buffer;
      }
      await wardrobe.save();
      res.send(wardrobe);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

// --------------- list wardrobe item ---------------------------------------
wardrobeRouter.get("/api/wardrobes/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const wardrobe = await Wardrobe.findOne({ _id, owner: req.user._id });
    if (!wardrobe) {
      res.status(404).send();
    }
    res.send(wardrobe);
  } catch (e) {
    res.status(500).send(e);
  }
});
// --------------- list all wardrobe item ------------------------------------
wardrobeRouter.get("/api/wardrobes", auth, async (req, res) => {
  try {
    const wardrobes = await Wardrobe.find({ owner: req.user._id });
    res.send(wardrobes);
    // await req.user.populate("wardrobes").execPopulate();
    // res.send(req.user.wardrobes);
  } catch (e) {
    res.status(500).send(e);
  }
});
// --------------- Delete a wardrobe item ------------------------------------
wardrobeRouter.delete("/api/wardrobes/:id", auth, async (req, res) => {
  try {
    const wardrobe = await Wardrobe.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!wardrobe) {
      res.status(404).send();
    }
    res.send(wardrobe);
  } catch (e) {
    res.status(500).send(e);
  }
});
// ------------------- End of routes ------------------------
module.exports = wardrobeRouter;
