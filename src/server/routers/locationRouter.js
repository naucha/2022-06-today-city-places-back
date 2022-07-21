require("dotenv").config();

const express = require("express");
const { loadLocations } = require("../controllers/locationController");

const locationRouter = express.Router();

locationRouter.get("", loadLocations);

module.exports = locationRouter;
