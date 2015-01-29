var express = require('express');
var router = express.Router();
var booksDB = require('./fake-db.js')

router.get('/', function (req, res) {
  res.render('home');
})

router.get('/form', function (req, res) {
  res.render('form');
})

router.get('/list', function (req, res) {
  res.render('list', { 'books' : booksDB });
})

module.exports = router;
