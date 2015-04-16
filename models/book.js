var bookshelf = require('../config/bookshelf-db');

var Book = bookshelf.Model.extend({
  tableName: 'books',
  hasTimestamps: ['created_at', 'updated_at'],
  creator: function () {
    return this.belongsTo(User) || " ";
  },
  editor: function () {
    return this.belongsTo(User) || " ";
  },
  convertDates: function(dateArr) {
    dateArr.forEach(function (el, ind, arr) {
      var date = new Date();
      date.setTime(el);
      return date;
    });
  },
});

module.exports = Book;
