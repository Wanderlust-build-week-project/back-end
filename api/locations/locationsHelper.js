const db = require("../../data/dbConfig.js");

module.exports = {
  getLocations,
  getLocationById,
  getLocationByName,
  addLocation,
  deleteLocation,
  updateLocation
};

function getLocations() {
  return db("locations");
}

function getLocationById(id) {
  return db("locations")
    .where({ id })
    .first();
}

function getLocationByName(location) {
  return db("locations")
    .where({ location })
    .first();
}

async function addLocation(location) {
  const [id] = await db("locations").insert(location);
  return getLocationById(id);
}

function deleteLocation(id) {
  return db("locations")
    .where({ id: id })
    .del();
}

async function updateLocation(id, changes) {
  await db("locations")
    .where({ id })
    .update(changes);
  return getLocationById(id);
}
