var LibDatabase = function() {
  this.books = [];
};

LibDatabase.prototype.create = function(book) {
  this.books.push(book);
};

LibDatabase.prototype.getIndex = function(title) {
  for (var i=0; i < this.books.length; ++i) {
    var object = this.books[i];
    if (object.title === title) {
      return i;
    }
  }
};

LibDatabase.prototype.destroy = function(title) {
  var k = this.getIndex(title);
  this.books.splice(k,1);
};

LibDatabase.prototype.handleResponse = function(response) {
  var self = this
  this.books = [];
  $.each(response.books, function(index, bookDef) {
    var item = new Book(bookDef);
    self.create(item);
  })
};

LibDatabase.prototype.load = function(callback) {
  var self = this;
  $.get('http://localhost:3000/books').then(function(response) { // response is a json object with a key called books matched w/ array
    self.handleResponse(response);
    if (callback) {
      callback();
    }
  })
};

LibDatabase.prototype.send = function(book, callback) {
  var self = this;
  var body = { "book" : book };
  $.post('http://localhost:3000/books', body).then(function(response) {
    self.handleResponse(response);
    if (callback) {
      callback();
    }
  });
};
