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

$(".delete-button").click(function(event) {
  event.preventDefault();
  var $row = $(this).parents('tr');
  var $title = $row.find('.book-title').text();
  $row.remove();
  database.delete($title);
});
