books = [{ "Paradise Lost" : "Adam and Eve" }, {"Moby Dick" : "Whaling"}];

$(document).ready(function() {
 refreshList();
});

$("#book-form").submit(function(event) {
  event.preventDefault();
  saveBook($("#book-name").val(), $("#book-description").val());
  refreshList();
  
  $("#book-name").val("");
  $("#book-description").val("");
});

function showBook(name, description) {
  $("#library").prepend(
    $("<li/>")
      .append(
        $("<h3/>").text(name),
        $("<p/>").text(description),
	$("<a/>").text("Remove").click(function () {
		removeByName(name);
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


function saveBook(name, description) {
 var newBook = {};
 newBook[name] = description;
 books.push(newBook);
};

saveBook("Emma", "Austen Sister");

function indexFor(name) {
 for (var i=0; i<books.length; ++i) {
	var object = books[i];
	for (var title in object) {
	if (title === name) {
	return i;
	};
 };
};
};

function removeBook(k) {
 books.splice(k,1);
 return books;
};

function removeByName(name) {
 removeBook(indexFor(name));
};
