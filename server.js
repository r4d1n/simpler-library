var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser'); // does this still need to be here?

var app = express();

app.use(express.static(__dirname + '/public'));

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

/* ~~~##%%%##~~~ Begin Sample Database ~~~##%%%##~~~ */

var booksDB = [{ title: "Protest Photographs",
photographer : "Chauncey Hare",
nationality : "American",
type : "Monograph",
genre : "Documentary",
textby : "Chauncey Hare, Judy Wyatt, Jack von Euw",
publisher : "SteidlKasher",
isbn : "978-3-86521-495-9",
year : "2009",
tags : "B&W, domesticity, interiors, home, family, political, California, labor, Suburbs",
comments : "",
signed : ""
},
{ title : "Incidents",
photographer : "Henry Wessel",
nationality : "American",
type : "Monograph",
genre : "Street",
textby : "",
publisher : "Steidl",
isbn : "978-3-86930-697-1",
year : "2013",
tags : "B&W, California, Bay Area, American West",
comments : "Has a sense of humor",
signed : "Signed"
},
{title: "Secondhand",
photographer : "Misc.",
nationality : "Misc.",
type : "Exhibition Catalog",
genre : "",
textby : "",
publisher : "Pier 24 Photography",
isbn : "978-0-9839917-5-5",
year : "2014",
tags : "archives, appropriation, institutions, Bay Area, curation",
comments : "What an interesting show.",
signed : ""
}]

/* ~~~%%###%%~~~ End Sample Database ~~~%%###%%~~~ */

app.get('/', function (req, res) {
  res.render('home');
})

app.get('/form', function (req, res) {
  res.render('form');
})

app.get('/list', function (req, res) {
  res.render('list', { 'books' : booksDB });
})

app.route('/books')
.get(function(req, res) {
  res.json({'books' : booksDB});
})
.post(function(req, res) {
  booksDB.push(req.body.book);
  res.json({'books' : booksDB});
})
.delete(function(req, res) {
  var index = Number(req.body.remove);
  booksDB.splice(index,1);
  res.json({ 'books' : booksDB });
})

app.post('/books/update', function (req, res) {
  console.log(req.body);
  var i = req.body.item;
  var key = req.body.key;
  var val = req.body.val;
  booksDB[i][key] = val;
  res.render('list', {'books' : booksDB});
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('App listening at http://%s:%s', host, port)

})
