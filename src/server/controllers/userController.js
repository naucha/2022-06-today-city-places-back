require("dotenv").config();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../database/models/User");
const { customError } = require("../../utils/customError");

const registerUser = async (req, res, next) => {
  const { username, password, emailadress } = req.body;

  const user = await User.findOne({ username, emailadress });

  if (user) {
    const userError = new Error();
    userError.statusCode = 409;
    userError.customMessage = "This user already exists";

    next(userError);
    return;
  }

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: encryptedPassword, emailadress };

    await User.create(newUser);

    res.status(201).json({ username, emailadress });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { emailadress, password } = req.body;
  const user = await User.findOne({ emailadress });

  if (!user) {
    const error = customError(
      400,
      "Email Incorrect",
      "User o Password not valid"
    );
    next(error);
  } else {
    const userData = {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      emailadress: user.emailadress,
    };

    const rightPassword = await bcrypt.compare(password, user.password);

    if (!rightPassword) {
      const error = customError(
        400,
        "Password Incorrect",
        "Email or Password are wrong"
      );
      next(error);
    } else {
      const token = jsonwebtoken.sign(userData, process.env.JWT_SECRET);

      res.status(200).json({ token });
    }
  }
};

module.exports = { registerUser, loginUser };
