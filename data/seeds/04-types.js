exports.seed = function(knex) {
  return knex("types").insert([
    { id: 1, type: "Private" },
    { id: 2, type: "Professional" }
  ]);
};
