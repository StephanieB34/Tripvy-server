"use strict";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const TripSchema = mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  itemsNeeded: {
    type: String,
    default: ""
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

TripSchema.methods.serialize = function() {
  return {
    location: this.location || "",
    itemsNeeded: this.itemsNeeded || "",
    id: this._id
  };
};

const Trip = mongoose.model("Trip", TripSchema);

module.exports = { Trip };
