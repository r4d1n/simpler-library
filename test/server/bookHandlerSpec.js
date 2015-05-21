var assert = require('chai').assert;
var bookHandler = require('../../lib/bookHandler.js');
var bookshelf = require('../../config/bookshelf-db');
var Book = require('../../models/book.js');

suite('bookHandler module', function() {
  setup(function() {
    var Books = bookshelf.Collection.extend({
      model: Book
    });
  });

  test('it should format dates properly', function() {
    var sampleDate = new Date('July 4, 1990');
    var sampleInt = sampleDate.getTime();
    assert(String(bookHandler.convertDate(sampleInt)) === String(sampleDate));
  });

  test('it should sort by id if no sort column is specified', function() {
    assert.fail();
  });

  //test('', function() {

  //});

  teardown(function() {

  });
});
