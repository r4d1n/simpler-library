var knex = require('../config/database');
var Book = require('../models/book.js');

module.exports = (function() {
  var bookHandler = {};
  bookHandler.convertDate = function (integer) {
    var date = new Date();
    date.setTime(integer);
    return date;
  };

  bookHandler.index = function(query, sortColumn) {
    sortColumn = sortColumn || "id";
    if (query) {
      return knex('books').where('tags', 'like', "%" + knex.raw(query) + "%").orderBy(sortColumn, "desc");
    } else {
      return knex('books')
      .join('users', 'books.user_id', 'users.id')
      .orderBy(sortColumn, "desc")
      .select('books.*', 'users.user_name');
    }
  };

  return bookHandler;
})();
