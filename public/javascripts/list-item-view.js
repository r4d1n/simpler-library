var ListItemView = function(book) { // takes object returned by BookFormView getBook()
  this.book = book;
  this.tableRow = $('<tr/>').addClass('.list-item-row');
  this.moreInfo = $('<div/>').addClass('.more-info-div');
}
