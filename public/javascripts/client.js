'use strict'

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
    var data = $(this).serialize();
    console.log(data);
    $.post('/books/', data).then(function(res) {
      console.log('Book Added');
      $('#book-form').each(function() {
        this.reset();
      })
    })
    // $(this).trigger('reset');
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

  $('.delete-button').click(function() {
    $.post('/books/' + id + '/delete/').then(function() {

    })
  }); // end delete button

}); // end document ready
