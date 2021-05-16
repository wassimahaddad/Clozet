const express = require("express");
const personController = require("../controllers/person.controller");
const auth = require("../middleware/auth.middleware");
const personRouter = new express.Router();
personRouter.use(express.json());

// --------------- create person ---------------------------------------
personRouter.post("/api/persons", auth, async (req, res) => {
  personController.createPerson(req, res);
});

// // ------------------- Update person ------------------------

personRouter.patch("/api/persons/:id", auth, async (req, res) => {
  personController.updatePerson(req, res);
});
// --------------- list person ---------------------------------------
personRouter.get("/api/persons/:id", auth, async (req, res) => {
  personController.listPerson(req, res);
});
// --------------- list all persons ------------------------------------
personRouter.get("/api/persons", auth, async (req, res) => {
  personController.listAllPersons(req, res);
});
// --------------- Delete a person ------------------------------------
personRouter.delete("/api/persons/:id", auth, async (req, res) => {
  personController.deletePerson(req, res);
});
// ------------------- End of routes ------------------------
module.exports = personRouter;
