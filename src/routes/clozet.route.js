const express = require("express");
const sharp = require("sharp");
const clozetController = require("../controllers/clozet.controller");
const auth = require("../middleware/auth.middleware");
const { upload } = require("../middleware/multer.middleware");
const clozetRoute = new express.Router();
clozetRoute.use(express.json());

// --------------- create clozet item ---------------------------------------
clozetRoute.post("/", auth, upload.single("image"), async (req, res) => {
  clozetController.createClozet(req, res);
});
// // ------------------- Update clozet ------------------------

clozetRoute.patch("/:id", auth, upload.single("image"), async (req, res) => {
  clozetController.updateClozet(req, res);
});

// --------------- list clozet item ---------------------------------------
clozetRoute.get("/:id", auth, async (req, res) => {
  clozetController.listClozet(req, res);
});
// --------------- Clozet search ---------------------------------------
clozetRoute.post("/search", auth, async (req, res) => {
  clozetController.searchClozet(req, res);
});
// --------------- list all clozet item ------------------------------------
clozetRoute.get("", auth, async (req, res) => {
  clozetController.listAllClozets(req, res);
});
// --------------- Delete a clozet item ------------------------------------
clozetRoute.delete("/:id", auth, async (req, res) => {
  clozetController.deleteClozet(req, res);
});
// ------------------- End of routes ------------------------
module.exports = clozetRoute;
