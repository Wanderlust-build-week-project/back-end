
exports.seed = function (knex) {
  return knex("experience_types").insert([
    { type_id: 1, experience_id: 1 },
    { type_id: 2, experience_id: 2 }
  ]);
};