var express = require('express');
var router = express.Router();
var knex = require('../config/database');
var User = require('../models/user');


router.get('/', function (req, res) {
  res.render('home', { currentUser: req.currentUser });
})



module.exports = router;
