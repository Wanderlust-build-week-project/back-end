const db = require("../../data/dbConfig.js");

module.exports = {
  getGuestByUsername,
  getOrganizerByUsername,
  addOrganizer,
  addGuest
};

function getGuestByUsername(username) {
  return db("guests")
    .where({ username })
    .first();
}

async function addGuest(guest) {
  return db("guests")
    .insert(guest, "id")
    .then(res => {
      id = res[0];
      return getGuestByIdForRegister(id).then(guest => guest);
    });
}

function getGuestById(id) {
  return db("guests")
    .where({ id })
    .first();
}

function getGuestByIdForRegister(id) {
  return db("guests")
    .where({ id })
    .select("username", "name", "id")
    .first();
}

function addOrganizer(organizer) {
  return db("organizers")
    .insert(organizer, "id")
    .then(result => {
      return getOrganizerByUsernameForRegister(organizer.username).then(
        organizer => organizer
      );
    });
}

function getOrganizerByUsername(username) {
  return db("organizers")
    .where({ username })
    .first()
    .then(organizer => organizer);
}

function getOrganizerByUsernameForRegister(username) {
  return db("organizers")
    .where({ username })
    .select("username", "name", "id")
    .first()
    .then(organizer => organizer);
}
