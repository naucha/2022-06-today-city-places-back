const { Schema, model } = require("mongoose");

const LocationSchema = new Schema({
  properties: {
    placename: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  geometry: {
    coordinates: [{ type: Number, required: true }],
  },
});

const Location = model("Location", LocationSchema, "locations");

module.exports = Location;
