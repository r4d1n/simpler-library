var database = new LibDatabase();

$(document).ready(function() {
  database.load();
});



$("#book-form").submit(function(event) {
  event.preventDefault();
  var formView = new BookFormView("#book-form", database);
  database.send(formView.getBook());
  formView.clear();
});
