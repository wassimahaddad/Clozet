const User = require("../models/user.model");
const sharp = require("sharp");
// ----------------------------------------------------

let protocol = false;
if (process.env.NODE_ENV === "production") {
  protocol = true;
}
// ----------------------------------------------------
const createUser = async (req, res) => {
  const user = await new User(req.body);

  try {
    await user.save();
    // const token = user.generateAuthToken();
    // res
    //   .status(201)
    //   .cookie("access_token", token, { httpOnly: true, secure: protocol });
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
};
// ----------------------------------------------------
const userLogin = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res
      .status(201)
      .cookie("access_token", token, { httpOnly: true, secure: protocol });
    res.status(200).send({ user });
  } catch (e) {
    res.status(400).send("Incorrect email and/or password");
    console.log(e);
  }
};
// ----------------------------------------------------
const userLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.status(202).clearCookie("access_token");
    res.send("user successfully logged out");
  } catch (e) {
    res.status(500).send();
  }
};
// ----------------------------------------------------
const userLogoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(202).clearCookie("access_token");
    res.send("All user successfully logged out");
  } catch (e) {
    res.status(500).send();
  }
};
// ----------------------------------------------------
const getUserProfile = async (req, res) => {
  res.send(req.user);
};
// ----------------------------------------------------
const updateUserProfile = async (req, res) => {
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
};
// ----------------------------------------------------
const uploadAvatar = async (req, res) => {
  const buffer = await sharp(req.file.buffer)
    .png()
    .resize({ width: 150, height: 150 })
    .toBuffer();
  req.user.avatar = buffer;
  // req.user.avatar = req.file.buffer;
  await req.user.save();
  res.send();
};
// ----------------------------------------------------
const deleteAvatar = async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
};
// ----------------------------------------------------
const getAvatar = async (req, res) => {
  try {
    if (!req.user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(req.user.avatar);
  } catch (e) {
    res.status(404).send();
  }
};
// ----------------------------------------------------
const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
};
// ----------------------------------------------------
module.exports = {
  createUser,
  userLogin,
  userLogout,
  userLogoutAll,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  uploadAvatar,
  deleteAvatar,
  getAvatar,
};
