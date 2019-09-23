exports.seed = function(knex) {
  return knex("organizers").insert([
    { id: 1, username: "Admin", password: '******', name: 'Omega' },
    { id: 2, username: "Admin2", password: '******', name: 'Alpha' }
  ]);
};