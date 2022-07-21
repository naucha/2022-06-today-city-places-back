const { Schema, model } = require("mongoose");

const LocationSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  properties: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  type: {
    type: String,
  },
  geometry: {
    coordinates: [
      { type: String, required: true },
      { type: String, required: true },
    ],
  },
});

const Location = model("Location", LocationSchema, "locations");

module.exports = Location;
