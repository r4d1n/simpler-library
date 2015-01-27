$(document).ready(function() {
  $("#book-form").submit(function(event) {
    event.preventDefault();

  });

  $('.book-edit-link').click(function() {
    var $self = $(this);
    var href = $self.attr('href');
    $.get(href).then(function(res) {
      $self.closest('tr').find('.main-book-cell').html(res);
    });
    return false;
  });

}); // end document ready
