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

router.get('/', function(req, res) {
  res.json({'books' : booksDB});
})



router.post('/', function(req, res) {
  var newBook = req.body.book;
  if(!req.currentUser) {
    res.redirect('users/login')
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
  knex('books')
  .where('id', req.params.id)
  .update(bookData)
  .then(function() {
    return knex.select().table('books');
  })
  .then(function(books) {
    res.render('list', {'books' : books});
  })
})

router.get('/:id/edit', function (req, res) {
  // fetch book via id and pass to render
  knex('books').where('id', req.params.id)
  .then(function(result) {
    console.log(result);
    var book = result[0];
    // console.log(book);
    res.render('edit', {
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
    res.render('list', { 'books' : books });
  })
})


module.exports = router;
