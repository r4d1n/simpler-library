var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();

// require & use routes
var routes = require('./routes/index');
var books = require('./routes/books');
var database = require('./routes/fake-db.js');

app.use('/', routes);
app.use('/books', books);

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))
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
