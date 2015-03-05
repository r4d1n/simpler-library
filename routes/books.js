var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var knex = require('../config/database');

router.use(bodyParser.urlencoded({ extended: true }))

router.get('/debug', function(req, res) {
  knex.select().table('books')
  .then(function(resp) {
    console.log(resp);
    res.json({});
  })
})

router.get('/new', function (req, res) {
  if(req.currentUser){
    res.render('books/new', { 'currentUser' : req.currentUser });
  } else {
    res.redirect('../users/login');
  }
})

router.get('/show', function (req, res) {
  var context = { 'currentUser' : req.currentUser };
  if (req.query.q) {
    context.searchQuery = req.query.q;
  }
  booksIndex(req.query.q, req.query.sort)
  .then(function(books) {
    // if(!req.currentUser) { //commented out for dev purposes
    //   res.redirect('../users/login')
    // } else {
    for (var i = 0; i < books.length; i++) {
      books[i].created_at = convertDate(books[i].created_at);
      books[i].updated_at = convertDate(books[i].updated_at);
    }
    context.books = books;
    console.log(context.books);
    res.render('books/show', context);
    // } // else
  }).catch(function(err){
    console.log("There was an error", err);
    res.redirect('/');
  })
})

router.get('/', function(req, res) {
  booksIndex(req.query.q, req.query.sort)
  .then(function(books) {
    res.json({'books' : books})
  });
});


router.post('/', function(req, res) {
  var newBook = req.body.book;
  if(!req.currentUser) {
    res.redirect('../users/login')
  } else {
    knex('books').insert({
      title : newBook.title,
      photographer : newBook.photographer,
      nationality : newBook.nationality,
      type : newBook.type,
      genre: newBook.genre,
      textby : newBook.textby,
      publisher : newBook.publisher,
      isbn : newBook.isbn,
      year : newBook.year,
      tags : newBook.tags,
      comments : newBook.comments,
      signed : newBook.signed,
      created_at: new Date(),
      updated_at: new Date(),
      user_id: req.currentUser.id
    })
    .then(function() {
      res.json({});
    })
  }
})

router.post('/:id', function(req, res) {
  var bookData = req.body.book;
  console.log("Editing book data: " + bookData);
  knex('books')
  .where('id', req.params.id)
  .update(bookData)
  .then(function() {
    return knex.select().table('books');
  })
  .then(function(books) {
    res.render('books/show', {'books' : books});
  })
})

router.get('/:id/edit', function (req, res) {
  // fetch book via id and pass to render
  knex('books').where('id', req.params.id)
  .then(function(result) {
    var book = result[0];
    res.render('books/edit', {
      book : book,
      layout: false
    });
  });
})

router.post('/:id/delete', function(req, res) {
  knex('books')
  .where('id', req.params.id)
  .del()
  .then(function() {
    return knex.select().table('books');
  })
  .then(function(books) {
    res.redirect('books/show', {
      'books': books,
      // layout: false
    });
  })
})

function convertDate(integer) {
  var date = new Date();
  date.setTime(integer);
  return date;
}

function booksIndex(query, sortColumn) {
  sortColumn = sortColumn || "id";
  if (query) {
    return knex('books').where('tags', 'like', "%" + knex.raw(query) + "%").orderBy(sortColumn, "desc")
  } else {
    return knex('books')
    .join('users', 'books.user_id', 'users.id')
    .orderBy(sortColumn, "desc")
    .select('books.*', 'users.user_name');
  }
}

module.exports = router;
