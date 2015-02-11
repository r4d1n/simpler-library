'use strict'

$(document).ready(function() {
  if ($('.more-info-cell')) {
    $('.more-info-cell').hide();
  };
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

// Library list modals
$('#deleteModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var modal = $(this);
  // Extract info from data-* attributes
  var title = button.data('title');
  var id = button.data('id');
  // Write into modal
  modal.find('.modal-title').text('Delete ' + title);
  modal.find('.modal-body').text('Are you sure you want to remove ' + title + ' from the library?');
  // Delete a book
  $('.delete-button').click(function() {
    $.post('/books/' + id + '/delete/', function(res) {
      window.location.reload();
    })
    return false;
  }); // end delete button
}); // end delete modal

$('#fullListModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var modal = $(this);
  // Extract info from data-* attributes
  var title = button.data('title');
  var id = button.data('id');
  // Get all of the book info
  var row = button.closest('tr').clone();
  $(row).children('.list-button-cell').remove();
  // And turn its tr into a div full of spans
  var list = (function buildList(e) {
    $(e).children('td')
    .map(function() {
      $(this).replaceWith($("<span>" + this.innerHTML + "</span>"));
    })
    return $(e).replaceWith($("<div>" + row.innerHTML + "</div>")).html();
  })(row);
  // insert into modal
  modal.find('.modal-title').text(title);
  modal.find('.modal-body').html(list);
}); // end list all modal
