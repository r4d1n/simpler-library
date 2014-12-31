var database = new LibDatabase();

$(document).ready(function() {
  database.load(function() { // load hardcoded items from server into global variable
    refreshList()
  });
});

$("#book-form").submit(function(event) {
  event.preventDefault();
  var formView = new BookFormView("#book-form", database);
  var viewObj = formView.getBook();
  // var itemView = new ListItemView(bookObj);
  database.send(viewObj, function () { refreshList() });
  formView.clear();
});

function refreshList() {
  var itemView = {};
  $('#library').empty(); // Clear books list, otherwise will add same ones over again
  $.each(database.books, function(index, book) {
    itemView = new ListItemView(book);
    itemView.render();
  });
};
