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
  return findByGuestId(id);
}

function deleteGuest(id) {
  return db("guests")
    .where({ id: id })
    .del();
}

function updateGuest(id, changes) {
  return db("guests")
    .where({ id: id })
    .update({ changes });
}
