var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var knex = require('../config/database');

var bookHandler = require('../lib/bookHandler.js');
var Book = require('../models/book.js');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/debug', function(req, res) {
  knex.select().table('books')
  .then(function(resp) {
    console.log(resp);
    res.json({});
  });
});

router.get('/new', function (req, res) {
  if(req.currentUser){
    res.render('books/new', { 'currentUser' : req.currentUser });
    console.log("Book: " + Book);
  } else {
    res.redirect('../users/login');
  }
});

router.get('/show', function (req, res) {
  // if(!req.currentUser) { //commented out for dev purposes
  //   res.redirect('../users/login')
  // } else { 
  var context = {'currentUser' : req.currentUser, books: []};
  if (req.query.q) {
    context.searchQuery = req.query.q;
  }
  bookHandler.index(req.query.q, req.query.sort)
  .then(function(collection) {
    for (var i = 0; i < collection.length; i++) {
      context.books[i] = collection.models[i].attributes;
      context.books[i].created_at = bookHandler.convertDate(context.books[i].created_at);
      context.books[i].updated_at = bookHandler.convertDate(context.books[i].updated_at);
    } 
    res.render('books/show', context);
  }).catch(function(err){
    console.error("There was an error", err);
    res.redirect('/');
  });
  // } // else
});

router.get('/', function(req, res) {
  bookHandler.index(req.query.q, req.query.sort)
  .then(function(books) {
    res.json({'books' : books});
  });
});

router.post('/', function(req, res) {
  var newBook = req.body.book;
  if(!req.currentUser) {
    res.redirect('../users/login');
  } else {
    Book.forge({
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
      user_id: req.currentUser.id
    }).save().then(function() {
      res.redirect('/');
    }).catch(function(err) {
      console.log("There was an Error: " + err);
    });
  }
});

router.get('/:id/edit', function (req, res) {
  // fetch book via id and pass to render
  Book.forge({id : req.params.id}).fetch()
  .then(function(model) {
    res.render('books/edit', {
      book : model.attributes,
      layout: false
    });
  });
});

router.post('/:id', function(req, res) {
  var bookData = req.body.book;
  console.log("Editing book data: " + bookData);
  // Book.forge({id: req.params.id})
  // .save({method: update, }) 
  // update authors set "bio" = 'Short user bio' where "id" = 1
  // new Author({id: 1, first_name: 'User'})
  // .save({bio: 'Short user bio'}, {patch: true})
  //.then(function(model) {
  // // ...
  //  });}
  knex('books')
  .where('id', req.params.id)
  .update(bookData)
  .then(function() {
    return knex.select().table('books');
  })
  .then(function(books) {
    res.render('books/show', {'books' : books});
  });
});

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
  });
});

module.exports = router;
