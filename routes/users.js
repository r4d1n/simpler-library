var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var User = require('../models/user');

router.use(bodyParser.urlencoded({ extended: true }))

router.get('/new', function(req, res) {
  res.render('users/new');
});

router.post('/new', function(req, res) {
  var email = req.body.user.email;
  var password = req.body.user.password;
  var conf = req.body.user.confirmation;
  console.log(email, password);
  if (password === conf) {
    var tempUser = User.create();
    tempUser.setEmail(email);
    tempUser.setPassword(password);
    tempUser.save().then(function() {
      res.redirect('/');
    });
  } else {
    throw "Passwords Do Not Match"
  }
});

router.get('/login', function(req,res) {
  res.render('users/login');
});

router.post('/login', function(req,res) {
  var email = req.body.user.email;
  var password = req.body.user.password;
  console.log(email, password);
  User.login(email, password)
  .then(function(currentUser) {
    console.log(currentUser);
    req.session.userId = currentUser.id;
    console.log('successful login');
    res.redirect('/books/new');
  }).catch(function(error) {
    console.log("There was an error: " + error);
    res.render('users/login', {
      errorMessages: [error]
    });
  });
});

router.get('/logout', function(req,res) {
  req.session.destroy(function(error) {
    res.redirect('/')
  });
});

module.exports = router;
