var ListView = function(list, context) {
  this.book = context;
  this.isEditable();
  this.hasDelete();
  this.activate(list);
}


  // var $editEl = $(list).find('.editable');

  // Activate editable list, call other functions
  ListView.prototype.activate = function(list) {
    isEditable(list);
    hasDelete(list);
  }

  ListView.prototype.isEditable = function() {
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
  ListView.prototype.getRow = function(el) {
    return $(el).parents('tr');
  }

  ListView.prototype.getTitle = function(row) {
    return $(row).find('.att-title').text();
  }

  //Use row and title for delete button
  ListView.prototype.hasDelete = function() {
    $(".delete-button").click(function(event) {
      event.preventDefault();
      var row = getRow(this);
      var title = getTitle(row);
      row.remove();
      database.delete(title);
    });
  }
