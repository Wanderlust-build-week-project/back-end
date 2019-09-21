const db = require("../../data/dbConfig.js");

module.exports = {
  getAllGuests,
  findByGuestId,
  findByGuestUsername,
  addGuest,
  removeGuestById,
  updateGuest
};

function getAllGuests() {
  return db("guests");
}

function findByGuestId(id) {
  return db("guests")
    .where({ id })
    .first();
}

function findByGuestUsername(username) {
  return db("guests")
    .where({ username })
    .first();
}

async function addGuest(guest) {
  const [id] = await db("guests").insert(guest);
  return findByGuestId(id);
}

function removeGuestById(id) {
  return db("guests")
    .where({ id: id })
    .del();
}

function updateGuest(id, changes) {
  return db("guests")
    .where({ id: id })
    .update({ changes });
}
