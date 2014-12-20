var ListItemView = function(book) { // should be instantiated with object returned by BookFormView getBook() method
  this.book = book;
  this.tableRow = $('<tr/>').addClass('.list-item-row');
  this.moreInfo = $('<div/>').addClass('.more-info-div');
}

ListItemView.prototype.listMoreContent = function(key, val) { // receives args pair when called in renderListEntry
  var $div = this.moreInfo;
  var $pair = $('<ul/>'); // Would it be better if this was a <span/> with <p/> elements inside?
  var $title = $('<li/>').addClass('.more-box-title').text(key);
  var $spec = $('<li/>').addClass('.more-box-spec').text(val);
  $pair.append($title);
  $pair.append($spec);
  $div.append($pair);
};

ListItemView.prototype.removeButton = function() {
  var $remove = ('<p/>');

  this.remove = $remove;
};

ListItemView.prototype.moreButton = function() {

};

ListItemView.prototype.render = function() {
  var self = this;
  var obj = this.book;  // passed in when first instantiated
  var $cell = $('<td/>');
  // var $more = this.moreButton()
  // $more.css("display", "none");
  var $title = $('<h3/>');
  var $photographer = $('<p/>');
  var mainKeys = ['photographer', 'title'];
  $.each(obj, function(key, value) {
    if (mainKeys.indexOf(key) > -1) {
      key === 'title' ? $title = $title.text(value) : $photographer = $photographer.text(value);
    } else {
      self.listMoreContent(key, value);
    }
  });
  $cell.append($title);
  $cell.append($photographer);
  // this.tableRow.append($more);
  this.tableRow.append($cell);
  $('#library').prepend(this.tableRow);
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
