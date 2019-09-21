const db = require("../../data/dbConfig.js");

module.exports = {
  getGuests,
  getGuestById,
  getGuestByUsername,
  addGuest,
  deleteGuest,
  updateGuest
};

function getGuests() {
  return db("guests");
}

function getGuestById(id) {
  return db("guests")
    .where({ id })
    .first();
}

function getGuestByUsername(username) {
  return db("guests")
    .where({ username })
    .first();
}

async function addGuest(guest) {
  const [id] = await db("guests").insert(guest);
  return getGuestById(id);
}

function deleteGuest(id) {
  return db("guests")
    .where({ id: id })
    .del();
}

async function updateGuest(id, changes) {
  await db("guests")
    .where({ id })
    .update(changes);
  return getGuestById(id);
}
