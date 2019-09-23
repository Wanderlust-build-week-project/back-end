exports.seed = function(knex) {
  return knex("guest_experiences").insert([
    {  guest_id: 1, experience_id: 1},
    { guest_id: 2, experience_id: 2 }
  ]);
};