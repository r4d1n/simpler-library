var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(function(req, res, next) {  // hack to make this work locally for now
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

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

app.get('/', function (req, res) {
  res.json({})
})

app.get("/books", function(req, res) {
 res.json({'books' : booksDB});
});

app.post('/books', function(req, res) {
 console.log(req.body);
 booksDB.push(req.body.book);
 res.json({'books' : booksDB});
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
