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

//manipulating the table, should be moved to ListItemView
function listRow(el) {
  return $(el).parents('tr');
}

function rowTitle(row) {
  return $(row).find('.att-title').text();
}

$(".delete-button").click(function(event) {
  event.preventDefault();
  var row = listRow(this);
  var title = rowTitle(row);
  row.remove();
  database.delete(title);
});

// (function isEditable() {
//   $('.editable').click(function() {
//     var $self = $(this);
//     var value = $self.text();
//     console.log(value);
//     $self.html("<form><input id='edit-field'></form>")
//     $('#edit-field').attr('value', value);
//   })
//   $('.editable').blur(function(){
//     value = $('.edit-field').val();
//     console.log(value)
//     database.update(entry, value);
//   })
// }())
//
// function titleKey(el) {
//   var title = rowTitle(listRow(this));
//   var classes = $(el).attr("class").split();
//   classes.filter(function(){
//     for(var i=0; i < classes.length; i++)
//   })
//
//   return { title : key }
// }
