var books = [
{ 	title: "Protest Photographs", 
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
},

{ 	title : "Incidents",
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
},

{ 	title: "Secondhand",
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
},
];

$(document).ready(function() {
 refreshList();
});

$("#book-form").submit(function(event) {
  event.preventDefault();
  saveBook(
	$("#book-title").val(), 
	$("#book-photographer").val(), 
	$("#book-nationality").val(),
	$("#book-type").val(),
	$("#book-genre").val(),
	$("#book-textby").val(),
	$("#book-publisher").val(),
	$("#book-isbn").val(),
	$("#book-year").val(),
	$("#book-tags").val(),
	$("#book-comments").val(),
	$("#book-signed").val()
	);
  refreshList();
  
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

function showBook(title, photographer, nationality, type, genre, textby, publisher, isbn, year, tags, comments, signed) {
 $("#library").prepend(
    $("<li/>")
      .append(
	$("<h3/>").text(title),
	$("<p/>").text(nationality),
	$("<p/>").text(type),
	$("<p/>").text(genre),
	$("<p/>").text(textby),
	$("<p/>").text(publisher),
	$("<p/>").text(isbn),
	$("<p/>").text(year),
	$("<p/>").text(tags),
	$("<p/>").text(comments),
	$("<p/>").text(signed),
	$("<a/>").text("Remove").click(function () {
	removeByName(title);
	refreshList();
     })
   )
)
};


function refreshList () {
 $('#library').html("");
	for (var i = 0; i < books.length; i++) {
	var b = books[i];
	for (var key in b) {
  showBook(key, b[key]);
 };
};
};


function saveBook(title, photographer, nationality, type, genre, textby, publisher, isbn, year, tags, comments, signed) {
 var newBook = {
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
 "comments" : comments
};
/*
if (document.getElementsByTagName('signed') == 'checked') {
 newBook.signed = true;
} else {
 newBook.signed = false;
};
*/
 books.push(newBook);
};


function getIndex(title) {
 for (var i=0; i<books.length; ++i) {
	var object = books[i];
	if (object.title = title) {
		return i;
	}
    }
};


function removeBook(k) {
 books.splice(k,1);
 return books;
};

function removeByName(title) {
 removeBook(getIndex(title));
};
