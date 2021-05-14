const express = require("express");
const sharp = require("sharp");
const User = require("../models/user.model");
const auth = require("../middleware/auth.middleware");
const { upload } = require("../middleware/multer.middleware");
const usersRouter = new express.Router();
usersRouter.use(express.json());

// ---------------- Create User ---------------------------
usersRouter.post("/api/users", async (req, res) => {
  const user = await new User(req.body);

  try {
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

// --------------- User Login ----------------------------
usersRouter.post("/api/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send("Incorrect email and/or password");
    console.log(e);
  }
});
// ------------------ logout -------------------------
usersRouter.post("/api/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send("user successfully logged out");
  } catch (e) {
    res.status(500).send();
  }
});
// ------------------ logout All-------------------------
usersRouter.post("/api/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("All user successfully logged out");
  } catch (e) {
    res.status(500).send();
  }
});
// ------------------ Get own profile -------------------------
usersRouter.get("/api/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// ------------------- Update user ------------------------

usersRouter.patch("/api/users/me", auth, async (req, res) => {
  const obj = { ...req.body };
  for (const key in obj) {
    if (obj[key] === "") {
      delete obj[key];
    }
  }
  const updates = Object.keys(obj);
  const allowedUpdates = ["first_name", "last_name", "email", "password"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});
// ------------------- Delete user ------------------------

usersRouter.delete("/api/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// ------------------- Add avatar ------------------------

usersRouter.post(
  "/api/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .png()
      .resize({ width: 150, height: 150 })
      .toBuffer();
    req.user.avatar = buffer;
    // req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
// ------------------- Delete avatar ------------------------

usersRouter.delete(
  "/api/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  }
);
// ------------------- Get avatar ------------------------

usersRouter.get("/api/users/me/avatar", auth, async (req, res) => {
  try {
    if (!req.user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(req.user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

// ------------------- End of routes ------------------------
module.exports = usersRouter;
