exports.seed = function(knex) {
  return knex("locations").insert([
    { id: 1, location: 'Tibet'},
    { id: 2, location: 'Bali' }
  ]);
};