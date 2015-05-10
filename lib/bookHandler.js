var knex = require('../config/database');
var bookshelf = require('../config/bookshelf-db');
var Promise = require('bluebird');

var Book = require('../models/book.js');

module.exports = (function() {
  var Books = bookshelf.Collection.extend({
    model: Book
  });

  var order = 0;
  var reOrder = function() {
    var opts = ["desc", "asc"];
    order++;
    if (order >= opts.length) order = 0;
    return opts[order];
  }

  // returned object w/ public methods
  var bookHandler = {};
  bookHandler.convertDate = function (integer) {
    var date = new Date();
    date.setTime(integer);
    return date;
  };

  bookHandler.index = function(q, sortColumn) {
    sortColumn = sortColumn || "id";
    var books = Books.forge();
    if (q) {
      return books.query().where('tags', 'like', "%" + knex.raw(q) + "%").orderBy(sortColumn, "desc");
    } else {
      return knex('books')
      .join('users', 'books.user_id', 'users.id')
      .orderBy(sortColumn, reOrder())
      .select('books.*', 'users.user_name');
    }
  };
  return bookHandler;
})();
