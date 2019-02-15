"use strict";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const ProjectSchema = mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    default: 0
  },
  materialsNeeded: {
    type: String,
    default: ""
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String
  }
});

ProjectSchema.methods.serialize = function() {
  return {
    projectName: this.projectName || "",
    budget: this.budget || "",
    materialsNeeded: this.materialsNeeded || "",
    startDate: this.startDate || "",
    endDate: this.endDate || "",
    id: this._id
  };
};

const Project = mongoose.model("Project", ProjectSchema);

module.exports = { Project };
