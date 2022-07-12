require("dotenv").config();

const express = require("express");
const { loadLocations } = require("../controllers/locationController");

const locationRouter = express.Router();

locationRouter.get("/list", loadLocations);

module.exports = locationRouter;
