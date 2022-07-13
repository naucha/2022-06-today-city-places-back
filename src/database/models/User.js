const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailadress: {
    type: String,
    required: true,
  },
});

const User = model("User", UserSchema, "users");

module.exports = User;
