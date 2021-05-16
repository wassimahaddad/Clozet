const express = require("express");
const sharp = require("sharp");
const userController = require("../controllers/user.controller.");
const auth = require("../middleware/auth.middleware");
const { upload } = require("../middleware/multer.middleware");
const usersRouter = new express.Router();
usersRouter.use(express.json());

// ---------------- Create User ---------------------------
usersRouter.post("/api/users", async (req, res) => {
  userController.createUser(req, res);
});

// --------------- User Login ----------------------------
usersRouter.post("/api/users/login", async (req, res) => {
  userController.userLogin(req, res);
});
// ------------------ logout -------------------------
usersRouter.post("/api/users/logout", auth, async (req, res) => {
  userController.userLogout(req, res);
});
// ------------------ logout All-------------------------
usersRouter.post("/api/users/logoutAll", auth, async (req, res) => {
  userController.userLogoutAll(req, res);
});
// ------------------ Get own profile -------------------------
usersRouter.get("/api/users/me", auth, async (req, res) => {
  userController.getUserProfile(req, res);
});

// ------------------- Update user ------------------------

usersRouter.patch("/api/users/me", auth, async (req, res) => {
  userController.updateUserProfile(req, res);
});
// ------------------- Delete user ------------------------

usersRouter.delete("/api/users/me", auth, async (req, res) => {
  userController.deleteUser(req, res);
});

// ------------------- Add avatar ------------------------

usersRouter.post(
  "/api/users/me/avatar",
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

usersRouter.delete(
  "/api/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    userController.deleteAvatar(req, res);
  }
);
// ------------------- Get avatar ------------------------

usersRouter.get("/api/users/me/avatar", auth, async (req, res) => {
  userController.getAvatar(req, res);
});

// ------------------- End of routes ------------------------
module.exports = usersRouter;
