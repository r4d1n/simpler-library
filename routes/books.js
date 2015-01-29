var express = require('express');
var router = express.Router();
var booksDB = require('./fake-db.js')

router.get('/', function(req, res) {
  res.json({'books' : booksDB});
})

router.post('/', function(req, res) {
  console.log(req.body.book);
  booksDB.push(req.body.book);
  res.json({'books' : booksDB});
})

router.post('/:id', function(req, res) {
  var book = booksDB[req.params.id];
  var bookData = req.body.book;
  for(var key in bookData) {
    book[key] = bookData[key];
  }
  res.render('list', {'books' : booksDB});
})

router.post('/:id/delete', function(req, res) {
  var index = Number(req.body.remove);
  booksDB.splice(index,1);
  res.json({ 'books' : booksDB });
})

router.get('/:id/edit', function (req, res) {
  // fetch book via id and pass to render
  var book = booksDB[req.params.id];
  console.log(book);
  res.render('edit', {
    book : book,
    layout: false
  });
})

router.post('/books/update', function (req, res) {
  console.log(req.body);
  var key = req.body.key;
  var val = req.body.val;
  booksDB[i][key] = val;
  res.render('list', {'books' : booksDB});
})

module.exports = router;
