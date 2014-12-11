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

LibDatabase.prototype.load = function(callback) {
 this.books = [];
 var self = this;
 $.get('http://localhost:3000/books').then(function(response) {
  $.each(response.books, function(index, bookDef) { 
   var item = new Book(bookDef);
   self.create(item);
  })
 if (callback) {
  callback();
  }  
 })
}
