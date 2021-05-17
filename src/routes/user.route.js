const express = require("express");
const sharp = require("sharp");
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");
const { upload } = require("../middleware/multer.middleware");
const userRoute = new express.Router();
userRoute.use(express.json());

// ---------------- Create User ---------------------------
userRoute.post("/", async (req, res) => {
  userController.createUser(req, res);
});

// --------------- User Login ----------------------------
userRoute.post("/login", async (req, res) => {
  userController.userLogin(req, res);
});
// ------------------ logout -------------------------
userRoute.post("/logout", auth, async (req, res) => {
  userController.userLogout(req, res);
});
// ------------------ logout All-------------------------
userRoute.post("/logoutAll", auth, async (req, res) => {
  userController.userLogoutAll(req, res);
});
// ------------------ Get own profile -------------------------
userRoute.get("/me", auth, async (req, res) => {
  userController.getUserProfile(req, res);
});

// ------------------- Update user ------------------------

userRoute.patch("/me", auth, async (req, res) => {
  userController.updateUserProfile(req, res);
});
// ------------------- Delete user ------------------------

userRoute.delete("/me", auth, async (req, res) => {
  userController.deleteUser(req, res);
});

// ------------------- Add avatar ------------------------

userRoute.post(
  "/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    userController.uploadAvatar(req, res);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
// ------------------- Delete avatar ------------------------

userRoute.delete(
  "/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    userController.deleteAvatar(req, res);
  }
);
// ------------------- Get avatar ------------------------

userRoute.get("/me/avatar", auth, async (req, res) => {
  userController.getAvatar(req, res);
});

// ------------------- End of routes ------------------------
module.exports = userRoute;
