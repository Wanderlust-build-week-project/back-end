exports.seed = function(knex) {
  return knex("guests").insert([
    { id: 1, username: "Tommy", password: 'password', name: 'Tommy' },
    { id: 2, username: "May", password: 'wordpass', name: 'May' }
  ]);
};