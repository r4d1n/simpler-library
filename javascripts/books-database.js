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
 books.splice(k,1);
};
