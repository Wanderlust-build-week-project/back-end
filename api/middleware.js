const Organizers = require("./organizers/organizersHelper");
const Guests = require("./guests/guestsHelper");
const Experiences = require("./experiences/experiencesHelper");

module.exports = { validateGuestId };

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
