require("dotenv").config();
const debug = require("debug")(
  "today-city-places:server:controllers:locationController"
);
const chalk = require("chalk");
const Location = require("../../database/models/Location");

const getLocations = async (req, res, next) => {
  try {
    const location = await Location.find({});
    debug(chalk.bgBlue("Getting locations"));

    res.status(200).json(location);
  } catch (error) {
    const userError = new Error();
    userError.statusCode = 404;
    userError.customMessage = "Page Not Found";
    next(userError);
  }
};

module.exports = { loadLocations: getLocations };
