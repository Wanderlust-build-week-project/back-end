const db = require("../../data/dbConfig");

module.exports = {
  getOrganizers,
  getOrganizerById,
  addOrganizer,
  deleteOrganizer,
  updateOrganizer,
  getOrganizerByUsername
};

function getOrganizers() {
  return db("organizers")
    .select("name", "username", "id")
    .then(organizers => organizers);
}

function getOrganizerById(id) {
  return db("organizers")
    .where({ id })
    .select("name", "username", "id")
    .first()
    .then(organizer => organizer);
}

function addOrganizer(organizer) {
  return db("organizers")
    .insert(organizer, "id")
    .then(result => {
      return getOrganizerByUsername(organizer.username).then(
        organizer => organizer
      );
    });
}

function getOrganizerByUsername(username) {
  return db("organizers")
    .where({ username })
    .select("username", "name", "id")
    .first()
    .then(organizer => organizer);
}

function deleteOrganizer(id) {
  return db("organizers")
    .where({ id })
    .del()
    .then(res => res);
}

function updateOrganizer(id, updatedOrganizer) {
  return db("organizers")
    .where({ id })
    .update(updatedOrganizer)
    .then(res => {
      return getOrganizerById(id);
    });
}
