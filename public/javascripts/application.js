var database = new LibDatabase();

$(document).ready(function() {
  database.load();
})

$("#library").ready(function() {
 var list = editable(this, database);
 list.activate();
})

$("#book-form").submit(function(event) {
  event.preventDefault();
  var formView = new BookFormView("#book-form", database);
  database.send(formView.getBook());
  formView.clear();
})


function editable(list, database) {
  var $editEl = $(list).find('.editable');

  // Activate editable list, call other functions
  function activate(list) {
    isEditable(list);
    hasDelete(list);
  }

  function isEditable() {
    var $self;
    $editEl.click(function() {
      $self = $(this);
      var value = $self.text();
      $self.html("<form><input id='edit-field'></form>")
      $('#edit-field').attr('value', value);
    }).blur(function() {
      value = $self.val();
      var title = getTitle(getRow($self));
      var key = $self.attr("title");
      database.update(title, key, value);
    })
  }

  //Getting table view info
  function getRow(el) {
    return $(el).parents('tr');
  }

  function getTitle(row) {
    return $(row).find('.att-title').text();
  }

  //Use row and title for delete button
  function hasDelete() {
    $(".delete-button").click(function(event) {
      event.preventDefault();
      var row = getRow(this);
      var title = getTitle(row);
      row.remove();
      database.delete(title);
    });
  }

  return { activate : activate }

}
