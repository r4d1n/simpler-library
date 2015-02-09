var express = require('express');
var router = express.Router();
var knex = require('../config/database');
var User = require('../models/user');


router.get('/', function (req, res) {
  res.render('home', { currentUser: req.currentUser });
})

router.get('/form', function (req, res) {
  if(req.currentUser){
    res.render('form');
  } else {
    res.redirect('users/login');
  }
})

router.get('/list', function (req, res) {
  knex.select().table('books')
  .then(function(books) {
    console.log(books);
    res.render('list', { 'books' : books });
  })
})


module.exports = router;
