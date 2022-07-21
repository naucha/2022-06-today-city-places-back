require("dotenv").config();
const debug = require("debug")(
  "today-city-places:server:controllers:locationController"
);
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const Location = require("../../database/models/Location");
const User = require("../../database/models/User");

const getLocations = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization.includes("Bearer ")) {
      throw new Error("Not bearer");
    }
    const token = authorization.replace("Bearer ", "");
    const userData = jwt.verify(token, process.env.JWT_SECRET);

    const { myplaces } = await User.findById(userData).populate({
      path: "myplaces",
      model: Location,
    });

    debug(chalk.bgBlue("Getting locations"));

    res.status(200).json(myplaces);
  } catch (error) {
    const userError = new Error();
    userError.statusCode = 404;
    userError.customMessage = "Page Not Found";
    next(userError);
  }
};

module.exports = { loadLocations: getLocations };
