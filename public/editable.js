function editable(list, database) {
  var $editEl = $(list).find('.editable');

  // Activate editable list, call other functions
  function activate(list) {
    isEditable(list);
    hasDelete(list);
  }

  function isEditable() {
    var $self;
    $editEl.click(function(evt) {
      $self = $(evt.target);
      var $orig = $self.html();
      var $value = $self.text();
      $self.html("<form><input id='edit-field'></form>")
      $('#edit-field').attr('value', $value);
    })
    $self.blur(function(){
      $value = $self.val();
      var title = getTitle(getRow($self));
      var key = $self.attr("title");
      // $self.html($orig).val($value);
      database.update(title, key, $value);
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
      var row = listRow(this);
      var title = rowTitle(row);
      row.remove();
      database.delete(title);
    });
  }

  export activate

}
