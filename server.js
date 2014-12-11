var express = require('express')
var app = express()

app.use(function(req, res, next) {  // hack to make this work locally for now
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', function (req, res) {
  res.send('{}')
})

var booksDB = [{ title: "Protest Photographs", 
	photographer : "Chauncey Hare",
	nationality : "American",
	type : "Monograph", 
	genre : "Documentary", 
	textBy : "Chauncey Hare, Judy Wyatt, Jack von Euw",
	publisher : "SteidlKasher",
	isbn : "978-3-86521-495-9",
	year : "2009",
	tags : "B&W, domesticity, interiors, home, family, political, California, labor, Suburbs",
	comments : "",
	signed : false	
	},
	{ title : "Incidents",
	photographer : "Henry Wessel",
	nationality : "American",
	type : "Monograph", 
	genre : "Street", 
	textBy : "",
	publisher : "Steidl",
	isbn : "978-3-86930-697-1",
	year : "2013",
	tags : "B&W, California, Bay Area, American West",
	comments : "Has a sense of humor",
	signed : true
	},
	{title: "Secondhand",
	photographer : "",
	nationality : "",
	type : "Exhibition Catalog", 
	genre : "", 
	textBy : "",
	publisher : "Pier 24 Photography",
	isbn : "978-0-9839917-5-5",
	year : "2014",
	tags : "archives, appropriation, institutions, Bay Area, curation",
	comments : "What an interesting show.",
	signed : false
}
];



app.get("/books", function(req, res) {
 res.json({'books' : booksDB});
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
