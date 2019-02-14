"use strict";
const express = require("express");
const bodyParser = require("body-parser");

const { Project } = require("./models");

const router = express.Router();

const jsonParser = bodyParser.json();

router.get("/", (req, res) => {
  Project.find()
    .then(projects => {
      res.json(projects.map(project => project.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went terribly wrong" });
    });
});

router.get("/:id", (req, res) => {
  Project.findById(req.params.id)
    .then(project => res.json(project.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went horribly awry" });
    });
});

router.post("/projects", jsonParser, (req, res) => {
  const requiredFields = ['projectName', 'startDate', 'budget', 'materialsNeeded', 'endDate'];
  for (let i = 0; i < requiredFields.length; i++) {
     const field = requiredFields[i];
     if (!(field in req.body)) {
       const message = `Missing \`${field}\` in request body`;
       console.error(message);
       return res.status(400).send(message);
     }
   }

   project.create({
    projectName: req.body.projectName,
    startDate: req.body.startDate,
    budget: req.body.budget,
    materialsNeeded: req.body.materialsNeeded,
    endDate: req.body.endDate
  })
    .then(project => res.status(201).json(project.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
  });

router.delete("/projects/:id", (req, res) => {
  project.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: "success" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went terribly wrong" });
    });
});

router.put("/projects/:id", jsonParser, (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
       error: "Request path id and request body id values must match"
    });
  }

  const updated = {};
  const updatableFields = ['projectName', 'startDate', 'budget', 'materialsNeeded', 'endDate'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

project.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
  .then(updatedProject => res.status(204).end())
  .catch(err => res.status(500).json({ message: "Something went wrong" }));
});

module.exports = { router };
