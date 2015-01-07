var LibDatabase = function() {
  this.books = [];
};

LibDatabase.prototype.make = function(book) {
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

LibDatabase.prototype.handleResponse = function(response) {
  var self = this
  this.books = [];
  $.each(response.books, function(index, bookDef) {
    var item = new Book(bookDef);
    self.make(item);
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

LibDatabase.prototype.delete = function(title, callback) {
  var self = this;
  var k = self.getIndex(title);
  $.ajax({
    url : 'http://localhost:3000/books',
    type : 'DELETE',
    data : { remove : k }
  }).then(function(response) {
    self.handleResponse(response);
    if (callback) {
      callback();
    }
  });
};

LibDatabase.prototype.update = function(title, key, val, callback) {
  var self = this;
  var k = self.getIndex(title);
  $.ajax({
    url : 'http://localhost3000/books/update',
    type : 'POST',
    data : {
      item : k,
      key : key,
      val : val,
      crossDomain : true
      }
  }).then(function(response) {
    self.handleResponse(response);
    if (callback) {
      callback();
    }
  });
}
