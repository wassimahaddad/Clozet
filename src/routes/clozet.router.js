const express = require("express");
const sharp = require("sharp");
const clozetController = require("../controllers/clozet.controller");
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
    clozetController.createClozet(req, res);
  }
);
// // ------------------- Update clozet ------------------------

clozetRouter.patch(
  "/api/clozets/:id",
  auth,
  upload.single("image"),
  async (req, res) => {
    clozetController.updateClozet(req, res);
  }
);

// --------------- list clozet item ---------------------------------------
clozetRouter.get("/api/clozets/:id", auth, async (req, res) => {
  clozetController.listClozet(req, res);
});
// --------------- Clozet search ---------------------------------------
clozetRouter.post("/api/clozets/search", auth, async (req, res) => {
  clozetController.searchClozet(req, res);
});
// --------------- list all clozet item ------------------------------------
clozetRouter.get("/api/clozets", auth, async (req, res) => {
  clozetController.listAllClozets(req, res);
});
// --------------- Delete a clozet item ------------------------------------
clozetRouter.delete("/api/clozets/:id", auth, async (req, res) => {
  clozetController.deleteClozet(req, res);
});
// ------------------- End of routes ------------------------
module.exports = clozetRouter;
