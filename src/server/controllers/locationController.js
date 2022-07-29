require("dotenv").config();
const debug = require("debug")(
  "today-city-places:server:controllers:locationController"
);
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
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

    const { myplaces } = await User.findById(userData.id).populate({
      path: "myplaces",
      model: Location,
    });

    debug(chalk.bgBlue("Getting locations"));

    res.status(200).json(myplaces);
  } catch (error) {
    const userError = new Error();
    userError.statusCode = 404;
    userError.customMessage = "Page Not Found";
    debug(chalk.bgRed("Error load locations"));
    next(userError);
  }
};

const addLocation = async (req, res, next) => {
  try {
    const {
      userId: { id },
    } = req;

    const newLocationData = req.body;
    const { id: locationId } = await Location.create(newLocationData);

    const updatedUser = await User.updateOne(
      { _id: id },
      { $push: { myplaces: mongoose.Types.ObjectId(locationId) } }
    );

    if (updatedUser) {
      res.status(201).json({
        newLocationRegistered: { id: locationId, ...newLocationData },
      });

      debug(chalk.bgBlackBright("New Location created"));
    }
  } catch (error) {
    debug(chalk.red("Error to add"));
    next();
  }
};

module.exports = { loadLocations: getLocations, addLocation };
