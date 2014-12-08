var BookFormView = function(selector) { 
 this.selector = selector;
};

BookFormView.prototype.getBook = function() {
 var attributes = {};
 var inputs = $('.book-field');
 for (var i = 0; i < inputs.length; i++) {
  var el = $(inputs[i]);
  var key = el.attr("name").replace('book[', '').replace(']', '');
  var value = el.val();
  attributes[key] = value;
 }
 inputs = $('.book-checkbox');
 for (var i = 0; i < inputs.length; i++) {
  el = $(inputs[i]);
  key = el.attr("name").replace('book[', '').replace(']', '');
  value = el.is(':checked');
  attributes[key] = value; 
 }
 return new Book(attributes);
};

BookFormView.prototype.clear = function() {
 var inputs = $('.book-field');
  for (var i = 0; i < inputs.length; i++) {
   var field = $(inputs[i]);
   field.val("");
  }
}

BookFormView.prototype.showBook = function() {
 var currentBook = this.getBook();
 $("#library").prepend(
  $("<li/>")
  for (key in currentBook) {
    //var el = $(inputs[i]);
    //var key = el.attr("name").replace('book[', '').replace(']', '');
    //var value = el.val();
    key === "title" ? .append($("<h3/>").text(currentBook[key])) : .append($("<p/>").text(currentBook[key]));
   }; 
   .append($("<a/>").text("Remove").click(
	this.LibDatabase.destroy(book.title); // ?????
	//removeByName(book.title);
	refreshList();
     )
   )
 )
}

// not really implemented yet--should it be?
BookFormView.prototype.refreshList = function() {
 $('#library').empty(); // Clear books list, otherwise will add same ones over again
 var dbArr = this.LibDatabase.books;
 for (var i = 0; i < dbArr.length; i++) {
   this.showBook(dbArr[i]);
 }
}
