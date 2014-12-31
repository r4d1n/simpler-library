var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser'); // does this still need to be here?

var app = express();

// instantiate handlebars-express engine with config
var hbs = exphbs.create({
  defaultLayout: 'layout',
  layoutsDir: 'views/'
  });

app.use(express.static(__dirname + '/public'));
// app.use(express.logger());
app.use(bodyParser.urlencoded({  // to support URL-encoded bodies
  extended: true
}));
// app.use(express.methodOverride());

// register hbs.engine from express-handlebars module
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(function(req, res, next) {  // hacks to run locally
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "DELETE");
  next();
});


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('App listening at http://%s:%s', host, port)

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
}
];

/* ~~~%%###%%~~~ End Sample Database ~~~%%###%%~~~ */

app.locals.booksDB = booksDB;

app.get('/', function (req, res) {
  res.render('home')
});

app.route('/books')
.get(function(req, res) {
  res.json({'books' : booksDB});
})
.post(function(req, res) {
  // console.log(req.body)
  booksDB.push(req.body.book);
  res.json({'books' : booksDB});
})
.delete(function(req, res) {
  // console.log(req.body);
  var index = Number(req.body.remove);
  booksDB.splice(index,1);
  res.json({ 'books' : booksDB });
});

app.route('/list')
.get(function(req, res) {
  res.render('list')
  console.log(res.body)
})
