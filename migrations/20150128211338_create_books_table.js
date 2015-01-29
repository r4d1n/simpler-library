'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function (table) {
    table.increments();
    table.string('title');
    table.string('photographer');
    table.timestamps();
  })
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
