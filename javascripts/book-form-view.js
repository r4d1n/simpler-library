var BookFormView = function(selector, database) { 
 this.selector = selector;
 this.database = database;
};

BookFormView.prototype.getBook = function() {
 var attributes = {};
 var inputs = $('.book-field');
 for (var i = 0; i < inputs.length; i++) {
  var el = $(inputs[i]);
  var key = el.attr("name").replace('book[', '').replace(']', '');
  var value = el.val();
  attributes[key] = value;
 }
 inputs = $('.book-checkbox');
 for (var i = 0; i < inputs.length; i++) {
  el = $(inputs[i]);
  key = el.attr("name").replace('book[', '').replace(']', '');
  value = el.is(':checked');
  if (value) {
   attributes[key] = 'Signed'; 
  }
 }
 return attributes;
};

BookFormView.prototype.clear = function() {
 var inputs = $('.book-field');
  for (var i = 0; i < inputs.length; i++) {
   var field = $(inputs[i]);
   field.val("");
  }
}
