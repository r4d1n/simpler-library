var LibDatabase = function() {
 this.books = [];
};

LibDatabase.prototype.create = function(book) { 
 this.books.push(book);
};

LibDatabase.prototype.getIndex = function(book) {
 for (var i=0; i < this.books.length; ++i) {
	var object = this.books[i];
	if (object.title === title) {
		return i;
	}
    }
};

LibDatabase.prototype.destroy = function(book) {
 var k = this.getIndex(book);
 books.splice(k,1);
};
