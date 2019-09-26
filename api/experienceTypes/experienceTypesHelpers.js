const db = require("../../data/dbConfig");

module.exports = {
  addExperienceType,
  getExperienceTypes,
  deleteExperienceType
};

function addExperienceType(experienceType) {
  return db("experience_types")
    .insert(experienceType, "id")
    .then(result => {
      return db("experience_types as et")
        .join("experiences as e", "et.experience_id", "e.id")
        .join("types as t", "et.type_id", "t.id")
        .first()
        .where({
          type_id: experienceType.type_id,
          experience_id: experienceType.experience_id
        })
        .then(experience => {
          if (experience.completed === 1) {
            experience.completed = true;
          } else {
            experience.completed = false;
          }
          return experience;
        });
    });
}

function getExperienceTypes() {
  return db("experience_types").then(et => et);
}

function deleteExperienceType(type_id, experience_id) {
  return db("experience_types")
    .del()
    .where({ type_id: type_id, experience_id: experience_id })
    .then(result => result);
}
