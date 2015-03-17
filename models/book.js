var bookshelf = require('../config/bookshelf-db');

var bookModel = bookshelf.Model.extend({
  convertDate: function(integer) {
    var date = new Date();
    date.setTime(integer);
    return date;
  },
  setAttributes: function() {

  },
  save: function() {

  }
});

var Book = bookshelf.Model.extend({

});

module.exports = Book;
