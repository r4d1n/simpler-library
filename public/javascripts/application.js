var database = new LibDatabase();

$(document).ready(function() {
  database.load();
})

$("#library").ready(function() {
 var list = new ListView();
})

$("#book-form").submit(function(event) {
  event.preventDefault();
  var formView = new BookFormView("#book-form", database);
  database.send(formView.getBook());
  formView.clear();
})
