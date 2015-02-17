var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var User = require('../models/user');

router.use(bodyParser.urlencoded({ extended: true }))

router.get('/new', function(req, res) {
  // if (req.currentUser) { // need this available without login for dev
    res.render('users/new', { 'currentUser': req.currentUser });
  // }
});

router.post('/new', function(req, res) {
  var username = req.body.user.name;
  var email = req.body.user.email;
  var password = req.body.user.password;
  var conf = req.body.user.confirmation;
  console.log(email, password);
  try{
    if (username.length < 1) {
      throw "Please Enter a Username";
    } else if (password.length < 6) {
      throw "Password must contain at least 6 characters"
    } else if (password === conf) {
      var tempUser = User.create();
      tempUser.setName(username);
      tempUser.setEmail(email);
      tempUser.setPassword(password);
      tempUser.save().then(function() {
        res.redirect('/');
      });
    } else {
      throw "Passwords Do Not Match";
    }
  } catch(error) {
    res.render('users/new', {
      errorMessages: [error]
    })
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
    res.redirect('/');
  }).catch(function(error) {
    console.log("There was an error: " + error);
    res.render('users/login', {
      errorMessages: ["User Not Found"]
    });
  });
});

router.get('/logout', function(req,res) {
  req.session.destroy(function(error) {
    res.redirect('/');
  });
});

module.exports = router;
