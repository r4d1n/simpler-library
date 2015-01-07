function editableModule(context) {
  
  //Manipulating table view
  var getRow = function(el) {
    return $(el).parents('tr');
  }

  var getTitle = function(row) {
    return $(row).find('.att-title').text();
  }

  // var getKey = function(el) {
  //   var title = rowTitle(listRow(this));
  //   //   var classes = $(el).attr("class").split();
  //   //   classes.filter(function(){
  //   //     for(var i=0; i < classes.length; i++)
  //   //   })
  //   //
  //   //   return { title : key }
  //   }



  // Activate editable list
  var isEditable = function() {
    var $self;
    $('.editable').click(function(evt) {
      $self = $(evt.target);
      var $orig = $self.html();
      var $value = $self.text();
      $self.html("<form><input id='edit-field'></form>")
      $('#edit-field').attr('value', $value);
    })
    $self.blur(function(){
      $value = $self.val();
      $self.html($orig).val($value);
      database.update(entry, $value);
    })
  }

  // for the delete button
  var hasDelete = function() {
    $(".delete-button").click(function(event) {
      event.preventDefault();
      var row = listRow(this);
      var title = rowTitle(row);
      row.remove();
      database.delete(title);
    });
  }

  return {
    isEditable : isEditable,
    getRow : getRow,
    getTitle : getTitle
  }

}
