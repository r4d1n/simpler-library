var ListItemView = function(book) { // should be instantiate with object returned by BookFormView getBook() method
  this.book = book;
  this.moreInfo = $('div').addClass('.more-info-box');
}

// ListItemView.prototype.makeNiceKeys() {
//   var attributes = {};
//   var inputs = $('.book-field');
//   for (var i = 0; i < inputs.length; i++) {
//     var el = $(inputs[i]);
//     var key = el.attr("name").replace('book[', '').replace(']', '');
//     var value = el.val();
//     attributes[key] = value;
//   }
//   inputs = $('.book-checkbox');
//   for (var i = 0; i < inputs.length; i++) {
//     el = $(inputs[i]);
//     key = el.attr("name").replace('book[', '').replace(']', '');
//     value = el.is(':checked');
//     if (value) {
//      attributes[key] = 'Signed';
//    }
//  }
//     return attributes;
// }

ListItemView.prototype.moreContent = function(key, val) { // receives args pair when called in renderListEntry
  var $div = this.moreInfo;
  var $pair = $('<ul/>'); // Would it be better if this was a <span/> with <p/> elements inside?
  var $title = $('<li/>').addClass('.more-box-title').text(key);
  var $spec = $('<li/>').addClass('.more-box-spec');.text(val);
  $pair.append($title);
  $pair.append($spec);
  $div.append($pair);
};

ListItemView.prototype.makeRemoveButton = function() {
  var $remove = ('<p/>');

  this.remove = $remove;
};

ListItemView.prototype.makeMoreButton = function() {

}

ListItemView.prototype.renderListEntry = function() {
  var obj = this.book;  // passed in when first instantiated
  var $listItem = $('<tr>').addClass('.list-item-main');
  var $more = this.moreInfo;
  $more.css("display", "none");
  var mainKeys = ['photographer', 'title'];
  $.each(obj, function(key, value) {
    if (mainKeys.indexOf(key) > -1) {
      key === 'title' ? var $title = $('<h3/>').text(value) : var $photographer = $('<p/>').text(value);
    } else {
      this.moreContent(key, value);
    }
  });
  $listItem.append($title);
  $listItem.append($photographer);
  $listItem.append($more)
  $('#library').append($listItem);
};


// function showBook(book) {
//   var arr = ['title', 'photographer', 'nationality', 'type', 'genre', 'textby', 'publisher', 'isbn', 'year', 'tags', 'comments', 'signed'];
//   var $tr = $('<tr/>');
//   var $td = $('<td/>');
//   $.each(arr, function (index, value) {
//     var input = book[value]; // scoped in here
//     var html = '<p/>';
//     if (value === 'title') {
//       html = '<h3/>';
//     }
//     var $el = $(html).text(input);
//     $td = $('<td/>').append($el);
//     $tr.append($td);
//   });
//   var $remove = $("<a href='#'/>").text("Remove").click(function () {
//     database.destroy(book.title); // ?????
//     refreshList();
//     return false
//   })
//   $remove = $('<td/>').append($remove);
//   $tr.append($remove);
//   $('#library').append($tr);
// };

ListItemView.prototype.addToTable = function(item) {
  $table = $('#library');


};
