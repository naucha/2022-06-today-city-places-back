require("dotenv").config();
const bcrypt = require("bcrypt");

const User = require("../../database/models/User");

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

module.exports = registerUser;
