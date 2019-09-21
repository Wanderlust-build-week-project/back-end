const router = require("express").Router();

const Locations = require("./locationsHelper.js");

router.get("/", (req, res) => {
  Locations.getLocations()
    .then(locations => res.status(200).json(locations))
    .catch(err => res.status(500).json({ error: err }));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Locations.getLocationById(id)
    .then(location => res.status(200).json(location))
    .catch(err => res.status(500).json({ error: err }));
});

router.get("/location/:location", (req, res) => {
  const { location } = req.params;

  Locations.getLocationByName(location)
    .then(searched => res.status(200).json(searched))
    .catch(err => res.status(500).json({ error: err }));
});

router.post("/", (req, res) => {
  const location = req.body;

  Locations.addLocation(location)
    .then(location => res.status(201).json(location))
    .catch(err => res.status(500).json({ error: err }));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Locations.deleteLocation(id)
    .then(count =>
      res
        .status(200)
        .json({ message: `Successfully deleted location with ID: ${id}` })
    )
    .catch(err => res.status(500).json({ error: err }));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Locations.updateLocation(id, changes)
    .then(updated => res.status(200).json(updated))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
