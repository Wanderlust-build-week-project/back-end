const db = require("../../data/dbConfig");

module.exports = {
  getGuestExperienceByIds,
  getGuestExperiences,
  deleteGuestExperience,
  updateGuestExperience,
  addGuestExperience
};

function getGuestExperiences() {
  return db("guest_experiences").then(guest_experiences => guest_experiences);
}

function getGuestExperienceByIds(guest_id, experience_id) {
  return db("guest_experiences")
    .where({ guest_id: guest_id, experience_id: experience_id })
    .first()
    .then(result => result);
}

function deleteGuestExperience(guest_id, experience_id) {
  return db("guest_experiences")
    .del()
    .where({ guest_id: guest_id, experience_id: experience_id })
    .then(result => result);
}

function updateGuestExperience(guest_id, experience_id, updated_experience) {
  return db("guest_experiences")
    .update(updated_experience)
    .where({ guest_id: guest_id, experience_id: experience_id })
    .then(result => {
      return db("guest_experiences as ge")
        .join("guests as g", "ge.guest_id", "g.id")
        .join("experiences as e", "ge.experience_id", "e.id")
        .select("g.username", "ge.*", "ge.completed as guest_completed", "e.*")
        .where({ guest_id: guest_id, experience_id: experience_id })
        .first()
        .then(experience => {
          if (experience.completed === 1) {
            experience.completed = true;
          } else {
            experience.completed = false;
          }

          if (experience.guest_completed === 1) {
            experience.guest_completed = true;
          } else {
            experience.guest_completed = false;
          }

          if (experience.favorited === 1) {
            experience.favorited = true;
          } else {
            experience.favortied = false;
          }

          return experience;
        });
    });
}

function addGuestExperience(guestExperience) {
  return db("guest_experiences")
    .insert(guestExperience, "id")
    .then(result => {
      return db("guest_experiences as ge")
        .join("guests as g", "ge.guest_id", "g.id")
        .join("experiences as e", "ge.experience_id", "e.id")
        .select("g.username", "ge.*", "ge.completed as guest_completed", "e.*")
        .where({
          guest_id: guestExperience.guest_id,
          experience_id: guestExperience.experience_id
        })
        .first()
        .then(experience => {
          if (experience.completed === 1) {
            experience.completed = true;
          } else {
            experience.completed = false;
          }

          if (experience.guest_completed === 1) {
            experience.guest_completed = true;
          } else {
            experience.guest_completed = false;
          }

          if (experience.favorited === 1) {
            experience.favorited = true;
          } else {
            experience.favortied = false;
          }

          return experience;
        });
    });
}
