var BookFormView = function(selector) { 
 this.selector = selector;
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
  attributes[key] = value; 
 }
 return new Book(attributes);
};

BookFormView.prototype.clear = function() {
 // copy from application.js and fix to scale better
 var inputs = $('.book-field');
  for (var e = 0; e < inputs.length; e++) {
   var field = $(inputs[i]);
   field.val("");
  }
}
/*
  $("#book-title").val("");  
  $("#book-photographer").val("");
  $("#book-nationality").val("");
  $("#book-type").val("");
  $("#book-genre").val("");
  $("#book-textby").val("");
  $("#book-publisher").val("");
  $("#book-isbn").val("");
  $("#book-year").val("");
  $("#book-tags").val("");
  $("#book-comments").val("");
  $("#book-signed").val("");
*/

