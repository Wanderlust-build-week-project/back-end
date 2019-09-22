const db = require("../../data/dbConfig.js");

module.exports = {
  getGuests,
  getGuestById,
  addGuest,
  getGuestByUsername,
  deleteGuest,
  updateGuest
};

function getGuests() {
  return db("guests").select('id', 'username', 'name');
}

function getGuestById(id) {
  return db("guests")
    .where({ id })
    .first();
}

async function addGuest(guest) {
  const [id] = await db("guests").insert(guest);
  return getGuestById(id);
}

function getGuestByUsername(username) {
  return db("guests")
    .where({ username })
    .first();
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
