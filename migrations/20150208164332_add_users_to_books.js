'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('books', function (table) {
    table.integer('user_id').references('users.id');
  })
};

exports.down = function(knex, Promise) {

};
