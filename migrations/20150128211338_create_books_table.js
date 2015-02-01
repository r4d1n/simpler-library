'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function (table) {
    table.increments();
    table.string('title');
    table.string('photographer');
    table.string('nationality');
    table.string('type');
    table.string('genre');
    table.string('textby');
    table.string('publisher');
    table.string('isbn');
    table.string('year');
    table.string('tags');
    table.string('comments');
    table.string('signed');
    table.timestamps();
  })
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
