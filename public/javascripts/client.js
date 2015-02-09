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
    return false
  });

  // $('.book-edit-link').click(function() {
  //   var $self = $(this);
  //   var href = $self.attr('href');
  //   $.get(href).then(function(res) {
  //     $self.closest('tr').find('.main-book-cell').html(res);
  //   });
  //   return false;
  // });

}); // end document ready

$('#deleteModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var title = button.data('title'); // Extract info from data-* attributes
  var id = button.data('id');
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this);
  console.log(id);
  modal.find('.modal-title').text('Delete ' + title);
  modal.find('.modal-body').text('Are you sure you want to remove ' + title + ' from the library?');
  $('.delete-button').click(function() {
    console.log('clicked delete');
    $.post('/books/' + id + '/delete/', function(res) {
      // $('#deleteModal').modal('hide');
      window.location.reload();
      // console.log(res);
      // $('#mainDiv').html(res);
    })
    return false;
  }); // end delete button
});
