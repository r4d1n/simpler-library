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
 
}

var database = new LibDatabase();

var books = [
new Book({ title: "Protest Photographs", 
	photographer : "Chauncey Hare",
	nationality : "American",
	type : "Monograph", 
	genre : "Documentary", 
	textBy : "Chauncey Hare, Judy Wyatt, Jack von Euw",
	publisher : "SteidlKasher",
	isbn : "978-3-86521-495-9",
	year : "2009",
	tags : "B&W, domesticity, interiors, home, family, political, California, labor, Suburbs",
	comments : "",
	signed : false	
}),

new Book({ title : "Incidents",
	photographer : "Henry Wessel",
	nationality : "American",
	type : "Monograph", 
	genre : "Street", 
	textBy : "",
	publisher : "Steidl",
	isbn : "978-3-86930-697-1",
	year : "2013",
	tags : "B&W, California, Bay Area, American West",
	comments : "Has a sense of humor",
	signed : true
}),

new Book({title: "Secondhand",
	photographer : "",
	nationality : "",
	type : "Exhibition Catalog", 
	genre : "", 
	textBy : "",
	publisher : "Pier 24 Photography",
	isbn : "978-0-9839917-5-5",
	year : "2014",
	tags : "archives, appropriation, institutions, Bay Area, curation",
	comments : "What an interesting show.",
	signed : false
}),
];

for(var k = 0; k < books.length; k++){
 database.create(books[k]);
}

$(document).ready(function() {
 refreshList();
});

$("#book-form").submit(function(event) {
 event.preventDefault();
var formView = new BookFormView("#book-form");
  database.create(formView.getBook());
  
refreshList();    

// clears form, needs to be changed to scale to more elements
  $("#book-title").val("");  
  $("#book-photographer").val("");
  $("#book-nationality").val("");
  $("#book-type").val("");
  $("#book-genre").val("");
  $("#book-textby").val("");
  $("#book-publisher").val("");
  $("#book-isbn").val("");
  $("#book-year").val("");
  $("#book-tags").val("");
  $("#book-comments").val("");
  $("#book-signed").val("");
});

function showBook(book) {
 $("#library").prepend(
    $("<li/>")
      .append(
	$("<h3/>").text(book.title),
	$("<p/>").text(book.photographer),
	$("<p/>").text(book.nationality),
	$("<p/>").text(book.type),
	$("<p/>").text(book.genre),
	$("<p/>").text(book.textby),
	$("<p/>").text(book.publisher),
	$("<p/>").text(book.isbn),
	$("<p/>").text(book.year + " (" + book.getAge() + " years old)"),
	$("<p/>").text(book.tags),
	$("<p/>").text(book.comments),
	$("<p/>").text(book.signed),
	$("<a/>").text("Remove").click(function () {
	removeByName(book.title);
	refreshList();
     })
   )
)
};

function refreshList() {
$('#library').empty(); // Clear books list, otherwise will add same ones over again
 for (var i = 0; i < database.books.length; i++) {
  showBook(database.books[i]);
 }
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

function removeByName(title) {
 removeBook(getIndex(title));
};
