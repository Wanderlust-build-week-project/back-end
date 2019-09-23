
exports.seed = function(knex) {
  return knex("experiences").insert([
    { id: 1, name: 'Summer Hike', duration: 12, location_id: 1, organizer_id: 1},
    { id: 2, name: 'Winter Hike', duration: 12, location_id: 2, organizer_id: 2 }
  ]);
};