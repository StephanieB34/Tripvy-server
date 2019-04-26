"use strict";
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const { Trip } = require("./models");
const router = express.Router();
const jsonParser = bodyParser.json();
const jwtAuth = passport.authenticate("jwt", { session: false });

router.get(
  "/",
  /* jwtAuth, */ (req, res) => {
    Trip.find({
      //  user: req.user.id
    })
      .then(trips => {
        res.json(trips.map(trip => trip.serialize()));
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: "something went terribly wrong" });
      });
  }
);

router.get("/:id", (req, res) => {
  Trip.findById(req.params.id)
    .then(trip => res.json(trip.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went horribly awry" });
    });
});

router.post("/", /*jwtAuth, */ jsonParser, (req, res) => {
  const requiredFields = ["location", "itemsNeeded"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Trip.create({
    location: req.body.location,
    itemsNeeded: req.body.itemsNeeded,
    /*user: req.user.id*/
  })
    .then(trip => res.status(201).json(trip.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});

router.delete("/:id", (req, res) => {
  Trip.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: "success" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went terribly wrong" });
    });
});

router.put("/:id", jsonParser, (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: "Request path id and request body id values must match"
    });
  }

  const updated = {};
  const updateableFields = ["location", "itemsNeeded"];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Trip.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedTrip => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Something went wrong" }));
});

module.exports = { router };
