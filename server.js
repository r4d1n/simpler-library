var express = require('express');
var exphbs = require('express-handlebars');
var session = require('express-session');
// var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

var app = express();

// require routes
var routes = require('./routes/index');
var books = require('./routes/books');
var users = require('./routes/users');

var User = require('./models/user');

// user session middleware
app.use(session({
  secret: ';askjfi[pojas;lkva;lksjvlkajdsv;lkjas;lkva',
  saveUninitialized: true,
  resave: true }));

app.use(function(req, res, next) {
  User.find(req.session.userId)
  .then(function(user) {
    req.currentUser = user;
    // res.render({ currentUser: req.currentUser });
    next();
  })
  .catch(function() {
    next();
  })
});

// use routes
app.use('/', routes);
app.use('/books', books);
app.use('/users', users);

app.use(express.static(__dirname + '/public'));

// to support URL-encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.methodOverride());

// instantiate handlebars-express engine with config
var hbs = exphbs.create({
  defaultLayout: 'layout',
  layoutsDir: 'views/',
})

// register hbs.engine from express-handlebars module
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// hacks to run locally
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "DELETE");
  next();
})

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('App listening at http://%s:%s', host, port)

})
