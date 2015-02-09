'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments().primary();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.dateTime('created_at').notNullable();
    table.dateTime('updated_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
