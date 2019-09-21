const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Organizers = require("../organizers/organizersHelper");
const Guests = require("../guests/guestsHelper");
const secrets = require("./secrets.js");

router.post("/organizers/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Organizers.addOrganizer(user)
    .then(newUser => res.status(201).json(newUser))
    .catch(err => res.status(500).json(err));
});

router.post("/guests/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Guests.addGuest(user)
    .then(newUser => res.status(201).json(newUser))
    .catch(err => res.status(500).json(err));
});

router.post("/organizers/login", (req, res) => {
  let { username, password } = req.body;

  Organizers.getOrganizerByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token: token });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(err => res.status(500).json(err));
});

router.post("/guests/login", (req, res) => {
  let { username, password } = req.body;

  Guests.getGuestByUsername(username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token: token });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(err => res.status(500).json(err));
});

function generateToken(user) {
  const payload = {
    username: user.username,
    name: user.name
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
