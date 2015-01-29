$(document).ready(function() {
  // Make form or list 'active' in nav
  var path = window.location.pathname;
  $('.nav-tabs').children().removeClass('active');
  if (path === '/list') {
    $('#list-view-switch').addClass('active');
  } else if (path === '/form') {
    $('#form-view-switch').addClass('active');
  };

  $('#book-form').submit(function() {
    var $self = $(this);
    $.post('/books/', { book : $self }).then(function(res) {
      console.log('Book Added');
    })
    return false
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
