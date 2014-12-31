var ListItemView = function(book) { // takes object returned by BookFormView getBook()
  this.book = book;
  this.tableRow = $('<tr/>').addClass('.list-item-row');
  this.moreInfo = $('<div/>').addClass('.more-info-div');
}

ListItemView.prototype.listMoreContent = function(key, val) { // receives args when called
  var $div = this.moreInfo;
  var $pair = $('<ul/>'); // Would it be better if this was a <span/> with <p/> elements inside?
  var $title = $('<li/>').addClass('.more-box-title').text(key);
  var $spec = $('<li/>').addClass('.more-box-spec').text(val);
  $pair.append($title);
  $pair.append($spec);
  $div.append($pair);
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
    }
  });
  $cell.append($title);
  $cell.append($photographer);
  // this.tableRow.append($more);
  this.tableRow.append($cell);
  $('#library').prepend(this.tableRow);
};
