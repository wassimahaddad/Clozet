const express = require("express");
const personController = require("../controllers/person.controller");
const auth = require("../middleware/auth.middleware");
const personRoute = new express.Router();
personRoute.use(express.json());

// --------------- create person ---------------------------------------
personRoute.post("/", auth, async (req, res) => {
  personController.createPerson(req, res);
});

// // ------------------- Update person ------------------------

personRoute.patch("/:id", auth, async (req, res) => {
  personController.updatePerson(req, res);
});
// --------------- list person ---------------------------------------
personRoute.get("/:id", auth, async (req, res) => {
  personController.listPerson(req, res);
});
// --------------- list all persons ------------------------------------
personRoute.get("", auth, async (req, res) => {
  personController.listAllPersons(req, res);
});
// --------------- Delete a person ------------------------------------
personRoute.delete("/:id", auth, async (req, res) => {
  personController.deletePerson(req, res);
});
// ------------------- End of routes ------------------------
module.exports = personRoute;
