const Organizers = require("./organizers/organizersHelper");
const Guests = require("./guests/guestsHelper");
const Experiences = require("./experiences/experiencesHelper");
const Locations = require("./locations/locationsHelper");
const Types = require("./types/typesHelper");

module.exports = {
  validateGuestId,
  validateGuestUsername,
  validateOrganizerId,
  validateOrganizerUsername,
  validateLocation,
  validateType
};

function validateGuestId(req, res, next) {
  let id = req.params.id;

  Guests.getGuestById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "Invalid guest ID" });
      }
    })
    .catch(err => res.status(500).json(err));
}

function validateGuestUsername(req, res, next) {
  let username = req.params.username;
  Guests.getGuestByUsername(username)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "Invalid guest username." });
      }
    })
    .catch(err => res.status(500).json(err));
}

function validateOrganizerId(req, res, next) {
  let id = req.params.id;
  Organizers.getOrganizerById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "Invalid organizer ID" });
      }
    })
    .catch(err => res.status(500).json(err));
}

function validateOrganizerUsername(req, res, next) {
  let username = req.params.username;
  Organizers.getOrganizerByUsername(username)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "Invalid organizer username." });
      }
    })
    .catch(err => res.status(500).json(err));
}

function validateLocation(req, res, next) {
  let { location } = req.body;
  if (location) {
    next();
  } else {
    res.status(400).json({
      message: "Locations require a valid string for the location property."
    });
  }
}

function validateType(req, res, next) {
  let { type } = req.body;
  if (type) {
    next();
  } else {
    res.status(400).json({
      message: "Types require a valid string for the type property."
    });
  }
}
