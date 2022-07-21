const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
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
  myplaces: [
    {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },
  ],
});

const User = model("User", UserSchema, "users");

module.exports = User;
