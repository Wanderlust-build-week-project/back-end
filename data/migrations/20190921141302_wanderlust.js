exports.up = function(knex) {
  return knex.schema
    .createTable("organizers", tbl => {
      tbl.increments();
      tbl
        .string("username", 128)
        .unique()
        .notNullable();
      tbl.string("name", 128).notNullable();
      tbl.string("password", 128).notNullable();
    })
    .createTable("guests", tbl => {
      tbl.increments();
      tbl
        .string("username", 128)
        .unique()
        .notNullable();
      tbl.string("name", 128).notNullable();
      tbl.string("password", 128).notNullable();
    })
    .createTable("locations", tbl => {
      tbl.increments();
      tbl
        .string("location", 128)
        .notNullable()
        .unique();
    })
    .createTable("types", tbl => {
      tbl.increments();
      tbl
        .string("type", 128)
        .notNullable()
        .unique();
    })
    .createTable("experiences", tbl => {
      tbl.increments();
      tbl.text("description", 1000);
      tbl.string("name", 128).notNullable();
      tbl.integer("duration").notNullable();
      tbl.datetime("date");
      tbl.boolean("completed").defaultTo(false);
      tbl
        .integer("organizer_id")
        .references("id")
        .inTable("organizers")
        .notNullable()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("location_id")
        .references("id")
        .inTable("locations")
        .notNullable()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("guest_experiences", tbl => {
      tbl
        .integer("guest_id")
        .references("id")
        .inTable("guests")
        .notNullable()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("experience_id")
        .references("id")
        .inTable("experiences")
        .notNullable()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.boolean("completed").defaultTo(false);
      tbl.boolean("favorited").defaultTo(false);
      tbl.primary(["guest_id", "experience_id"]);
    })
    .createTable("experience_types", tbl => {
      tbl
        .integer("experience_id")
        .references("id")
        .inTable("experiences")
        .notNullable()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("type_id")
        .references("id")
        .inTable("types")
        .notNullable()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.primary(["experience_id", "type_id"]);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("experience_types")
    .dropTableIfExists("guest_experiences")
    .dropTableIfExists("experiences")
    .dropTableIfExists("types")
    .dropTableIfExists("locations")
    .dropTableIfExists("guests")
    .dropTableIfExists("organizers");
};
