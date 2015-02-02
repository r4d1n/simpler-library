'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function (table) {
    table.increments().primary();
    table.string('title');
    table.string('photographer');
    table.string('nationality');
    table.string('type');
    table.string('genre');
    table.string('textby');
    table.string('publisher');
    table.string('isbn');
    table.integer('year');
    table.string('tags');
    table.string('comments');
    table.string('signed');
    table.dateTime('created_at').notNullable();
    table.dateTime('updated_at').nullable();
  })
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
