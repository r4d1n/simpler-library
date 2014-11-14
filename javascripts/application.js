var books = [
{ 	"Protest Photographs" : { 
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
	}
},

{ 	"Incidents" : { 
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
	}
},

{ 	"Secondhand" : { 
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
	}
}
];

$(document).ready(function() {
 refreshList();
});

$("#book-form").submit(function(event) {
  event.preventDefault();
  saveBook($("#book-form input").val());
  refreshList();
  
  $("#book-title").val("");
  $("#book-nationality").val("");
});

function showBook(title, description) {
  $("#library").prepend(
    $("<li/>")
      .append(
        $("<h3/>").text(title),
        $("<p/>").text(description),
	$("<a/>").text("Remove").click(function () {
		removeByName(title);
		refreshList();
})
      )
  );
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
 var newBook = {};
 newBook[title] = {
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

/* if (document.getElementsByTagName('signed') === 'checked') {
 newBook.title.signed = true;
} else {
 newBook.title.signed = false;
};

*/
 books.push(newBook);
};


function getIndex(title) {
 for (var i=0; i<books.length; ++i) {
	var object = books[i];
	for (var t in object) {
	if (t === title) {
	return i;
	};
 };
};
};

function removeBook(k) {
 books.splice(k,1);
 return books;
};

function removeByName(title) {
 removeBook(getIndex(title));
};
