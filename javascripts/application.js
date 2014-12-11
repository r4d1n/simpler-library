var database = new LibDatabase();

$(document).ready(function() {
 database.load(function() { 
  refreshList() 
 });
});

$("#book-form").submit(function(event) {
 event.preventDefault();
 var formView = new BookFormView("#book-form", database);
 database.create(formView.getBook());   
 formView.clear();
 refreshList(); 
}); 

function showBook(book) {
 var arr = ['title', 'photographer', 'nationality', 'type', 'genre', 'textby', 'publisher', 'isbn', 'year', 'tags', 'comments', 'signed'];
 var $li = $('<li/>');
 $.each(arr, function (index, value) {
  var input = book[value]; // scoped in here
  var html = '<p/>';
  if (value === 'title') {
   html = '<h3/>';
  }
  var $el = $(html).text(input);
   $li.append($el);
  });
  var $remove = $("<a href='#'/>").text("Remove").click(function () {
   database.destroy(book.title); // ?????
   refreshList(); 
   return false
   })
  $li.append($remove);
  $('#library').prepend($li);
};

/* var currentBook = this.getBook();
  for (key in currentBook) {
   var html = "<p/>";
   var value = currentBook[key];
   if (key === 'title') {
    html = "<h3/>";
   }
   var $li = $("<li/>").append($(html).text(value));
   $("#library").prepend($li);
  }; 
    .append($("<a/>").text("Remove").click(function () {
	database.destroy(book.title); // this
	refreshList();
	}
     )
   ) */


function refreshList() {
$('#library').empty(); // Clear books list, otherwise will add same ones over again
 $.each(database.books, function(index, book) {
  showBook(book);
 });
}

function makeBook(title, photographer, nationality, type, genre, textby, publisher, isbn, year, tags, comments, signed) {
 var book = new Book({
 "title" : title,
 "photographer" : photographer,
 "nationality" : nationality,
 "type" : type,
 "genre" : genre,
 "textBy" : textby,
 "publisher" : publisher,
 "isbn" : isbn,
 "year" : year,
 "tags" : tags,
 "comments" : comments,
 "signed" : signed
 });
 return book;
};

/* function removeByName(title) {
 database.destroy(title);
}; */
