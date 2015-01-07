var database = new LibDatabase();

$(document).ready(function() {
  database.load();
  // var list = {};
  // $.each(books, function(index, value) {
  //
  //   console.log(value)
  // })
  //
  // console.log(list)
});



$("#book-form").submit(function(event) {
  event.preventDefault();
  var formView = new BookFormView("#book-form", database);
  database.send(formView.getBook());
  formView.clear();
});
