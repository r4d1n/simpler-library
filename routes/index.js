var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'sqlite3',
  debug: true,
  connection: {
    filename: './dev.sqlite3'
  }
});
var booksDB = require('./fake-db.js')

router.get('/', function (req, res) {
  res.render('home');
})

router.get('/form', function (req, res) {
  res.render('form');
})

router.get('/list', function (req, res) {
  knex.select().table('books')
  .then(function(books) {
    console.log(books);
    res.render('list', { 'books' : books });
  })
})


module.exports = router;
