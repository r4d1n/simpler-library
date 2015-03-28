var bookshelf = require('../config/bookshelf-db');

var Book = bookshelf.Model.extend({
  tableName: 'books',
  // setMainAttributes: function(reqBook) {
  //   this.title = reqBook.title;
  //   this.photographer = reqBook.photographer;
  //   this.nationality = reqBook.nationality;
  //   this.type = reqBook.type;
  //   this.genre= reqBook.genre;
  //   this.textby = reqBook.textby;
  //   this.publisher = reqBook.publisher;
  //   this.isbn = reqBook.isbn;
  //   this.year = reqBook.year;
  //   this.tags = reqBook.tags;
  //   this.comments = reqBook.comments;
  //   this.signed = reqBook.signed;
  // },
  hasTimeStamps: ['createdAt', 'updatedAt'],
  creator: function () {
    return this.belongsTo(User);
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
