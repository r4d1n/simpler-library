'use strict'

//var knex = require('../config/database');
var bookshelf = require('../config/bookshelf-db');

var Book = require('../models/book.js');

module.exports = (function() {
  var Books = bookshelf.Collection.extend({
    model: Book
  });

  var order = 0;
  var reOrder = function() {
    var opts = ["asc", "desc"];
    order++;
    if (order >= opts.length) order = 0;
    return opts[order];
  };

  // returned object w/ public methods
  var bookHandler = {};
  bookHandler.convertDate = function (integer) {
    var date = new Date();
    date.setTime(integer);
    return date;
  };

  bookHandler.index = function(q, sortColumn) {
    sortColumn = sortColumn || "id";
    if (q) { // search query
      console.log("query: " + q, Books.forge())
      return Books.forge()
      .query(function(queryBuilder) {
       queryBuilder.where('tags', 'like', "%" + q + "%")
       .orderBy(sortColumn, "desc")
      })
      .fetch();
    } else {
      return Books.forge()
      .query(function(queryBuilder) {
        queryBuilder.orderBy(sortColumn, "asc");
      })
      .fetch();
    }
  };
  return bookHandler;
})();
