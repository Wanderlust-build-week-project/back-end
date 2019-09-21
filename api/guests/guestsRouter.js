const router = require("express").Router();

const Guests = require("./guestsHelper.js");

router.get("/", (req, res) => {
  Guests.getGuests()
    .then(guests => res.status(200).json(guests))
    .catch(err => res.status(500).json({ error: err }));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Guests.getGuestById(id)
    .then(guest => res.status(200).json(guest))
    .catch(err => res.status(500).json({ error: err }));
});

router.get("/username/:username", (req, res) => {
  const { username } = req.params;
  console.log(username);
  Guests.getGuestByUsername(username)
    .then(guest => res.status(200).json(guest))
    .catch(err => res.status(500).json({ error: err }));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Guests.deleteGuest(id)
    .then(count =>
      res
        .status(200)
        .json({ message: `Successfully deleted guest with ID: ${id}` })
    )
    .catch(err => res.status(500).json({ error: err }));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Guests.updateGuest(id, changes)
    .then(updated => res.status(200).json(updated))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
