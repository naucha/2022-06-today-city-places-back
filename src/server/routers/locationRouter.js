require("dotenv").config();

const express = require("express");
const {
  loadLocations,
  addLocation,
} = require("../controllers/locationController");
const auth = require("../middlewares/auth");

const locationRouter = express.Router();

locationRouter.get("", loadLocations);

locationRouter.post("/add", auth, addLocation);

module.exports = locationRouter;
