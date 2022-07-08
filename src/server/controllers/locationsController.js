require("dotenv").config();
const debug = require("debug")(
  "TodayCityPlaces:server:controllers:locationsController"
);
const chalk = require("chalk");
const Location = require("../../database/models/Location");

const getLocations = async (req, res, next) => {
  try {
    const locations = await Location.find({});
    debug(chalk.bgBlue("New Request GET locations"));

    res.status(200).json(locations);
  } catch (error) {
    next(error);
  }
};

module.exports = { loadLocations: getLocations };
