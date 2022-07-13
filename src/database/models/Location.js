const { Schema, model } = require("mongoose");

const LocationSchema = new Schema({
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
